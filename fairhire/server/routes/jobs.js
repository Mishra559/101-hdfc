const express = require("express");
const axios = require("axios");
const Job = require("../models/Job");

module.exports = function createJobsRouter(store, mlApiBaseUrl) {
  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: "title and description are required" });
      }

      const job = new Job({
        id: String(store.jobs.length + 1),
        title,
        description,
      });
      store.jobs.push(job);

      // Ask ML service to detect bias in the job description.
      const biasResp = await axios.post(`${mlApiBaseUrl}/detect-bias`, {
        job_description: description,
      });

      return res.status(201).json({ job, bias: biasResp.data });
    } catch (error) {
      return res.status(500).json({
        error: "Failed to create job",
        details: error.message,
      });
    }
  });

  router.get("/", (_req, res) => {
    res.json(store.jobs);
  });

  return router;
};
