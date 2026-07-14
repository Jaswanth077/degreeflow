/**
 * Calculates earned and remaining credits.
 *
 * Uses the credits defined directly
 * in the curriculum.
 */

export function calculateCredits(
  completedCourses = [],
  requirements = {}
) {
  // ----------------------------------
  // Earned Credits
  // ----------------------------------

  const earnedCredits = completedCourses.reduce(
    (total, course) => {
      return total + (course.credits || 0);
    },
    0
  );

  // ----------------------------------
  // Total Mandatory Credits
  // ----------------------------------

  const totalCredits =
    requirements.mandatoryCredits || 0;

  // ----------------------------------
  // Remaining Credits
  // ----------------------------------

  const remainingCredits = Math.max(
    totalCredits - earnedCredits,
    0
  );

  // ----------------------------------
  // Completion %
  // ----------------------------------

  const completionPercentage =
    totalCredits > 0
      ? Number(
          (
            (earnedCredits / totalCredits) *
            100
          ).toFixed(2)
        )
      : 0;

  return {
    earned: earnedCredits,

    remaining: remainingCredits,

    total: totalCredits,

    completionPercentage,
  };
}