---
name: repvision-camera-ml
description: Design camera, pose estimation, rep state, form assessment, and video-clip coordination as separate testable modules.
---

# RepVision Camera and ML

## Use when
A task touches camera permissions or frames, pose estimation, landmark quality, exercise phases, repetition counting, form feedback, recording, clipping, or workout video storage.

## Required context
- Read `AGENTS.md`, `RepVisionAI_Project_Docs/architecture.md`, `rules.md`, and `prd.md`.
- Inspect current camera/ML dependencies and actual Expo/native setup before choosing an integration.
- Read the task acceptance criteria and define the device-validation path.

## Procedure
1. Define explicit module boundaries:
   - Camera adapter: permissions, preview/session lifecycle, supported frame delivery, and camera status.
   - Pose adapter: model input/output, normalized landmarks, visibility/confidence, timestamps, and inference status.
   - Feature extraction: angles, alignment, and temporal features.
   - Rep state machine: exercise phases, complete movement cycle, debouncing/hysteresis, and session/set resets.
   - Form assessor: exercise-specific rules, score meaning, and uncertain result.
   - Clip coordinator: maps rep events to recording timestamps and coordinates playable video clips and local storage.
2. Verify the current camera-frame and pose-runtime integration from official docs; confirm Expo SDK compatibility and native build requirements.
3. Define input/output contracts and timestamp units explicitly. Do not infer a contract from a sample or an outdated blog.
4. Represent missing, occluded, low-confidence, or implausible landmarks as uncertain. Never fabricate movement or count a repetition from incomplete evidence.
5. Count a rep only after a complete movement cycle. Use state transitions and debouncing/hysteresis to reduce duplicate counts; reset safely between sets and sessions.
6. Keep inference off the UI thread and clean up camera sessions, frame listeners, model resources, and recording operations on interruption/unmount.
7. Ensure rep-event timestamps align with the recording timeline. A sequence of inference frames is not a playable video. Specify whether clips come from a recording buffer or a record-and-trim pipeline and verify the output plays.
8. Handle permission denial, framing problems, inference errors, interrupted recording, storage limits, and clip-save failure without reporting false success.
9. Test pure state/feature logic with deterministic fixtures. Then verify camera, inference, counting, timestamp alignment, and clip playback on a physical Android phone.
10. Record model/runtime versions, test conditions, known limitations, and any uncertainty in the result.

## Expected output
Module/interface proposal or focused implementation, test evidence, physical-device verification status, limitations, and a clear statement of what remains unverified.

## Constraints
- Pose estimation produces landmarks; it does not by itself determine correct form.
- Do not describe a form score as medical certainty, diagnosis, or injury prediction.
- Do not log or upload raw frames, videos, or sensitive workout data. Any upload requires explicit user consent.
- Prefer on-device inference and local clips where practical.
- Do not claim real-time performance, model accuracy, or working video clips without evidence from the target device.
