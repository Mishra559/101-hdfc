"""Simple skill-match based candidate scoring."""

from __future__ import annotations

import re


def _tokenize(text: str) -> set[str]:
    """Convert text into a lowercase token set."""
    return set(re.findall(r"[a-zA-Z0-9+#.]+", text.lower()))


def score_candidate(resume_text: str, job_description: str) -> dict:
    """Score candidate using overlap between resume and job skills.

    This is intentionally basic so it's easy to understand and extend.
    """
    resume_tokens = _tokenize(resume_text)
    job_tokens = _tokenize(job_description)

    if not job_tokens:
        return {
            "score": 0,
            "matched_keywords": [],
            "missing_keywords": [],
        }

    matched = sorted(job_tokens.intersection(resume_tokens))
    missing = sorted(job_tokens.difference(resume_tokens))

    score = round((len(matched) / len(job_tokens)) * 100, 2)

    return {
        "score": score,
        "matched_keywords": matched[:50],  # keep payload small
        "missing_keywords": missing[:50],
    }
