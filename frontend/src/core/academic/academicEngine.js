import { loadCurriculum } from "./curriculumLoader";
import { matchCourses } from "./courseMatcher";
import { calculateProgress } from "./progressCalculator";
import { calculateCredits } from "./creditCalculator";
import { calculateGradeDistribution } from "./gradeCalculator";
import { calculatePlacement } from "./placementCalculator";
import { buildAcademicProfile } from "./academicProfileBuilder";

/**
 * DegreeFlow Academic Engine
 *
 * Builds the complete academic profile
 * from the student's portal results.
 */

export function runAcademicEngine({
  student,
  portalResults = [],
}) {
  // ----------------------------------
  // Load Curriculum
  // ----------------------------------

  const curriculum = loadCurriculum({
    stream: student.stream,
    batch: student.batch,
  });

  if (!curriculum) {
    throw new Error(
      `Curriculum not found for ${student.stream} (${student.batch})`
    );
  }

  // ----------------------------------
  // Match Courses
  // ----------------------------------

  const matched = matchCourses(
    curriculum,
    portalResults
  );

  console.log("Completed:", matched.completed.length);
  console.log("Failed:", matched.failed.length);
  console.log("Remaining:", matched.remaining.length);

  // ----------------------------------
  // Progress Summary
  // ----------------------------------

  const summary = calculateProgress(
    matched.completed,
    matched.failed,
    matched.remaining,
    curriculum.requirements
  );

  // ----------------------------------
  // Credit Summary
  // ----------------------------------

  const credits = calculateCredits(
    [...matched.completed, ...matched.electives],
    curriculum.requirements
  );

  // ----------------------------------
  // Grade Distribution
  // ----------------------------------

  const grades = calculateGradeDistribution([
    ...matched.completed,
    ...matched.failed,
  ]);

  // ----------------------------------
  // Placement Readiness
  // ----------------------------------

  const placement = calculatePlacement(
    matched.completed
  );

  // ----------------------------------
  // Academic Profile
  // ----------------------------------

  return buildAcademicProfile({
    student,

    curriculum,

    summary,

    credits,

    grades,

    placement,

    completed: matched.completed,

    failed: matched.failed,

    remaining: matched.remaining,

    electives: matched.electives,
  });
}