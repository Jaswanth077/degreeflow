import { isPassed, isFailed } from "./gradeUtils";

/**
 * Matches normalized portal results with the official curriculum.
 *
 * Returns:
 * - completed
 * - failed
 * - remaining
 * - electives
 *
 * Portal Result Format:
 * {
 *   code,
 *   name,
 *   grade,
 *   status,
 *   maxMark,
 *   month,
 *   resultDate
 * }
 */

export function matchCourses(curriculum, portalResults = []) {
  const completed = [];
  const failed = [];
  const remaining = [];
  const electives = [];

  // -----------------------------
  // Build Lookup Map
  // -----------------------------

  const portalMap = new Map();

  portalResults.forEach((course) => {
    const code = course.code?.trim().toUpperCase();

    if (!code) return;

    portalMap.set(code, course);
  });

  // -----------------------------
  // Match Curriculum
  // -----------------------------

  curriculum.courses.forEach((course) => {
    const curriculumCode = course.code
      .trim()
      .toUpperCase();

    const portalCourse =
      portalMap.get(curriculumCode);

    // Course not attempted yet
    if (!portalCourse) {
      remaining.push(course);
      return;
    }

    const matchedCourse = {
      ...course,

      grade: portalCourse.grade,

      status: portalCourse.status,

      month: portalCourse.month,

      resultDate: portalCourse.resultDate,

      portalData: portalCourse,
    };

    if (isPassed(portalCourse.grade)) {
      completed.push(matchedCourse);
    } else if (
      isFailed(portalCourse.grade)
    ) {
      failed.push(matchedCourse);
    } else {
      remaining.push(matchedCourse);
    }
  });

  // -----------------------------
  // Detect Electives
  // -----------------------------

  portalResults.forEach((course) => {
    const portalCode = course.code?.trim().toUpperCase();

const exists = curriculum.courses.some(
  (item) =>
    item.code.trim().toUpperCase() === portalCode
);

    if (!exists) {
      electives.push(course);
    }
  });

  return {
    completed,
    failed,
    remaining,
    electives,
  };
}