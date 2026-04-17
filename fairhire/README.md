# FairHire

FairHire is a minimal AI-powered hiring demo that:
- detects possible bias in job descriptions,
- scores candidates based on resume/job text match,
- shows a simple dashboard.

## Project Structure
- `ml/` - FastAPI service for bias and candidate scoring
- `server/` - Express backend with in-memory storage
- `client/` - React dashboard
- `docs/` - SRS, API docs, design notes

## Run Locally (without Docker)

### 1) ML service
```bash
cd fairhire/ml
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

### 2) Backend server
```bash
cd fairhire/server
npm install
cp ../.env.example .env
npm run start
```

### 3) Frontend app
```bash
cd fairhire/client
npm install
npm run dev
```

Open: `http://localhost:5173`

## Run with Docker
```bash
cd fairhire
docker compose up --build
```

## Notes
- No authentication.
- No database (data is stored in memory only).
- Resume upload endpoint currently accepts resume text JSON for simplicity.
