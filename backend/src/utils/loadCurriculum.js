import cseAI2024 from "../data/curriculum/cse_ai_2024.json" with { type: "json" };

const curricula = {
  cse_ai_2024: cseAI2024,
};

export function loadCurriculum(stream) {
  return curricula[stream];
}