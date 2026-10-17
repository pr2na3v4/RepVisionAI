# RepVision AI — Product Requirements Document (PRD)

## 1. Product overview
**Product name:** RepVision AI  
**Platform:** Android-first mobile app  
**Primary client:** React Native + Expo + TypeScript  
**Core concept:** A workout assistant that uses a phone camera and pretrained pose estimation to analyze selected body movements, estimate exercise-form quality, count repetitions, track sets, and save clips of selected correct and incorrect repetitions.

## 2. Problem statement
People exercising at home may struggle to judge their form, count repetitions consistently, and review how they performed. RepVision AI aims to provide visual feedback and a session summary using a phone camera.

## 3. Goals
- Let users select Push-ups or Squats.
- Guide users to position the camera appropriately.
- Detect body landmarks in a live camera view.
- Track movement phases and count completed repetitions.
- Track target sets and repetitions.
- Estimate form quality and provide simple feedback.
- Automatically save clips associated with selected correct and incorrect repetitions.
- Provide a workout summary and clip review.

## 4. Non-goals for the first MVP
- Medical diagnosis or injury prediction.
- Guaranteeing that a movement is safe or perfectly correct.
- Social feeds, leaderboards, subscriptions, and coach marketplaces.
- Supporting many exercises beyond push-ups and squats.
- Mandatory cloud processing of camera frames.
- Training a pose-estimation model from scratch.

## 5. Target user and primary use case
A person exercising at home with an Android phone, a stable phone stand, sufficient lighting, and enough space to keep the body visible in the camera frame.

## 6. User journey
1. Open the app.
2. Choose Push-ups or Squats.
3. Configure target sets and repetitions.
4. Read exercise-specific camera placement instructions.
5. Grant camera permission and check framing.
6. Start the session.
7. See pose landmarks, repetition count, set progress, and feedback.
8. Finish or stop the workout.
9. Review session statistics and saved clips.

## 7. Functional requirements

### FR-01: Exercise selection
The home screen must offer Push-ups and Squats.

### FR-02: Workout configuration
Users can choose a target set count and repetitions per set. Values must be validated and bounded.

### FR-03: Camera guidance
Before starting, show setup guidance for camera angle, distance, lighting, stability, and full-body visibility. Guidance should differ by exercise when necessary.

### FR-04: Camera and pose detection
The app requests camera permission and displays a camera preview. Pose inference should process frames using a compatible pretrained model. The app must indicate when the body or required landmarks cannot be detected reliably.

### FR-05: Repetition tracking
Use a movement state machine to identify the start, bottom/turning point, and completion of a repetition. Do not count every frame as a repetition.

### FR-06: Form assessment
Begin with interpretable rules and/or a trained classifier over pose landmarks or landmark sequences. Support three outcomes: `correct`, `incorrect`, and `uncertain`. Provide a short explanation where possible.

### FR-07: Confidence and score semantics
Do not describe model confidence as a probability that exercise is medically safe. Only display calibrated confidence if validation supports it. Otherwise label the value as an estimated form score and document its meaning.

### FR-08: Automatic clips
Save video segments associated with both correct and incorrect repetitions. Preserve pre-event footage with a rolling buffer or another supported recording approach, plus a configurable post-event window. Associate each clip with session, set, repetition number, and form label.

### FR-09: Set tracking
Track current set, completed repetitions, target repetitions, and set completion. Allow a rest state between sets in a later iteration if needed.

### FR-10: Session summary
Show completed sets/repetitions, estimated form breakdown, session duration, and saved clips.

### FR-11: Privacy and controls
Explain when recording is active. Allow the user to disable saving clips and delete saved clips. Prefer on-device processing where practical and do not upload video without explicit consent.

### FR-12: Error handling
Handle camera permission denial, unsupported devices, low-confidence pose detection, interrupted sessions, storage limitations, and recording failures with understandable messages.

## 8. Non-functional requirements
- Responsive UI on supported Android screen sizes.
- Maintainable TypeScript code with shared types.
- Camera and ML processing must not block the UI thread.
- Graceful handling of low frame rates and temporary landmark loss.
- Clear privacy behavior and user-controlled video storage.
- No claims of medical-grade accuracy without suitable evidence.
- Dependency versions must be compatible with the selected Expo SDK and native runtime.

## 9. MVP acceptance criteria
- User can select either supported exercise.
- User can set a target number of sets and reps.
- User can navigate through setup instructions.
- Camera permission and preview work on a physical Android device.
- Pose landmarks are visible or their absence is clearly explained.
- Rep counting is stable enough for controlled test sessions.
- Form output supports correct, incorrect, and uncertain states.
- Clips can be saved and reviewed for both form labels when the recording pipeline is available.
- A session summary reflects actual session data.
- The user can delete clips and disable clip saving.

## 10. Risks and mitigations
- **Camera angle affects accuracy:** provide exercise-specific instructions and a framing check.
- **Pretrained pose models do not classify exercise form by themselves:** add movement logic and a separately validated form classifier.
- **Mobile native dependencies may conflict:** verify Expo SDK compatibility before selecting frame processors or ML bindings.
- **Video frame capture is not equivalent to video recording:** design and test the recording pipeline separately from inference.
- **False form labels:** use an `uncertain` state, conservative thresholds, and test across people and devices.
- **Privacy concerns:** default to local processing/storage where practical and make recording visible and controllable.

## 11. Delivery phases
1. Project documentation and app foundation.
2. Home, setup, and instruction screens.
3. Camera preview and permission handling.
4. Pretrained pose estimation on Android.
5. Rep-count state machine.
6. Form assessment baseline and dataset evaluation.
7. Correct/incorrect clip capture.
8. Summary, persistence, QA, and privacy review.
