---
name: repvision-code-review
description: Independently review RepVision AI changes for correctness, safety, maintainability, privacy, and unsupported claims.
---

# RepVision Code Review

## Use when
Reviewing a proposed diff before acceptance, especially changes to camera/ML, workout state, native dependencies, persistence, privacy, or user-facing form feedback.

## Required context
- Read `AGENTS.md`, the task brief/acceptance criteria, relevant product docs, and the full diff.
- Inspect tests and their actual output; distinguish verified results from claims in descriptions.
- Review independently rather than relying only on the implementer's summary.

## Procedure
1. Check whether the change satisfies the approved scope and acceptance criteria without unrelated edits.
2. Check correctness, TypeScript types, module boundaries, lifecycle cleanup, async errors, stale state, and regression risks.
3. Check camera permission timing, visible recording status, ability to disable automatic capture, local clip deletion, storage/error handling, and consent before any upload.
4. For pose/rep logic, check uncertainty handling, missing landmarks, complete movement cycles, duplicate-count guards, reset behavior, timestamp alignment, and separation of estimation from medical claims.
5. Check performance and responsiveness; expensive inference must not block the UI thread.
6. Check accessibility: correctness is not communicated by color alone; controls have understandable labels; feedback is supportive and non-shaming.
7. Check dependency scope, license/maintenance/compatibility evidence, and whether new cloud or paid services were approved.
8. Check for secrets, session tokens, personal data, raw video/frame logs, unsafe permissions, and unexpected network transfers.
9. Compare verification claims with actual commands/results. Require physical-device evidence for camera, inference, counting, and recording claims.
10. Report findings with severity, file/area, impact, suggested fix, and evidence. Separate blockers from minor suggestions and explicitly note areas not verifiable from the diff.

## Expected output
- Findings ordered by severity
- Acceptance criteria covered and uncovered
- Privacy/security/cost/device-test concerns
- Required fixes and deferred minor suggestions
- Review limitations and final recommendation

## Constraints
- Do not silently broaden scope to fix unrelated issues.
- Do not invent bugs or compatibility claims; explain evidence and uncertainty.
- Do not approve a change merely because it compiles or tests pass.
- Do not claim medical-grade form assessment or guaranteed safety.
