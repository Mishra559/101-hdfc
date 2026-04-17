"""FastAPI service for FairHire ML features."""

from __future__ import annotations

from pathlib import Path
import sys

from fastapi import FastAPI
from pydantic import BaseModel, Field

# Allow imports from ml/src without packaging complexity.
CURRENT_DIR = Path(__file__).resolve().parent
SRC_DIR = CURRENT_DIR.parent / "src"
sys.path.append(str(SRC_DIR))

from bias_detector import detect_bias
from candidate_scorer import score_candidate


app = FastAPI(title="FairHire ML API", version="0.1.0")


class BiasRequest(BaseModel):
    job_description: str = Field(..., min_length=5)


class ScoreRequest(BaseModel):
    resume_text: str = Field(..., min_length=5)
    job_description: str = Field(..., min_length=5)


@app.get("/")
def root() -> dict:
    return {"message": "FairHire ML API is running"}


@app.post("/detect-bias")
def detect_bias_endpoint(payload: BiasRequest) -> dict:
    result = detect_bias(payload.job_description)
    return {
        "has_bias": result.has_bias,
        "flagged_terms": result.flagged_terms,
        "bias_score": result.bias_score,
    }


@app.post("/score-candidate")
def score_candidate_endpoint(payload: ScoreRequest) -> dict:
    return score_candidate(payload.resume_text, payload.job_description)
