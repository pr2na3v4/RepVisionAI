---
name: repvision-repo-reuse
description: Investigate existing code, libraries, and repositories before rebuilding functionality or adding dependencies.
---

# RepVision Repository Reuse

## Use when
A task may be solved by existing project code, an open-source repository, an Expo module, a camera/ML library, or a third-party service.

## Required context
- Read `AGENTS.md`, relevant architecture/rules, and the task's acceptance criteria.
- Inspect current package versions and existing abstractions before searching externally.

## Procedure
1. Search the repository for existing code, interfaces, dependencies, TODOs, and prior decisions.
2. Search official documentation and source repositories for candidates that address the specific requirement.
3. Evaluate each credible candidate for:
   - Exact functional fit and missing product logic
   - License and usage constraints
   - Maintenance/release activity and issue health
   - Security posture and permissions
   - React Native, Android, and current Expo SDK compatibility
   - Native build requirements and development effort
   - Data handling, network requirements, privacy, and cost
4. Prefer official sources for package APIs and compatibility claims. Record the date/context when behavior is version-sensitive.
5. Separate reusable infrastructure from RepVision-specific logic. A pose model estimates landmarks; it does not automatically classify exercise correctness or generate synchronized playable clips.
6. Recommend reuse only when it reduces risk or effort. If no candidate fits, explain why a small custom implementation is justified.
7. Record the chosen option, alternatives rejected, dependencies added (if any), and verification still needed.

## Expected output
A short reuse decision:
- Existing code/candidates checked
- Evidence and compatibility status
- License, maintenance, security, privacy, and cost notes
- Fit/gaps and integration effort
- Recommendation and next verification step

## Constraints
- Never invent repository existence, package APIs, version compatibility, license, or maintenance status.
- Do not add a dependency just because it is popular.
- Do not assume an integration works in Expo Go; verify native requirements and dev-build compatibility.
- Do not use routing software to bypass provider limits or pass credentials to untrusted tools.
- Do not claim a repository solves the complete product unless its behavior was actually verified.
