# System Design - FairHire

## Architecture
- **Client (React + Vite)**: Job input form, bias result UI, dashboard summary.
- **Server (Node.js + Express)**: API gateway, in-memory store, report generation.
- **ML Service (FastAPI)**: Bias detection + candidate scoring logic.

## Data Flow
1. User submits job description in client.
2. Client calls backend `/jobs`.
3. Backend calls ML `/detect-bias` and returns combined response.
4. Reports are generated from in-memory arrays (`jobs`, `candidates`).

## Storage
- In-memory only. Data resets when server restarts.
