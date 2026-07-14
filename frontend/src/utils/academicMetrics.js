import { placementWeights } from "./placementCriteria";

/**
 * Returns completed courses.
 */
export function getCompletedCourses(academicProfile) {
  return academicProfile?.completed || [];
}

/**
 * Returns failed courses.
 */
export function getFailedCourses(academicProfile) {
  return academicProfile?.failed || [];
}

/**
 * Returns remaining courses.
 */
export function getRemainingCourses(academicProfile) {
  return academicProfile?.remaining || [];
}

/**
 * Returns completion percentage.
 * Uses Academic Engine summary if available.
 */
export function getCompletionPercentage(academicProfile) {
  if (!academicProfile) return 0;

  if (academicProfile.summary?.progress !== undefined) {
    return Math.round(academicProfile.summary.progress);
  }

  const completed = getCompletedCourses(academicProfile);
  const failed = getFailedCourses(academicProfile);
  const remaining = getRemainingCourses(academicProfile);

  const total =
    completed.length +
    failed.length +
    remaining.length;

  return total > 0
    ? Math.round((completed.length / total) * 100)
    : 0;
}

/**
 * Credits earned.
 * Uses Academic Engine calculation when available.
 */
export function getCreditsEarned(academicProfile) {
  if (!academicProfile) return 0;

  if (academicProfile.credits?.earned !== undefined) {
    return academicProfile.credits.earned;
  }

  return getCompletedCourses(academicProfile).reduce(
    (sum, course) => sum + (course.credits || 0),
    0
  );
}

/**
 * Backlog count.
 */
export function getBacklogCount(academicProfile) {
  return getFailedCourses(academicProfile).length;
}

/**
 * Placement readiness.
 */
export function getPlacementReadiness(
  academicProfile
) {
  const completed =
    getCompletedCourses(academicProfile);

  return Math.min(
    100,
    completed.reduce(
      (score, course) =>
        score +
        (placementWeights[course.code] || 0),
      0
    )
  );
}

/**
 * Complete academic summary.
 */
export function getAcademicSummary(
  academicProfile
) {
  if (!academicProfile) {
    return {
      completedCourses: [],
      failedCourses: [],
      remainingCourses: [],
      completedCount: 0,
      failedCount: 0,
      remainingCount: 0,
      totalCourses: 0,
      completionPercentage: 0,
      creditsEarned: 0,
      totalCredits: 0,
      backlogCount: 0,
      placementReadiness: 0,
      footerMessage:
        "Every journey starts with one milestone.",
    };
  }

  const completedCourses =
    getCompletedCourses(academicProfile);

  const failedCourses =
    getFailedCourses(academicProfile);

  const remainingCourses =
    getRemainingCourses(academicProfile);

  const completedCount =
    completedCourses.length;

  const failedCount =
    failedCourses.length;

  const remainingCount =
    remainingCourses.length;

  const totalCourses =
    academicProfile.summary?.total ??
    completedCount +
      failedCount +
      remainingCount;

  const completionPercentage =
    getCompletionPercentage(academicProfile);

  const creditsEarned =
    getCreditsEarned(academicProfile);

  const totalCredits =
    academicProfile.credits?.total ??
    academicProfile.curriculum?.requirements
      ?.mandatoryCredits ??
    160;

  const backlogCount =
    getBacklogCount(academicProfile);

  const placementReadiness =
    getPlacementReadiness(academicProfile);

  let footerMessage =
    "Every journey starts with one milestone.";

  if (
    completedCount === totalCourses &&
    totalCourses > 0
  ) {
    footerMessage =
      "🎉 Congratulations! Your degree requirements are complete.";
  } else if (
    completionPercentage >= 75
  ) {
    footerMessage =
      backlogCount === 0
        ? "You're approaching graduation. Keep up the momentum."
        : "Excellent progress. Clearing your remaining backlogs will strengthen your academic profile.";
  } else if (
    completionPercentage >= 50
  ) {
    footerMessage =
      backlogCount === 0
        ? "You're more than halfway through your degree."
        : "Good progress so far. Prioritize clearing backlogs to improve placement readiness.";
  } else {
    footerMessage =
      backlogCount === 0
        ? "Keep building your academic foundation."
        : "Focus on completing current courses and clearing backlogs early.";
  }

  return {
    completedCourses,
    failedCourses,
    remainingCourses,

    completedCount,
    failedCount,
    remainingCount,

    totalCourses,

    completionPercentage,

    creditsEarned,
    totalCredits,

    backlogCount,

    placementReadiness,

    footerMessage,
  };
}