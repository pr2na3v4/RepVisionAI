---
name: repvision-react-native
description: Implement maintainable React Native, Expo, and TypeScript changes using verified project conventions.
---

# RepVision React Native

## Use when
Building or modifying app screens, navigation, components, state, services, TypeScript interfaces, or native-package integration.

## Required context
- Read `AGENTS.md`, `AGENT_WORKFLOW.md`, and relevant product docs.
- Inspect the actual repository and determine whether Expo has been initialized.
- Read the current `package.json`, Expo SDK, React Native version, and relevant configuration before suggesting code or packages.

## Procedure
1. Follow the planning skill's scope and acceptance criteria.
2. Inspect existing route conventions, reusable UI, types, services, and styling before creating new patterns.
3. Keep screens in the established app route structure, reusable UI in components, domain logic in feature modules, and persistence/device integrations behind service or adapter interfaces.
4. Use functional components and hooks; prefer explicit types and runtime validation for external data.
5. Before adding native dependencies, verify current official documentation, Expo SDK compatibility, Android support, maintenance, permissions, and native build requirements. Use `npx expo install` for Expo-compatible native packages when appropriate.
6. Keep expensive inference off the UI thread. Clean up listeners, camera sessions, subscriptions, and native resources on unmount or interruption.
7. Handle loading, empty, uncertain, permission-denied, error, and retry states explicitly.
8. Run appropriate type checks, lint, tests, and `npx expo-doctor` after dependency changes where applicable. Record commands and results.
9. Review the diff and document any unverified device-specific behavior.

## Expected output
A focused diff plus a handoff with files changed, architectural/dependency choices, checks and results, limitations, and next step.

## Constraints
- Do not assume an app template, route file, package version, or API that is not present.
- Avoid `any` unless a documented boundary makes it necessary.
- Do not combine camera lifecycle, inference, rep logic, form assessment, and recording in one component.
- Do not add paid services or a backend without explicit approval.
- Physical Android testing is required before claiming camera, ML, or recording behavior works.
