import { loadCurriculum } from "../utils/loadCurriculum.js";
import { calculateProgress } from "./progress.service.js";

export async function getStudentProgress(portalResults) {
  const curriculum = loadCurriculum("cse_ai_2024");

  return calculateProgress(curriculum, portalResults);
}