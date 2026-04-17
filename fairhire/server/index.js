const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const createResumesRouter = require("./routes/resumes");
const createJobsRouter = require("./routes/jobs");
const createReportsRouter = require("./routes/reports");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const ML_API_BASE_URL = process.env.ML_API_BASE_URL || "http://localhost:8000";

const store = {
  jobs: [],
  candidates: [],
};

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "FairHire backend is running" });
});

app.use("/jobs", createJobsRouter(store, ML_API_BASE_URL));
app.use("/resumes", createResumesRouter(store, ML_API_BASE_URL));
app.use("/reports", createReportsRouter(store));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
