import PortalClient from "../utils/portalClient.js";
import { getStudentProgress } from "../services/student.service.js";
import {
  normalizePortalResults,
} from "../utils/portalNormalizer.js";

export async function progress(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required.",
      });
    }

    const portal = new PortalClient();

    await portal.login(username, password);

    const rawResults =
  await portal.getResults();

const portalResults =
  normalizePortalResults(rawResults);

    const progress = await getStudentProgress(
  portalResults,
  username
);

    return res.status(200).json({
      success: true,
      data: progress,
    });

  } catch (error) {
    console.error("❌ Progress Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}