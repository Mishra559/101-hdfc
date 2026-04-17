const express = require("express");
const axios = require("axios");
const Candidate = require("../models/Candidate");

module.exports = function createResumesRouter(store, mlApiBaseUrl) {
  const router = express.Router();

  // Minimal resume upload endpoint (JSON-based for simplicity).
  router.post("/upload", async (req, res) => {
    try {
      const { name, resumeText, jobId } = req.body;
      if (!name || !resumeText || !jobId) {
        return res
          .status(400)
          .json({ error: "name, resumeText, and jobId are required" });
      }

      const job = store.jobs.find((j) => j.id === String(jobId));
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      const scoreResp = await axios.post(`${mlApiBaseUrl}/score-candidate`, {
        resume_text: resumeText,
        job_description: job.description,
      });

      const candidate = new Candidate({
        id: String(store.candidates.length + 1),
        name,
        resumeText,
        score: scoreResp.data.score,
      });

      store.candidates.push({ ...candidate, jobId: String(jobId), scoreDetail: scoreResp.data });

      return res.status(201).json({
        candidate,
        score: scoreResp.data,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Failed to upload resume",
        details: error.message,
      });
    }
  });

  router.get("/", (_req, res) => {
    res.json(store.candidates);
  });

  return router;
};
