# API Documentation - FairHire

## ML API (FastAPI)
### GET /
Health check.

### POST /detect-bias
Request:
```json
{ "job_description": "We want a young and aggressive engineer" }
```
Response:
```json
{ "has_bias": true, "flagged_terms": [{"term": "young", "reason": "May imply age bias"}], "bias_score": 0.25 }
```

### POST /score-candidate
Request:
```json
{ "resume_text": "Python React SQL", "job_description": "Python SQL" }
```
Response:
```json
{ "score": 66.67, "matched_keywords": ["python", "sql"], "missing_keywords": [] }
```

## Backend API (Express)
### GET /
Backend health.

### POST /jobs
Create a job and run bias detection.

### GET /jobs
List jobs.

### POST /resumes/upload
Create candidate entry and run candidate scoring.

### GET /resumes
List candidates.

### GET /reports/summary
Return summary report.
