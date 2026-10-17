# RepVision AI — Claude Code Entry Point

Before making changes, read `AGENTS.md` and `AGENT_WORKFLOW.md`. Treat `AGENTS.md` as the shared project rules and `RepVisionAI_Project_Docs/` as the product documentation source of truth.

For major changes, read the relevant product docs, inspect the actual repository and dependencies, plan a small task with acceptance criteria, evaluate reuse before adding dependencies, verify changes, and perform an independent review before handoff.

Use the canonical skill definitions under `.agents/skills/` when applicable:
- `repvision-planning`
- `repvision-react-native`
- `repvision-repo-reuse`
- `repvision-camera-ml`
- `repvision-testing`
- `repvision-code-review`

Do not assume the Expo app is initialized. Do not claim camera, pose estimation, rep counting, or clip capture works without physical Android device evidence. Follow all privacy, security, cost, approval, and safety-language requirements in `AGENTS.md`.
