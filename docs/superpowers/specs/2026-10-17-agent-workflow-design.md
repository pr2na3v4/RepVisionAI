# RepVision AI — Agent Workflow Design Specification

- **Status:** Draft for user review
- **Date:** 2026-10-17
- **Repository:** `pr2na3v4/RepVisionAI`
- **Scope:** Documentation and AI-assisted development workflow only

## 1. Purpose and intended outcome

Define a repeatable, low-cost workflow for building RepVision AI with coding assistants while keeping the project understandable, secure, testable, and under the user's control.

RepVision AI is an Android-first workout assistant intended to use a phone camera and pretrained pose estimation to estimate form quality, count completed repetitions, track sets, and save clips associated with correct and incorrect repetitions. The initial supported exercises are push-ups and squats.

The workflow must preserve the existing product constraints:
- React Native, Expo, and TypeScript; VS Code is the primary editor.
- The user does not want Android Studio as the IDE. Android SDK command-line tools or other native build prerequisites may still be required.
- Prefer on-device inference and local clip storage where practical.
- Do not assume paid AI APIs or subscriptions.
- Form assessment is an estimate, not medical advice, diagnosis, injury prediction, or a guarantee of safety.
- Do not report camera, ML, repetition counting, or clip capture as verified until tested on a physical Android device.

This specification defines the agent workflow and its instructions. It does **not** initialize the Expo app or implement product features.

## 2. Design decisions

### 2.1 Shared core with platform-specific adapters

Keep project rules and workflow concepts shared and avoid maintaining divergent copies. Provide small platform-specific entry points only where tools require different discovery or instruction formats.

- `AGENT_WORKFLOW.md`: complete workflow and handoff process.
- `AGENTS.md`: concise shared project instructions for Codex and compatible agents.
- `CLAUDE.md`: Claude Code entry point that points to the shared rules and relevant workflow.
- `.agents/skills/`: shared project skill definitions.
- `.claude/skills/`: Claude-specific adapters only where needed and supported by the installed Claude Code skill-discovery rules.
- `docs/superpowers/specs/`: design specifications.
- `docs/superpowers/plans/`: implementation plans created after this specification is approved.

Do not duplicate entire skill bodies across platforms unless compatibility requires it. If a platform-specific adapter is needed, keep it small and link to the canonical shared instructions where supported.

### 2.2 Six custom skills

Create six focused skills. Each skill should state its purpose, when to use it, required context, step-by-step procedure, expected output, and constraints.

1. **`repvision-planning`** — Convert a request into a small task with scope, acceptance criteria, likely files affected, risks, and a verification plan.
2. **`repvision-react-native`** — Guide React Native, Expo, TypeScript, navigation, components, and platform-aware implementation. Verify current project conventions and Expo/native package compatibility before recommending dependencies.
3. **`repvision-repo-reuse`** — Inspect existing project code and evaluate reusable repositories/libraries before building new functionality. Check maintenance, license, compatibility, security posture, integration effort, and actual fit; never assume a repository solves the complete product requirement.
4. **`repvision-camera-ml`** — Keep camera lifecycle, frame/inference pipeline, pose landmarks, feature extraction, repetition state machines, form assessment, and recording/clip coordination separate. Require explicit uncertainty handling and timestamp synchronization; do not treat inference frames as playable video.
5. **`repvision-testing`** — Define and run relevant unit, integration, UI, permission/error-state, and device tests. Clearly distinguish tests run from tests not run; require physical Android verification for camera/ML/recording claims.
6. **`repvision-code-review`** — Independently inspect changes for correctness, types, architecture, security, privacy, performance, accessibility, dependency scope, regression risk, and unsupported claims.

Skills are reusable instruction sets, not six required paid agents. The user may perform role handoffs manually between available tools. No additional subscriptions or API usage are required by this design.

## 3. Standard development workflow

1. **Triage and context:** Read the shared instructions and relevant product docs. Inspect the current repository state, affected files, dependencies, and recent changes before proposing edits.
2. **Plan:** State the problem, scope, exclusions, acceptance criteria, likely files, risks, dependencies, and verification approach. Ask one focused question if a material requirement is missing.
3. **Reuse review:** Search the existing codebase and evaluate relevant maintained libraries before creating new abstractions or dependencies. Verify official documentation for version-sensitive behavior.
4. **Implement one logical task:** Make the smallest coherent change that satisfies the agreed acceptance criteria. Keep UI, workout state, pose inference, form assessment, and recording responsibilities separate.
5. **Verify:** Run available type checks, linting, tests, Expo diagnostics, or targeted checks appropriate to the project state. Inspect the diff and report exact commands and results.
6. **Independent review:** Use the review skill or a separate review pass to examine the change. Address material findings or explicitly document unresolved risks.
7. **Device validation:** Test device-dependent functionality on a physical Android phone. If unavailable, label it unverified rather than inferring success from a build or mock.
8. **Document and commit:** Update project memory or architecture notes when decisions or behavior change. Inspect the diff for secrets and private data. Commit a small milestone with a descriptive message when authorized by the agreed task.
9. **Handoff:** Report changed files, verification evidence, limitations, remaining risks, and the next useful step. Do not mark incomplete acceptance criteria as complete.

## 4. Approval gates and completion criteria

- Requirements and acceptance criteria must be understood before implementation.
- The user approves material scope changes, new cloud upload, analytics, accounts, paid services, or privacy-impacting behavior before those are added.
- Architectural work follows the agreed design-specification and implementation-plan review gates.
- A task is complete only when its acceptance criteria and verification results are documented.
- If a check cannot be run, state why and what remains unverified.
- A successful dependency install or successful compilation alone does not prove camera, inference, repetition counting, form classification, or clip capture works on a device.
- Do not invent test results, package APIs, versions, compatibility, model accuracy, or completed work.

## 5. Project-specific technical and product rules

### 5.1 Architecture and implementation

- Use React Native + Expo + TypeScript and the project's actual initialized conventions.
- Use `npx expo install` for compatible Expo/native packages when appropriate and run `npx expo-doctor` after dependency changes.
- Check current Expo SDK, React Native version, Android support, maintenance status, and required native integration before choosing camera or ML dependencies.
- Keep expensive inference off the UI thread and clean up camera sessions, listeners, and native resources.
- Keep pose estimation, feature extraction, rep state machines, form assessment, and clip coordination in separate modules.
- Include `uncertain` when landmarks are missing or unreliable. Count reps only after a complete movement cycle and guard against duplicate counts.
- Preserve timestamp alignment between rep events and recorded video. A collection of image frames is not a playable video clip.
- Prefer local processing and storage where practical. Do not upload videos or pose data without explicit consent.

### 5.2 Privacy, security, and cost

- Never commit API keys, passwords, session tokens, signing keys, private videos, or personal user data.
- Do not place account credentials, session cookies, or private tokens in untrusted plugins or routers.
- Free chat access does not imply free API access. Do not treat routing software as a way to bypass provider limits.
- Prefer existing free tools, local checks, and open-source dependencies when suitable.
- Avoid redundant libraries, paid cloud ML, paid API calls, or new subscriptions unless the user explicitly approves the cost and need.
- Request camera permission only when needed, explain its purpose, show recording status, and preserve controls to disable automatic clip saving and delete local clips.
- Do not log raw frames, videos, or sensitive workout data.

### 5.3 User experience and safety language

- Do not communicate correctness using color alone; use text labels and accessible controls.
- Explain camera framing and missing-landmark states clearly.
- Do not claim medical-grade accuracy, diagnose a condition, or infer injury risk from a form score.
- Use supportive, non-shaming feedback and distinguish missing data from a genuine zero result.
- Handle permission denial, camera/inference failures, interrupted sessions, storage limits, and clip-save failures without falsely claiming success.

## 6. Required repository deliverables

The implementation phase, after the spec and plan are approved, is expected to create:

- `AGENT_WORKFLOW.md`
- `AGENTS.md`
- `CLAUDE.md`
- Six skill folders under `.agents/skills/`, each with a `SKILL.md`
- `.claude/skills/` adapters only if required for verified compatibility
- This specification under `docs/superpowers/specs/`
- An implementation plan under `docs/superpowers/plans/`, created only after the user approves this written specification

The existing files under `RepVisionAI_Project_Docs/` must remain intact.

## 7. Acceptance criteria

The workflow implementation will be accepted when:

1. All six skills have distinct responsibilities, usage triggers, inputs, procedures, outputs, and constraints.
2. Shared project rules are defined once where practical; platform-specific adapters are minimal and justified.
3. Agents are instructed to inspect the existing repository and project documentation before editing.
4. The workflow requires planning, small changes, relevant verification, independent review, and a clear handoff.
5. Security, privacy, cost, compatibility, and physical-device verification requirements are explicit.
6. No paid service is assumed, and free chat access is not confused with API access.
7. Existing project documentation remains unchanged unless the user separately approves edits.
8. The workflow does not claim the app is initialized or that any product feature is working without evidence.
9. The deliverables are committed to the existing repository, with links and verification status reported.
10. The work in this phase is limited to workflow documentation; no Expo scaffolding or product feature implementation is included.

## 8. Self-review and known boundaries

- **Scope:** Focused on the AI-assisted development workflow, not on implementing RepVision AI features.
- **Consistency:** Aligns with the existing PRD, architecture, development rules, design system, phrase guide, and project memory.
- **Ambiguity:** Shared skills are canonical under `.agents/skills/`; Claude-specific copies are not mandatory and must be justified by actual compatibility requirements.
- **Testing boundary:** Skill instructions and documentation can be reviewed in this phase; no runtime or physical-device functionality is claimed.
- **Pending technical decisions:** Expo SDK version, pose runtime, camera frame-processing path, clip-buffer implementation, persistence strategy, and need for a backend remain product implementation decisions and are not resolved by this workflow specification.
