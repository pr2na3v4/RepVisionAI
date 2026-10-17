# RepVision AI — Agent Development Workflow

This workflow coordinates AI-assisted development while keeping the user in control of scope, costs, privacy, and acceptance.

## Status and source of truth
The repository currently contains project documentation and workflow planning. App initialization and product features are not confirmed. Read `AGENTS.md` first, then the relevant files in `RepVisionAI_Project_Docs/`. The approved workflow specification is `docs/superpowers/specs/2026-10-17-agent-workflow-design.md`.

## Roles
Roles are responsibilities, not a requirement to run six paid agents. The user may manually hand off work between available assistants.

1. **Planner** — `repvision-planning`: converts a request into a bounded task and acceptance criteria.
2. **React Native implementer** — `repvision-react-native`: handles app structure and platform-aware TypeScript/Expo changes.
3. **Reuse investigator** — `repvision-repo-reuse`: evaluates existing code, packages, and repositories before rebuilding.
4. **Camera/ML specialist** — `repvision-camera-ml`: keeps camera lifecycle, pose data, rep logic, form assessment, and clip coordination separate.
5. **Tester** — `repvision-testing`: selects checks, runs available tests, and reports evidence honestly.
6. **Independent reviewer** — `repvision-code-review`: checks the change from a separate review perspective.
7. **User/product owner** — approves material product decisions, tests on the target device when possible, and decides whether the work is accepted.

## Standard workflow

### 1. Triage and context
- Read `AGENTS.md`, this workflow, and the relevant product docs.
- Inspect the current branch, working tree/diff, affected files, dependencies, and recent changes.
- State what is known, what is unknown, and whether the app is initialized.

**Output:** a concise understanding of the request and constraints.

### 2. Plan
- Define the problem, in-scope work, exclusions, acceptance criteria, likely files, risks, dependencies, and verification.
- Ask one focused question if a missing requirement would materially change the implementation.
- Obtain approval before material scope changes, new cloud upload, analytics, accounts, paid services, or privacy-impacting behavior.

**Output:** an agreed, small task. Use the Superpowers spec/plan review gates for architectural work.

### 3. Review reuse
- Search existing project code and relevant maintained libraries before creating new abstractions or dependencies.
- Check official documentation, maintenance activity, license, platform/Expo compatibility, security posture, integration effort, and fit for the exact requirement.
- Distinguish infrastructure that can be reused from product logic that still needs implementation.

**Output:** a short reuse decision with evidence and trade-offs.

### 4. Implement one logical change
- Follow the relevant skill in `.agents/skills/`.
- Make the smallest coherent change that meets acceptance criteria.
- Keep UI, workout state, pose inference, feature extraction, repetition state machine, form assessment, and recording/clip coordination in separate modules.
- Avoid unrelated refactors and redundant dependencies.

**Output:** a focused diff.

### 5. Verify
- Choose checks that fit the current repository state: formatting, lint, type checks, unit/integration/UI tests, Expo diagnostics, permission/error paths, or manual checks.
- Run each available relevant check and record the exact command and result.
- Clearly label checks that are not run and explain why. Do not invent results.
- A dependency install, compile, mock, or emulator run alone does not prove camera/ML/recording behavior works on a physical device.

**Output:** evidence against every acceptance criterion.

### 6. Independent review
Use `repvision-code-review` or a separate review pass. Inspect correctness, types, architecture, security/privacy, performance, accessibility, dependency scope, regression risk, and unsupported claims. Fix material findings or document unresolved risks and the reason they remain.

**Output:** findings and disposition.

### 7. Device validation
Test camera permissions, framing, inference, repetition counting, and clip playback on a physical Android device whenever those capabilities are touched. Confirm clips are playable video and that rep-event timestamps align with the recording.

If a device is unavailable, mark device behavior **not verified** and describe the remaining test. Do not infer success.

### 8. Documentation and commit
- Update `RepVisionAI_Project_Docs/memory.md` or architecture notes when a decision or behavior changes; avoid editing existing docs for unrelated tasks.
- Review the full diff for secrets, personal data, unintended files, and scope creep.
- Commit a small milestone with a descriptive message when the user-authorized workflow permits it. Do not merge or publish without appropriate authorization.

### 9. Handoff
Use this template:

```text
Task:
Acceptance criteria:
Files changed:
Reuse/dependency decisions:
Checks run (exact commands and results):
Checks not run and why:
Physical Android device verification: passed / failed / not run / not applicable
Review findings and disposition:
Privacy, security, cost, or safety notes:
Known limitations:
Commit/branch:
Next step:
```

## Completion checklist
- [ ] Scope and acceptance criteria are explicit.
- [ ] Relevant project docs and current files were inspected.
- [ ] Reuse and dependency choices are justified.
- [ ] Change is focused and does not exceed approved scope.
- [ ] Available relevant checks were run and results recorded.
- [ ] Review findings were addressed or documented.
- [ ] Device-dependent behavior is physically tested or explicitly unverified.
- [ ] Privacy, security, accessibility, cost, and safety language were reviewed.
- [ ] Documentation and diff are clean; no secrets or private data were added.
- [ ] Handoff lists limitations and the next step.

## Cost, privacy, and safety guardrails
- Prefer existing free tools, local checks, and open-source dependencies where suitable.
- Free chat access does not imply free API access. Do not bypass provider limits or share credentials/session cookies with untrusted plugins or routers.
- Do not introduce paid APIs, subscriptions, paid cloud ML, or cloud upload without explicit user approval.
- Prefer on-device inference and local clip storage where practical; never upload recordings or pose data without explicit consent.
- Request camera permission only when needed; explain why, show recording status, and allow automatic capture to be disabled and local clips deleted.
- Do not log raw frames, videos, or sensitive workout data.
- Form feedback is an estimate, not medical advice or a diagnosis. Never infer injury risk or promise safety from a score. Use supportive, non-shaming text and do not rely on color alone.

## Platform skill-adapter decision
Canonical project skill definitions live under `.agents/skills/`. Claude Code's documented project-skill discovery path is `.claude/skills/<skill-name>/SKILL.md`, so this repository includes six minimal adapters at that path. Each adapter directs Claude Code to read the corresponding canonical shared skill; it does not copy the full skill body. This decision is based on Anthropic's current guidance: [Claude Code skills](https://claude.com/resources/articles/steering-claude-code-skills-hooks-rules-subagents-and-more) and [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview). If the canonical file cannot be accessed, the adapter instructs the agent to stop and report the issue rather than inventing missing guidance.
