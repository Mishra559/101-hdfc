"""Bias detection module.

Currently keyword-based. Can be extended with an ML model later.
"""

from __future__ import annotations

from dataclasses import dataclass


# Simple starter list of biased / potentially exclusionary words.
BIAS_KEYWORDS = {
    "young": "May imply age bias",
    "recent graduate": "May imply age bias",
    "aggressive": "May encode gendered tone",
    "ninja": "Informal / exclusionary language",
    "rockstar": "Informal / exclusionary language",
    "he": "Gendered pronoun",
    "she": "Gendered pronoun",
    "native english": "May exclude qualified non-native speakers",
}


@dataclass
class BiasResult:
    has_bias: bool
    flagged_terms: list[dict]
    bias_score: float


def detect_bias(job_description: str) -> BiasResult:
    """Detect potentially biased phrases in job description text."""
    text = job_description.lower()
    flags: list[dict] = []

    for term, reason in BIAS_KEYWORDS.items():
        if term in text:
            flags.append({"term": term, "reason": reason})

    # Basic score: fraction of unique biased terms found.
    total_terms = len(BIAS_KEYWORDS)
    bias_score = round(len(flags) / total_terms, 3) if total_terms else 0.0

    return BiasResult(
        has_bias=len(flags) > 0,
        flagged_terms=flags,
        bias_score=bias_score,
    )
