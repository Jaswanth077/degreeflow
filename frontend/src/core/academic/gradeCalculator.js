import {
  PASSING_GRADES,
  FAILING_GRADES,
} from "./gradeUtils";

export function calculateGradeDistribution(courses = []) {

  const distribution = {
    S: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    PASS: 0,
    RA: 0,
    UNKNOWN: 0,
  };

  courses.forEach((course) => {

    const grade = (course.grade || "")
      .trim()
      .toUpperCase();

    if (distribution[grade] !== undefined) {
      distribution[grade]++;
    } else {
      distribution.UNKNOWN++;
    }

  });

  const highest =
    ["S", "A", "B", "C", "D", "PASS"]
      .find((grade) => distribution[grade] > 0) || null;

  const passed =
    PASSING_GRADES.reduce(
      (total, grade) => total + (distribution[grade] || 0),
      0
    ) + (distribution.PASS || 0);

  const failed =
    FAILING_GRADES.reduce(
      (total, grade) => total + (distribution[grade] || 0),
      0
    );

  return {
    distribution,
    highest,
    passed,
    failed,
  };
}