"""Utility for extracting text from PDF resumes."""

from __future__ import annotations

from pathlib import Path
from typing import Optional

import PyPDF2


def extract_text_from_pdf(file_path: str | Path) -> str:
    """Extract plain text from a PDF file.

    Args:
        file_path: Path to the PDF resume.

    Returns:
        Extracted text as a single string.
    """
    pdf_path = Path(file_path)
    if not pdf_path.exists():
        raise FileNotFoundError(f"Resume file not found: {pdf_path}")

    extracted_pages: list[str] = []
    with pdf_path.open("rb") as file_obj:
        reader = PyPDF2.PdfReader(file_obj)
        for page in reader.pages:
            extracted_pages.append(page.extract_text() or "")

    return "\n".join(extracted_pages).strip()


def extract_text_from_upload(file_bytes: bytes, filename: Optional[str] = None) -> str:
    """Extract text from uploaded PDF bytes.

    This helper is used by the API when files are uploaded directly.
    """
    if filename and not filename.lower().endswith(".pdf"):
        raise ValueError("Only PDF files are supported for resume parsing.")

    from io import BytesIO

    reader = PyPDF2.PdfReader(BytesIO(file_bytes))
    pages = [page.extract_text() or "" for page in reader.pages]
    return "\n".join(pages).strip()
