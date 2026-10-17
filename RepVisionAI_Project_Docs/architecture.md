# RepVision AI — Architecture

## 1. Architecture principles
- Android-first, React Native + Expo + TypeScript.
- Start with a modular client; do not introduce a backend until a concrete requirement needs one.
- Keep UI, workout state, pose inference, form assessment, and video recording separate.
- Prefer on-device inference and local video storage.
- Select native ML and camera-frame dependencies only after checking compatibility with the chosen Expo SDK.
- Treat model output as an estimate, not a medical judgment.

## 2. High-level data flow

```text
Android Camera
    |
    +--> Camera Preview ------------------------------> UI
    |
    +--> Supported frame/inference pipeline
              |
              v
        Pretrained Pose Model
              |
              v
        Pose Landmarks + Visibility/Confidence
              |
              v
        Feature Extraction
        (angles, alignment, temporal changes)
              |
              v
        Rep State Machine + Form Assessor
              |
              +--> Live feedback / rep count / set progress
              |
              +--> Rep event (label, timestamp, metadata)
                            |
                            v
                  Clip Boundary Coordinator
                            |
                            v
                  Recording/Trim Pipeline
                            |
                            v
                  Local Clip Storage
                            |
                            v
                  Session Summary / Clip Review
```

## 3. Proposed folder structure

```text
RepVisionAI/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── workout/
│       ├── setup.tsx
│       ├── instructions.tsx
│       ├── session.tsx
│       └── summary.tsx
├── src/
│   ├── components/
│   ├── constants/
│   ├── features/
│   │   ├── workouts/
│   │   ├── camera/
│   │   ├── pose/
│   │   ├── form-analysis/
│   │   └── recording/
│   ├── services/
│   ├── storage/
│   └── types/
├── assets/
├── app.json
├── package.json
└── tsconfig.json
```

The exact Expo Router paths can be adapted to the template created by `create-expo-app`. Avoid duplicate route files for the same screen.

## 4. Module responsibilities

### UI / navigation
Owns screen rendering, navigation, controls, permission prompts, and accessible status messages. It should not contain ML algorithms.

### Workout configuration and session state
Stores exercise type, target sets/reps, current set, current rep count, elapsed time, and session status.

### Camera adapter
Owns camera permissions, preview lifecycle, frame delivery where supported, and camera state. It exposes a stable interface to other modules.

### Pose adapter
Wraps the selected pretrained pose model. Input: image/frame data in the format required by the runtime. Output: normalized landmarks, world landmarks if supported, visibility/presence, timestamp, and inference status.

### Feature extraction
Computes angles, relative positions, body alignment indicators, and temporal features. Normalize coordinates where useful so results are less dependent on image dimensions.

### Rep state machine
Tracks exercise phases and emits one completed-repetition event per cycle. It must handle missing landmarks and debounce transitions to prevent duplicate counts.

### Form assessor
Consumes landmarks/features and returns a typed result such as `correct`, `incorrect`, or `uncertain`, with an optional reason and a score whose semantics are explicitly documented.

### Recording coordinator
Maps rep events to video timestamps and clip boundaries. It uses a supported recording or rolling-buffer implementation; inference frames alone must not be assumed to constitute a playable video.

### Local storage
Stores session metadata, clip URI, rep/set identifiers, label, and timestamps. Keep storage APIs behind a service interface so the persistence implementation can change.

## 5. Core types

```ts
export type ExerciseType = "pushups" | "squats";
export type FormLabel = "correct" | "incorrect" | "uncertain";

export interface WorkoutConfig {
  exercise: ExerciseType;
  targetSets: number;
  targetReps: number;
}

export interface PoseLandmark {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
  presence?: number;
}

export interface FormAnalysis {
  label: FormLabel;
  confidence: number | null;
  feedback: string;
}

export interface RepResult {
  repNumber: number;
  setNumber: number;
  form: FormLabel;
  timestamp: number;
  videoUri?: string;
}
```

## 6. Exercise pipeline
- **Push-ups:** start with side-view framing; analyze body alignment and shoulder/elbow movement, then validate rep phases.
- **Squats:** start with side-view framing; analyze hip/knee movement, depth relative to defined criteria, and trunk position.
- Do not assume one camera angle can reliably measure every possible form feature. State which features are being evaluated.

## 7. Clip-capture design
A repetition event should contain a timestamp and form label. The recording layer should preserve a configurable pre-event window and post-event window. Possible implementation strategies include:
1. Continuous/segmented recording with trimming, if supported by the selected native pipeline.
2. A native rolling video buffer that can export a segment around the event.

Validate timestamp synchronization between camera video and inference results. Avoid saving overlapping duplicate clips unless intended. Handle recording failures without stopping workout tracking.

## 8. State and events
Suggested session states:
`idle -> checking_camera -> ready -> exercising -> resting -> completed`
and `paused` / `error` as appropriate.

Suggested events:
- `pose.updated`
- `pose.unavailable`
- `rep.started`
- `rep.completed`
- `form.assessed`
- `clip.saved`
- `clip.failed`
- `set.completed`
- `session.completed`

These are conceptual event names; they do not require an event-bus library in the MVP.

## 9. Privacy and security
- Request camera access only when needed and explain why.
- Keep processing on-device when feasible.
- Do not upload video or pose data without clear consent.
- Provide clip deletion and a way to disable automatic saving.
- Avoid logging raw frames, video, or sensitive user data.
- Document local file retention and cleanup behavior.

## 10. Native compatibility strategy
Expo Go is useful for initial UI work, but custom native modules and certain camera frame processors require a development build. Use VS Code as the editor. Android Studio is not required as the IDE; Android SDK command-line tools and a compatible Java environment may still be needed for local native builds. A physical Android device and a compatible development workflow can reduce dependence on an emulator.

Before selecting MediaPipe, TensorFlow Lite, or a frame processor package, verify maintenance status, Android support, React Native compatibility, and Expo SDK compatibility. Do not assume the native Android SDK can be imported directly into JavaScript.
