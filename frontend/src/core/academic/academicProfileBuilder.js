export function buildAcademicProfile({
  student,
  curriculum,

  summary,
  credits,
  grades,
  placement,

  completed,
  failed,
  remaining,
  electives = [],
}) {
  return {
    student,

    curriculum,

    summary,

    credits,

    grades,

    placement,

    completed,

    failed,

    remaining,

    electives,
  };
}