const PASSING_GRADES = ["S", "A", "B", "C", "D"];

const FAILING_GRADES = [
  "RA",
  "F",
  "FAIL",
];

export function isPassed(grade) {
  if (!grade) return false;
  return PASSING_GRADES.includes(grade.toUpperCase());
}

export function isFailed(grade) {
  if (!grade) return false;
  return FAILING_GRADES.includes(grade.toUpperCase());
}

export function isValidGrade(grade) {
  if (!grade) return false;

  const normalized = grade.toUpperCase();

  return (
    PASSING_GRADES.includes(normalized) ||
    FAILING_GRADES.includes(normalized)
  );
}

export { PASSING_GRADES, FAILING_GRADES };