import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { type Workout, type WorkoutId } from '../workout.constants';
import { styles } from '../workout.styles';
type Props = {
  workout: Workout;
  selectedWorkout: WorkoutId;
  repTarget: number;
  restSeconds: number;
  cameraError: string | null;
  onBackToSetup: () => void;
  onContinue: () => void;
};
export default function CameraInstructionsScreen({
  workout,
  selectedWorkout,
  repTarget,
  restSeconds,
  cameraError,
  onBackToSetup,
  onContinue,
}: Props) {
  const insets = useSafeAreaInsets();
  const contentStyle = [styles.content, { paddingBottom: insets.bottom + 32 }];
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          onPress={onBackToSetup}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back to Setup</Text>
        </Pressable>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>STEP 03 / 03 · PREPARATION</Text>
          <Text style={styles.heading}>
            Set your{'\n'}
            <Text style={styles.headingAccent}>camera.</Text>
          </Text>
          <Text style={styles.description}>
            Follow these tips so RepVision can see your movement clearly.
            Camera preview starts only after you continue and grant camera access. Repetition tracking is not active.
          </Text>
        </View>

        <View style={styles.instructionWorkoutCard}>
          <View style={styles.instructionWorkoutIcon}>
            <Text style={styles.instructionWorkoutEmoji}>{workout.icon}</Text>
          </View>
          <View style={styles.instructionWorkoutInfo}>
            <Text style={styles.setupLabel}>YOUR WORKOUT</Text>
            <Text style={styles.instructionWorkoutName}>{workout.name}</Text>
            <Text style={styles.workoutMuscles}>{workout.muscles}</Text>
          </View>
        </View>

        <View style={styles.instructionCard}>
          <View style={styles.instructionNumber}>
            <Text style={styles.instructionNumberText}>01</Text>
          </View>
          <View style={styles.instructionBody}>
            <Text style={styles.instructionTitle}>Position your phone</Text>
            <Text style={styles.instructionDescription}>
              Place your phone on a stable surface or tripod. Keep it steady
              and avoid holding it while exercising.
            </Text>
          </View>
        </View>

        <View style={styles.instructionCard}>
          <View style={styles.instructionNumber}>
            <Text style={styles.instructionNumberText}>02</Text>
          </View>
          <View style={styles.instructionBody}>
            <Text style={styles.instructionTitle}>Keep your full body visible</Text>
            <Text style={styles.instructionDescription}>
              Leave enough space around you so your head, hips, knees, and
              feet can stay inside the camera frame throughout each rep.
            </Text>
          </View>
        </View>

        <View style={styles.instructionCard}>
          <View style={styles.instructionNumber}>
            <Text style={styles.instructionNumberText}>03</Text>
          </View>
          <View style={styles.instructionBody}>
            <Text style={styles.instructionTitle}>
              Choose a clear angle
            </Text>
            <Text style={styles.instructionDescription}>
              {selectedWorkout === 'push-ups'
                ? 'Use a side or slightly diagonal view where your shoulders, hips, and ankles are easy to see.'
                : 'Use a front or slightly diagonal view where your hips, knees, and feet are easy to see.'}
            </Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>✦</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Before you continue</Text>
            <Text style={styles.tipDescription}>
              Make sure the floor is clear, lighting is good, and your phone
              cannot fall during the exercise. Stop if you feel pain or
              dizziness.
            </Text>
          </View>
        </View>

        <View style={styles.sessionSummary}>
          <Text style={styles.setupLabel}>SESSION SUMMARY</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Target</Text>
            <Text style={styles.summaryValue}>{repTarget} reps</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Rest between sets</Text>
            <Text style={styles.summaryValue}>{restSeconds} seconds</Text>
          </View>
        </View>

        {cameraError && <Text accessibilityRole="alert" style={styles.cameraErrorText}>{cameraError}</Text>}

        <Pressable
          accessibilityRole="button"
          onPress={onContinue}
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed,
          ]}
        >
          <Text style={styles.startButtonText}>Continue to Workout</Text>
          <Text style={styles.startButtonArrow}>→</Text>
        </Pressable>

        <Text style={styles.footer}>CAMERA PREVIEW ONLY · NO POSE OR REP TRACKING</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
