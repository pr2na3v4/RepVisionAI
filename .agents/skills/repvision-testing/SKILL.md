---
name: repvision-testing
description: Choose and run relevant checks, then report verification evidence honestly for RepVision AI changes.
---

# RepVision Testing

## Use when
Any change needs verification, particularly camera/ML/video, permissions, state transitions, storage, or native dependencies.

## Required context
- Read `AGENTS.md`, `AGENT_WORKFLOW.md`, the relevant product docs, and the task acceptance criteria.
- Inspect available scripts, test framework, app initialization state, package versions, and target device access.

## Procedure
1. Map each acceptance criterion to one or more observable checks.
2. Select the narrowest meaningful test for the behavior: unit, integration, UI, permission/error-state, static/type/lint check, Expo diagnostic, manual test, or physical-device test.
3. For behavior logic, use deterministic inputs and assert observable outputs, including missing/unreliable data and transition boundaries.
4. For changed behavior, run relevant tests and read the actual output. Also run the project's full relevant test suite before completion.
5. For dependency changes, check compatibility and run `npx expo-doctor` where applicable.
6. For camera/ML/video work, include physical Android verification of permission, framing, inference, complete rep cycles, timestamp alignment, clip playback, and relevant failure paths.
7. If a test cannot run, state the concrete reason and the next action required. Never substitute a mock/build for a physical-device test.
8. Report exact commands, environment/device where relevant, pass/fail/not-run status, and known issues.
9. Ensure no sensitive data, raw frames, videos, or credentials were added to logs or fixtures.

## Expected output
A checklist or table mapping acceptance criteria to check, exact command/procedure, result, evidence, and unresolved limitation.

## Failure scenarios to consider when relevant
- Camera permission denied, revoked, or unavailable
- User outside camera frame; landmarks missing, occluded, or unreliable
- Repetition never completes, crosses a phase boundary repeatedly, or risks duplicate counts
- Set/session reset and app background/interruption
- Inference failure or stale frame timestamps
- Recording interruption, storage full, clip trimming/export failure, or invalid/unplayable output
- Device unavailable; explicitly mark physical-device behavior not verified

## Constraints
- Never invent test output, device runs, coverage, model accuracy, or compatibility.
- A successful build or passing mocked test does not prove device-dependent behavior works.
- Do not mark acceptance criteria complete when their required checks are missing.
