---
name: repvision-planning
description: Turn a RepVision AI request into a bounded, reviewable task before implementation.
---

# RepVision Planning

## Use when
A request adds or changes behavior, architecture, dependencies, setup, privacy, cost, or user experience; or when acceptance criteria are unclear.

## Required context
- Read `AGENTS.md` and `AGENT_WORKFLOW.md`.
- Read relevant files in `RepVisionAI_Project_Docs/`.
- Inspect current files, dependency versions, branch/diff, and actual project initialization state.

## Procedure
1. Restate the requested outcome in one or two sentences.
2. Separate in-scope work from explicit exclusions; do not expand scope without approval.
3. Define observable acceptance criteria.
4. Identify likely files, dependencies, interfaces, risks, and unknowns.
5. Check whether existing code or a maintained library already meets part of the need; invoke `repvision-repo-reuse` when useful.
6. Define checks for each criterion, including device testing when touching camera, ML, repetition counting, or video.
7. Ask one focused question if a missing decision would materially change the solution. Otherwise choose the smallest reversible option consistent with project docs.
8. For architectural work, write a specification first, request user review, then write an implementation plan and wait for plan review before implementation.

## Expected output
A concise task brief containing:
- Goal and context
- In scope / out of scope
- Acceptance criteria
- Files and interfaces likely affected
- Risks and dependencies
- Verification plan and device-test requirement
- Decisions requiring user approval

## Constraints
- Do not claim the Expo app is initialized unless repository evidence confirms it.
- Do not assume paid APIs, subscriptions, cloud upload, or a backend.
- Do not silently resolve material product, privacy, or cost decisions.
- Keep the plan proportional to the change; prefer small independently verifiable tasks.
