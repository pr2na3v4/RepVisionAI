import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { REST_OPTIONS, type Workout } from '../workout.constants';
import { styles } from '../workout.styles';
type Props = {
  workout: Workout;
  repTarget: number;
  setRepTarget: (update: (value: number) => number) => void;
  restSeconds: number;
  setRestSeconds: (seconds: number) => void;
  onBackToHome: () => void;
  onConfirm: () => void;
};
export default function WorkoutSetupScreen({
  workout,
  repTarget,
  setRepTarget,
  restSeconds,
  setRestSeconds,
  onBackToHome,
  onConfirm,
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
          onPress={onBackToHome}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </Pressable>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>
            WORKOUT CONFIGURATION
          </Text>

          <Text style={styles.heading}>
            Get ready to{'\n'}
            <Text style={styles.headingAccent}>move.</Text>
          </Text>

          <Text style={styles.description}>
            Customize your session before getting ready to train.
          </Text>
        </View>

        <View style={styles.setupCard}>
          <Text style={styles.setupLabel}>SELECTED WORKOUT</Text>

          <Text style={styles.setupWorkout}>
            {workout.icon} {workout.name}
          </Text>

          <Text style={styles.workoutDescription}>
            {workout.description}
          </Text>

          <Text style={styles.workoutMuscles}>
            {workout.muscles}
          </Text>
        </View>

        <View style={styles.setupCard}>
          <Text style={styles.setupLabel}>
            TARGET REPETITIONS
          </Text>

          <View style={styles.stepper}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Decrease rep target"
              onPress={() =>
                setRepTarget((value) => Math.max(1, value - 5))
              }
              style={({ pressed }) => [
                styles.stepButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.stepButtonText}>−</Text>
            </Pressable>

            <View style={styles.stepValueContainer}>
              <Text style={styles.stepValue}>{repTarget}</Text>
              <Text style={styles.stepUnit}>reps</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Increase rep target"
              onPress={() =>
                setRepTarget((value) => Math.min(100, value + 5))
              }
              style={({ pressed }) => [
                styles.stepButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.stepButtonText}>+</Text>
            </Pressable>
          </View>

          <Text style={styles.helperText}>
            Choose between 1 and 100 repetitions.
          </Text>
        </View>

        <View style={styles.setupCard}>
          <Text style={styles.setupLabel}>
            REST BETWEEN SETS
          </Text>

          <View style={styles.restOptions}>
            {REST_OPTIONS.map((seconds) => {
              const selected = restSeconds === seconds;

              return (
                <Pressable
                  key={seconds}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setRestSeconds(seconds)}
                  style={({ pressed }) => [
                    styles.restOption,
                    selected && styles.restOptionSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.restOptionText,
                      selected && styles.restOptionTextSelected,
                    ]}
                  >
                    {seconds}s
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>✦</Text>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Next: camera positioning
            </Text>

            <Text style={styles.tipDescription}>
              We will add camera angle instructions, pose detection,
              and repetition tracking in later development steps.
            </Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onConfirm}
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed,
          ]}
        >
          <Text style={styles.startButtonText}>
            Confirm Setup
          </Text>
          <Text style={styles.startButtonArrow}>→</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
