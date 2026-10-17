# RepVision AI — Shared Agent Instructions

## Project status
RepVision AI is an Android-first workout assistant intended to count push-ups and squats, estimate form quality, track sets, and save clips of correct and incorrect repetitions. The repository currently contains project documentation and workflow planning; do not assume the Expo app has been initialized or that product features work.

## Read before changing files
1. Read this file and `AGENT_WORKFLOW.md`.
2. Read the relevant documents under `RepVisionAI_Project_Docs/`: at minimum `prd.md`, `architecture.md`, `rules.md`, `design.md`, `phrases.md`, and `memory.md` for major changes.
3. Inspect the actual repository, installed package versions, current diff, and recent changes before editing. Do not infer files or APIs from plans alone.

## Required workflow
- Convert requests into small tasks with explicit scope, exclusions, acceptance criteria, risks, and verification steps before implementation.
- Search existing code and maintained compatible libraries before adding abstractions or dependencies.
- Make the smallest coherent change. Keep UI, workout state, pose inference, form assessment, repetition logic, and recording separate.
- Run relevant checks and report exact commands and outcomes. Distinguish passed, failed, and not-run checks.
- Independently review changes for correctness, privacy, security, accessibility, performance, dependencies, and regressions.
- Test camera, pose inference, rep counting, and recording claims on a physical Android device. A build or mock is not device verification.
- Update project memory/architecture notes when a decision or behavior changes. Inspect the diff for secrets before committing.
- Ask for approval before material scope changes, cloud upload, analytics, accounts, paid services, or privacy-impacting behavior.

## Project constraints
- Use React Native + Expo + TypeScript; VS Code is the primary editor. Android Studio is not the desired IDE, though Android SDK command-line tools may still be required.
- Prefer on-device inference and local clip storage where practical. Do not assume paid APIs or subscriptions.
- Never commit credentials, session tokens, signing keys, private videos, or personal data. Do not put secrets in untrusted plugins or routers.
- Free chat access is not the same as free API access. Routing software does not bypass provider limits.
- Check current Expo/native compatibility before recommending dependencies; use `npx expo install` when appropriate and run `npx expo-doctor` after dependency changes.
- Represent unreliable or missing pose landmarks as uncertain; do not fabricate movement or duplicate reps.
- Synchronize rep-event and video timestamps. Image frames alone are not playable clips.
- Request camera permission only when needed, explain its purpose, show recording state, and support disabling automatic capture and deleting local clips.
- Form assessment is an estimate, not medical advice, diagnosis, injury prediction, or a guarantee of safety. Use supportive, non-shaming language and do not communicate correctness using color alone.

## Completion standard
A task is complete only when its acceptance criteria and verification evidence are documented. If a check could not be run, say why and what remains unverified. Never invent test results, package APIs, compatibility, model accuracy, or completed work.

## Canonical project guidance
- Workflow: `AGENT_WORKFLOW.md`
- Product and technical documentation: `RepVisionAI_Project_Docs/`
- Workflow specification: `docs/superpowers/specs/2026-10-17-agent-workflow-design.md`
- Workflow implementation plan: `docs/superpowers/plans/2026-10-17-agent-workflow.md`
- Shared skills: `.agents/skills/`
