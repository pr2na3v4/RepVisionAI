# RepVision AI Agent Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add a low-cost, privacy-conscious, testable AI-assisted development workflow without initializing the app or implementing product features.

**Architecture:** Keep canonical shared instructions in `AGENTS.md`, `AGENT_WORKFLOW.md`, and `.agents/skills/`. Add `CLAUDE.md` as a concise entry point. Add Claude-specific skill adapters only if current discovery rules require them.

**Tech Stack:** Markdown, Git/GitHub, existing repository conventions; no runtime dependencies.

**Spec:** `docs/superpowers/specs/2026-10-17-agent-workflow-design.md`

## Global Constraints
- Use React Native + Expo + TypeScript and the project's actual initialized conventions.
- The user does not want Android Studio as the IDE. Android SDK command-line tools or other native build prerequisites may still be required.
- Prefer on-device inference and local clip storage where practical.
- Do not assume paid AI APIs or subscriptions.
- Form assessment is an estimate, not medical advice, diagnosis, injury prediction, or a guarantee of safety.
- Do not report camera, ML, repetition counting, or clip capture as verified until tested on a physical Android device.
- Do not upload videos or pose data without explicit consent.
- Never commit API keys, passwords, session tokens, signing keys, private videos, or personal user data.
- Free chat access does not imply free API access. Do not treat routing software as a way to bypass provider limits.
- Prefer existing free tools, local checks, and open-source dependencies when suitable.
- Avoid redundant libraries, paid cloud ML, paid API calls, or new subscriptions unless the user explicitly approves the cost and need.
- Use `npx expo install` for compatible Expo/native packages when appropriate and run `npx expo-doctor` after dependency changes.
- Do not communicate correctness using color alone; use text labels and accessible controls.
- Do not claim medical-grade accuracy, diagnose a condition, or infer injury risk from a form score.
- This phase is documentation only: do not initialize Expo or implement product features.
- Existing files under `RepVisionAI_Project_Docs/` must remain intact.

## Review Focus
- Secrets/private data in examples: scan new Markdown for credentials and use placeholders only.
- Paid-service assumptions/provider-limit bypass: ensure costs require approval and credentials are never shared with untrusted tools.
- Unsupported device-feature claims: camera, pose, rep counting, and clips must not be described as verified without physical Android evidence.
- Skill-discovery incompatibility: create Claude adapters only if supported conventions are verified.
- Scope creep: final diff must contain workflow documentation only, no Expo scaffolding and no edits under `RepVisionAI_Project_Docs/`.

---

### Task 1: Add shared and platform entry-point instructions

**Files:** Create `AGENTS.md`, `CLAUDE.md`.

**Interfaces:** Read the approved spec and relevant existing files under `RepVisionAI_Project_Docs/`. Produce a concise shared agent entry point and a concise Claude Code entry point that links to canonical rules instead of duplicating them.

- [x] **Step 1:** Draft `AGENTS.md` with project summary, links to source-of-truth docs, inspect-before-editing, planning, approval gates, verification honesty, privacy, cost, and device rules.
- [x] **Step 2:** Verify the current supported Claude Code instruction convention from reliable installed or official documentation.
- [x] **Step 3:** Draft `CLAUDE.md` as a minimal entry point to shared instructions. Do not assert unverified platform-specific behavior.
- [x] **Step 4:** Check links, secrets, current app status, and scope. Expected: no credentials, no claim that Expo is initialized, no edits to existing product docs.
- [x] **Step 5:** Commit as `docs: add shared agent instructions`.

### Task 2: Document the end-to-end agent workflow

**Files:** Create `AGENT_WORKFLOW.md`.

**Interfaces:** Consumes `AGENTS.md` and the approved spec. Produces the repeatable workflow and a handoff template.

- [x] **Step 1:** Document triage/context, planning, reuse review, small implementation task, verification, independent review, physical-device validation, documentation/commit, and handoff in that order.
- [x] **Step 2:** Add a handoff template recording task, acceptance criteria, files changed, exact checks/results, device-test status, limitations, risks, and next step.
- [x] **Step 3:** Add a completion checklist requiring evidence for acceptance criteria and clear labels for checks not run.
- [x] **Step 4:** Verify privacy, cost, safety-language, and device-validation rules match the spec.
- [x] **Step 5:** Commit as `docs: define agent development workflow`.

### Task 3: Add planning and repository-reuse skills

**Files:** Create `.agents/skills/repvision-planning/SKILL.md` and `.agents/skills/repvision-repo-reuse/SKILL.md`.

**Interfaces:** Both consume shared instructions and project docs; each skill defines purpose, triggers, required context, procedure, output, and constraints.

- [x] **Step 1:** Write `repvision-planning` to define scope, exclusions, acceptance criteria, likely files, risks, dependencies, and verification; ask one focused question when a material requirement is missing.
- [x] **Step 2:** Write `repvision-repo-reuse` to inspect existing code and evaluate libraries/repos for maintenance, license, compatibility, security, fit, and integration effort before rebuilding.
- [x] **Step 3:** Ensure planning and reuse have distinct responsibilities; never claim a candidate library solves the complete product without evidence.
- [x] **Step 4:** Commit as `docs: add planning and reuse skills`.

### Task 4: Add React Native and camera/ML skills

**Files:** Create `.agents/skills/repvision-react-native/SKILL.md` and `.agents/skills/repvision-camera-ml/SKILL.md`.

- [x] **Step 1:** Write `repvision-react-native` to inspect actual SDK/package versions and project conventions, verify official compatibility, and minimize dependencies.
- [x] **Step 2:** Write `repvision-camera-ml` to separate camera lifecycle, pose inference, feature extraction, rep state machine, form assessment, and clip coordination.
- [x] **Step 3:** Require uncertainty for missing/unreliable landmarks, duplicate-count guards, timestamp alignment, resource cleanup, and explicit failure handling.
- [x] **Step 4:** State that inference frames are not playable video and device-dependent behavior remains unverified until tested on a physical Android phone.
- [x] **Step 5:** Commit as `docs: add React Native and camera ML skills`.

### Task 5: Add testing and code-review skills

**Files:** Create `.agents/skills/repvision-testing/SKILL.md` and `.agents/skills/repvision-code-review/SKILL.md`.

- [x] **Step 1:** Write `repvision-testing` to select relevant unit, integration, UI, permission/error-state, and device checks; report exact commands and outcomes and label unavailable checks as not run.
- [x] **Step 2:** Write `repvision-code-review` to independently inspect correctness, types, architecture, security, privacy, performance, accessibility, dependency scope, regressions, and unsupported claims.
- [x] **Step 3:** Include relevant failure scenarios: permission denial, missing/unreliable landmarks, interrupted sessions/recording, storage limits, clip-save failure, and unavailable device access.
- [x] **Step 4:** Commit as `docs: add testing and code review skills`.

### Task 6: Decide whether Claude-specific skill adapters are needed

**Files:** Create `.claude/skills/<skill>/SKILL.md` only if current supported discovery rules require them; otherwise create none.

- [x] **Step 1:** Verify current official Claude Code skill-discovery rules.
- [x] **Step 2:** Compare the supported path and format with canonical skills under `.agents/skills/`.
- [x] **Step 3:** Add only minimal justified adapters; avoid divergent duplicate skill bodies.
- [x] **Step 4:** Record the decision in `AGENT_WORKFLOW.md`; commit any necessary update as `docs: document Claude skill adapter decision`.

### Task 7: Cross-document acceptance review and handoff

**Files:** Review all new workflow files and optional adapters. Preserve the approved spec and all files under `RepVisionAI_Project_Docs/`.

- [x] **Step 1:** Verify the six canonical skill paths exist and every skill defines purpose, triggers, inputs, procedure, output, and constraints.
- [x] **Step 2:** Verify shared/platform instructions are consistent and adapters are justified.
- [x] **Step 3:** Run available Markdown/link checks. If no tooling exists, perform targeted local checks and report what was checked rather than adding a dependency solely for this phase.
- [x] **Step 4:** Inspect the full diff for secrets, paid-service assumptions, unsupported compatibility claims, product-feature claims, Expo scaffolding, and edits to existing product docs.
- [x] **Step 5:** Map each spec acceptance criterion to evidence; document any unmet criterion honestly.
- [x] **Step 6:** Commit final fixes and report paths, commits, checks run, limitations, and next step.

## Self-review
- **Spec coverage:** Tasks 1–2 cover entry points and workflow; Tasks 3–5 cover all six skills; Task 6 verifies whether adapters are needed; Task 7 checks acceptance criteria and preservation.
- **Step granularity:** Each task yields an independently reviewable documentation deliverable or a verifiable decision.
- **Type consistency:** No runtime interfaces or application types are introduced.
- **Review Focus coverage:** Secrets and cost are checked in Tasks 1, 2, and 7; device claims and failure modes in Tasks 4, 5, and 7; platform discovery in Task 6; scope preservation in Task 7.
- **Proportion:** The plan specifies files, boundaries, checks, and commits without pre-writing the deliverables.


## Execution record

- **Implementation branch:** `docs/agent-workflow` (kept `main` untouched).
- **Deliverables:** `AGENTS.md`, `CLAUDE.md`, `AGENT_WORKFLOW.md`, six canonical shared skills, and six minimal Claude Code adapters.
- **Platform decision:** Anthropic's published guidance documents `.claude/skills/<skill-name>/SKILL.md` as the project skill discovery path, so minimal adapters point to the canonical `.agents/skills/` definitions rather than duplicating their bodies.
- **Structural checks:** Confirmed all six canonical skills and six adapters exist; all skill files have `name` and `description` YAML frontmatter; all canonical skills contain purpose/use trigger, required context, procedure, expected output, and constraints sections.
- **Safety scan:** Scanned the three root workflow documents and six canonical skill files for common token-shaped credential patterns; none found.
- **Preservation check:** Compared Git blob SHAs for all six files in `RepVisionAI_Project_Docs/` between `main` and `docs/agent-workflow`; all six are unchanged.
- **Limitations:** No local checkout or shell-based Markdown linter/test suite was available in this execution environment, so no local test command was run. No app or device behavior was tested or claimed; this change is documentation-only.
- **Execution-method limitation:** Work was committed through the connected GitHub repository interface on a dedicated branch, rather than a local git worktree. This avoided writing to `main`, but local git status and diff commands were unavailable.
- **Final review:** Author self-review performed against the approved specification and review-focus items; no separate reviewer/subagent tool was available in this session.
