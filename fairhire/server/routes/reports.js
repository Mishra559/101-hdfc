const express = require("express");

module.exports = function createReportsRouter(store) {
  const router = express.Router();

  router.get("/summary", (_req, res) => {
    const totalCandidates = store.candidates.length;
    const averageScore = totalCandidates
      ? Number(
          (
            store.candidates.reduce((sum, c) => sum + (Number(c.score) || 0), 0) /
            totalCandidates
          ).toFixed(2)
        )
      : 0;

    const jobs = store.jobs.map((job) => {
      const candidatesForJob = store.candidates.filter((c) => c.jobId === job.id);
      return {
        jobId: job.id,
        title: job.title,
        candidates: candidatesForJob.length,
      };
    });

    res.json({
      totalJobs: store.jobs.length,
      totalCandidates,
      averageScore,
      jobs,
    });
  });

  return router;
};
