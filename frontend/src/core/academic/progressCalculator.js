/**
 * Calculates overall academic progress.
 *
 * @param {Array} completed
 * @param {Array} failed
 * @param {Array} remaining
 * @param {Object} requirements
 */

export function calculateProgress(
  completed,
  failed,
  remaining,
  requirements
) {

  const mandatoryCompleted = completed.length;

  const mandatoryFailed = failed.length;

  const mandatoryRemaining = remaining.length;

  const mandatoryTotal = requirements.mandatoryCourses;

  const progress = mandatoryTotal === 0
    ? 0
    : Number(
        ((mandatoryCompleted / mandatoryTotal) * 100).toFixed(2)
      );

  return {

    completed: mandatoryCompleted,

    failed: mandatoryFailed,

    remaining: mandatoryRemaining,

    total: mandatoryTotal,

    progress

  };

}