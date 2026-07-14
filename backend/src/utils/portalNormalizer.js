/**
 * Converts raw college portal results
 * into DegreeFlow's internal format.
 */

export function normalizePortalResult(course) {
  return {
    code: (course.CourseCode || "").trim().toUpperCase(),

    name: (course.CourseName || "").trim(),

    status: (course.FinalResult || "").trim().toUpperCase(),

    grade: (course.FinalGrade || "").trim().toUpperCase(),

    maxMark: Number(course.MaxMark || 0),

    month: course.MonthYearValue || "",

    resultDate: course.ResultOn || null,
  };
}

/**
 * Normalize entire results array.
 */
export function normalizePortalResults(results = []) {
  return results.map(normalizePortalResult);
}