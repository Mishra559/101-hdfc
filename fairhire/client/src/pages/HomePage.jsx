import { useState } from "react";
import BiasResult from "../components/BiasResult";
import DashboardCard from "../components/DashboardCard";
import { createJob, getReportSummary } from "../services/api";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState({ totalJobs: 0, totalCandidates: 0, averageScore: 0 });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await createJob({ title, description });
      setResult(data);
      const latestSummary = await getReportSummary();
      setSummary(latestSummary);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to analyze job description");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>FairHire Dashboard</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <DashboardCard label="Total Jobs" value={summary.totalJobs} />
        <DashboardCard label="Candidates" value={summary.totalCandidates} />
        <DashboardCard label="Avg Score" value={summary.averageScore} />
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Create Job & Detect Bias</h2>
        <div style={{ marginBottom: "0.5rem" }}>
          <label htmlFor="title">Job Title</label>
          <br />
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label htmlFor="description">Job Description</label>
          <br />
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={8}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit">Analyze</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <BiasResult result={result} />
    </div>
  );
}
