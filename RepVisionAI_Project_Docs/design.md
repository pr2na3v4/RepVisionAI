# RepVision AI — Design System and Screen Specification

## 1. Design direction
Build a focused, modern fitness interface with a dark background, high-contrast text, and mint-green primary actions. The experience should feel technical but approachable, with minimal distractions during exercise.

## 2. Design tokens

### Colors
- `background`: `#0B1220`
- `surface`: `#172235`
- `surfaceElevated`: `#26364C`
- `primary`: `#34D399`
- `primaryText`: `#052E25`
- `textPrimary`: `#F8FAFC`
- `textSecondary`: `#94A3B8`
- `textMuted`: `#CBD5E1`
- `warning`: `#FBBF24`
- `error`: `#F87171`
- `success`: `#34D399`

Do not communicate form state by color alone; include labels or icons.

## 3. Typography
- Brand label: 12–14 px, bold, letter-spaced.
- Screen title: 30–36 px, extra-bold.
- Section heading: 18–20 px, bold.
- Body: 14–16 px.
- Helper text: 12–13 px with readable contrast.
- Use platform font defaults unless a bundled font is intentionally added.

## 4. Spacing and shapes
- Base spacing scale: 4, 8, 12, 16, 24, 32.
- Main screen horizontal padding: 20–24.
- Card radius: 16–20.
- Button radius: 12–16.
- Tap targets should generally be at least 44–48 dp.
- Use consistent gaps rather than manual spacer characters.

## 5. Screen specifications

### Home
Purpose: let the user choose an exercise quickly.
- Brand and headline at top.
- Short explanatory subtitle.
- Two large exercise cards: Push-ups and Squats.
- Each card has an icon/illustration, title, short muscle-group description, and directional affordance.
- Optional status area for future session history.
- Tapping a card opens workout setup with the selected exercise.

### Workout setup
Purpose: configure session targets.
- Exercise title and short description.
- Stepper for set count (initial range 1–10).
- Stepper for reps per set (initial range 1–50).
- Dynamic total target.
- Primary action to continue to camera instructions.
- Prevent invalid values.

### Camera instructions
Purpose: help users achieve useful framing before requesting a workout session.
- Exercise-specific camera angle recommendation.
- Checklist for stable phone placement, lighting, distance, and full-body visibility.
- Safety/transparency note.
- Primary action to open camera preparation.

### Workout session
Purpose: show live feedback without distracting the user.
- Camera preview occupies most of the screen.
- Pose skeleton overlay, when available.
- Visible state for camera and inference readiness.
- Large rep count and set count.
- Form label and concise feedback.
- Pause/end controls.
- Recording indicator when video is being saved.
- Avoid overlays that obscure body landmarks.

### Workout summary
Purpose: review the completed session.
- Completed sets and reps.
- Duration.
- Correct / incorrect / uncertain repetition breakdown, if available.
- Clip list with labels and playback.
- Delete controls and automatic-saving preference.
- Clear distinction between missing data and zero results.

## 6. Interaction patterns
- Primary action: mint-green filled button.
- Secondary action: neutral surface with high-contrast text.
- Pressable cards: visible pressed state and accessible label.
- Loading state: clear text; avoid indefinite spinners.
- Errors: explain what happened and what the user can do next.
- Confirm destructive actions such as clip deletion.

## 7. Camera overlay guidance
- Show framing guides only when useful.
- Do not show a green “correct” status until the model has produced a valid assessment.
- Show “uncertain” or “reposition” when required landmarks are missing.
- Keep rep count and set count readable at a glance.
- Indicate recording status separately from form status.

## 8. Responsive layout
- Test narrow and tall Android devices.
- Respect safe areas and system navigation bars.
- Support large text without clipping primary controls.
- Keep essential controls away from screen edges.
- Test portrait orientation first; explicitly handle orientation changes if supported.

## 9. Motion
- Use subtle transitions for screen changes and counters.
- Do not animate every camera frame.
- Avoid motion that reduces readability during exercise.
