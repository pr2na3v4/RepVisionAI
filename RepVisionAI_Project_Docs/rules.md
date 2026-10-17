# RepVision AI — Development Rules

## 1. General rules
1. Use React Native, Expo, and TypeScript for the Android-first client.
2. Use VS Code as the primary editor.
3. Prefer small, testable changes over large rewrites.
4. Do not install native dependencies before checking compatibility with the current Expo SDK.
5. Do not claim a feature works until it has been run and tested on a target device.
6. Never invent API behavior, package names, or version compatibility. Verify official documentation when choosing dependencies.

## 2. Code organization
- Keep screens in `app/`.
- Keep reusable UI in `src/components/`.
- Keep domain logic in feature modules.
- Keep shared interfaces in `src/types/`.
- Keep persistence and device integrations behind service/adapter interfaces.
- Avoid placing camera, inference, rep counting, and recording logic in one component.
- Use meaningful names and small functions.
- Avoid `any`; use explicit types and runtime validation where external data is involved.

## 3. TypeScript and React Native
- Use functional components and hooks.
- Follow the project's existing Expo Router conventions.
- Use `npx expo install` for Expo-compatible native packages.
- Run `npx expo-doctor` after dependency changes.
- Keep UI responsive; never run expensive ML inference synchronously on the UI thread.
- Clean up camera sessions, listeners, and native resources when screens unmount.
- Handle asynchronous errors and permission denial.

## 4. AI / computer vision
- Use a pretrained pose model; do not train pose estimation from scratch for the MVP.
- A pose model estimates landmarks; it does not automatically determine exercise correctness.
- Keep pose inference, feature extraction, rep counting, and form classification separate.
- Include an `uncertain` result when required landmarks are missing or unreliable.
- Never describe form confidence as injury risk or medical certainty.
- Define every score and validate it against labeled examples.
- Evaluate on people and sessions not used to tune the model.

## 5. Repetition and set logic
- Count a repetition only after a complete movement cycle.
- Use a state machine and debouncing/hysteresis to reduce duplicate counts.
- Handle missing landmarks without fabricating movement.
- Reset rep state carefully between sets and sessions.
- Keep target counts separate from observed counts.

## 6. Recording and privacy
- The recording pipeline must produce playable video clips, not merely arrays of image frames.
- Synchronize inference timestamps with video timestamps.
- Capture both correct and incorrect reps as configured.
- Do not upload recordings without explicit consent.
- Provide a way to disable automatic capture and delete saved clips.
- Handle storage errors and interrupted recordings.

## 7. UI and accessibility
- Display camera, recording, and inference states clearly.
- Do not use color alone to communicate correctness.
- Provide text feedback and accessible labels for controls.
- Keep camera instructions specific to the selected exercise.
- Avoid making medical claims.

## 8. Git workflow
- Commit small, working milestones.
- Never commit `.env`, API secrets, signing keys, private videos, or user data.
- Add generated build files and local artifacts to `.gitignore` as appropriate.
- Inspect `git diff` before committing.
- Use descriptive commit messages, e.g. `feat: add workout setup screen`.

## 9. Definition of done
A change is done only when:
- Types and imports are valid.
- Relevant screens and flows have been manually tested.
- Error and permission states have been considered.
- No secrets or private recordings were added to Git.
- Documentation is updated when architecture or behavior changes.
