# Software Requirements Specification (SRS) - FairHire

## 1. Purpose
FairHire helps hiring teams write more inclusive job descriptions and evaluate candidates with simple, transparent AI utilities.

## 2. Scope
- Detect potentially biased wording in job descriptions.
- Score candidates against job descriptions using keyword matching.
- Display hiring summary metrics in a dashboard.

## 3. Functional Requirements
- FR1: User can create a job with title + description.
- FR2: System returns bias detection results for the description.
- FR3: User can upload candidate resume text for a job.
- FR4: System returns candidate score based on skill overlap.
- FR5: User can view a summary report.

## 4. Non-Functional Requirements
- NFR1: Beginner-friendly code and setup.
- NFR2: Runs locally using Docker or separate services.
- NFR3: No authentication and no database required.
