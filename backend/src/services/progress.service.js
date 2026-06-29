export function calculateProgress(curriculum, portalResults) {

  const completed = [];
  const failed = [];
  const remaining = [];

  // Create a map for quick lookup
  const resultMap = new Map();

  portalResults.forEach((course) => {
    resultMap.set(course.CourseCode, course);
  });

  // Compare curriculum with results
  curriculum.courses.forEach((course) => {

    const result = resultMap.get(course.code);

    if (!result) {
      remaining.push(course);
    } else if (result.FinalResult === "PASS") {
      completed.push({
        ...course,
        grade: result.FinalGrade
      });
    } else {
      failed.push({
        ...course,
        grade: result.FinalGrade
      });
    }

  });

  const total = curriculum.totalCourses;

  const progress = Number(
    ((completed.length / total) * 100).toFixed(2)
  );

  return {
    summary: {
      totalCourses: total,
      completed: completed.length,
      failed: failed.length,
      remaining: remaining.length,
      progress
    },

    completed,
    failed,
    remaining
  };
}