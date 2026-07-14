/**
 * Builds the student payload returned to the frontend.
 *
 * Currently:
 * - Student name is a placeholder.
 * - Stream and batch are defaults.
 *
 * Later these will be extracted directly
 * from the college portal after login.
 */

export async function getStudentProgress(
  portalResults,
  registerNumber
) {
  return {
    student: {
      name: "Student",
      registerNumber,

      stream: "cse_ai",
      batch: "2024",
    },

    portalResults,
  };
}