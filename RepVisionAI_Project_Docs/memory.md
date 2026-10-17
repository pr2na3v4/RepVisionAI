# RepVision AI — Project Memory and Handoff Notes

## Purpose
This file is the persistent project handoff note for developers and AI coding assistants. Update it when a decision is made or a milestone is verified.

## Product decisions
- Project name: RepVision AI.
- Product: Android-first workout assistant using the phone camera.
- Initial exercises: push-ups and squats.
- Client: React Native + Expo + TypeScript.
- Primary editor: VS Code.
- Preferred ML approach: pretrained pose estimation, followed by custom exercise logic and a form classifier if required.
- Capture goal: automatically save clips of both correct and incorrect repetitions.
- Required user features: camera setup instructions, set/repetition targets, live feedback, workout summary, and clip review.
- Processing preference: on-device where practical.
- The form assessment must be presented as an estimate, not a medical diagnosis or guarantee of safety.

## Development approach
1. Create and review project documentation before implementing the app.
2. Build navigation and basic screens.
3. Test the UI on a physical Android device.
4. Add camera permission and preview.
5. Verify a compatible pretrained pose model and native inference path.
6. Add rep-count state machines for each exercise.
7. Add and evaluate form assessment.
8. Implement video clip capture and review.
9. Add persistence, cleanup, and final QA.

## Tooling preferences
- Use VS Code as the main IDE.
- Android Studio IDE is not desired.
- A local Android emulator may require Android SDK components; a physical Android phone is an acceptable first test target.
- Use PowerShell commands for Windows setup.
- Prefer Expo's version-aware installer for Expo/native dependencies.
- Check available disk space before native builds, because Android build tooling can consume significant storage.

## Current status
**Documentation draft created.** The project has not been confirmed as initialized or run on a device. Do not mark setup or features as complete until the user verifies them.

## Pending decisions
- Exact Expo SDK version produced by the project initializer.
- Exact pose model/runtime and React Native integration strategy.
- Camera frame-processing implementation.
- Video rolling-buffer or recording-and-trimming implementation.
- Local persistence strategy for sessions and clips.
- Whether any cloud sync/backend is needed.

## Verification log
Add entries in this format:
- Date:
- Change:
- Device/environment:
- Test performed:
- Result:
- Known issues:

## Instructions for future coding assistants
- Read `prd.md`, `architecture.md`, `rules.md`, `phrases.md`, and `design.md` before making major changes.
- Follow the existing folder structure and installed package versions.
- Inspect the current project files before overwriting anything.
- Do not fabricate successful test results.
- Make small changes and explain which files were changed.
- Ask before adding cloud upload, analytics, accounts, or other features that change privacy or scope.
