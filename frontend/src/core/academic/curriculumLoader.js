import cseAI2024 from "../../data/curriculum/cse_ai_2024.json";

const curriculumMap = {
  cse_ai: {
    "2024": cseAI2024,
  },
};

export function loadCurriculum({ stream, batch }) {
  const curriculum = curriculumMap?.[stream]?.[batch];

  if (!curriculum) {
    throw new Error(
      `Curriculum not found for stream "${stream}" (${batch})`
    );
  }

  return curriculum;
}