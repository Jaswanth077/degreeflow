import express from "express";
import { progress } from "../controllers/student.controller.js";

const router = express.Router();

router.post("/progress", progress);

export default router;