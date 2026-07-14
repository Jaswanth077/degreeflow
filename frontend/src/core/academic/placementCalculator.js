import { placementWeights } from "../../utils/placementCriteria";

export function calculatePlacement(completed = []) {
  const completedCodes = new Set(
    completed.map((course) => course.code)
  );

  let score = 0;

  Object.keys(placementWeights).forEach((code) => {
    if (completedCodes.has(code)) {
      score += placementWeights[code];
    }
  });

  score = Math.min(score, 100);

  const hasDbms = completedCodes.has("CSA05");

  let subtitle = "Needs Attention";

  if (score >= 70) {
    subtitle = "Good Progress";
  } else if (score >= 50) {
    subtitle = "Fair Progress";
  }

  return {
    score,
    subtitle,
    hasDbms,
  };
}