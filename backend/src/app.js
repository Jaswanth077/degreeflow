import express from "express";
import dotenv from "dotenv";
import PortalClient from "./utils/portalClient.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("DegreeFlow Backend Running 🚀");
});

// Temporary Login Test
app.get("/login-test", async (req, res) => {
  try {
    const portal = new PortalClient();

    const response = await portal.login(
      "YOUR_STUDENT_ID",
      "YOUR_PASSWORD"
    );

    res.json({
      success: true,
      status: response.status,
      redirectedTo: response.request?.res?.responseUrl,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});