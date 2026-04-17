"""Fairness metrics placeholders.

Includes a minimal demographic parity difference implementation.
"""

from __future__ import annotations

from collections import defaultdict


def demographic_parity_difference(records: list[dict]) -> dict:
    """Compute demographic parity difference across groups.

    Expected input format per record:
    {
      "group": "A",
      "selected": 1   # 1 for selected, 0 for not selected
    }
    """
    if not records:
        return {
            "metric": "demographic_parity_difference",
            "difference": 0.0,
            "selection_rates": {},
            "note": "No records provided.",
        }

    counts = defaultdict(int)
    selected_counts = defaultdict(int)

    for row in records:
        group = str(row.get("group", "unknown"))
        selected = int(row.get("selected", 0))
        counts[group] += 1
        selected_counts[group] += 1 if selected == 1 else 0

    rates = {
        group: (selected_counts[group] / counts[group]) if counts[group] else 0.0
        for group in counts
    }

    if not rates:
        difference = 0.0
    else:
        difference = round(max(rates.values()) - min(rates.values()), 4)

    return {
        "metric": "demographic_parity_difference",
        "difference": difference,
        "selection_rates": rates,
    }
