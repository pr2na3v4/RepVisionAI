import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WORKOUTS, type WorkoutId } from '../workout.constants';
import { styles } from '../workout.styles';
type Props = {
  selectedWorkout: WorkoutId;
  onSelectWorkout: (workout: WorkoutId) => void;
  onStartWorkout: () => void;
};
export default function WorkoutHomeScreen({
  selectedWorkout,
  onSelectWorkout,
  onStartWorkout,
}: Props) {
  const insets = useSafeAreaInsets();
  const contentStyle = [styles.content, { paddingBottom: insets.bottom + 32 }];
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <View style={styles.logoBar} />
              <View style={styles.logoBarShort} />
              <View style={styles.logoBar} />
            </View>

            <View>
              <Text style={styles.brandName}>RepVision</Text>
              <Text style={styles.brandSubtitle}>
                AI FITNESS COMPANION
              </Text>
            </View>
          </View>

          <View style={styles.status}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>READY</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>
            YOUR TRAINING, REIMAGINED
          </Text>

          <Text style={styles.heading}>
            Every rep.{'\n'}
            <Text style={styles.headingAccent}>
              More progress.
            </Text>
          </Text>

          <Text style={styles.description}>
            Train with intention. Track your repetitions and work
            towards better form, one workout at a time.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeadingContainer}>
            <Text style={styles.sectionTitle}>
              Choose your workout
            </Text>

            <Text style={styles.sectionSubtitle}>
              Select a movement to get started
            </Text>
          </View>

          <Text style={styles.stepLabel}>01 / 03</Text>
        </View>

        {WORKOUTS.map((item) => {
          const isSelected = selectedWorkout === item.id;

          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelectWorkout(item.id)}
              style={({ pressed }) => [
                styles.workoutCard,
                isSelected && styles.workoutCardSelected,
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.workoutIcon,
                  isSelected && styles.workoutIconSelected,
                ]}
              >
                <Text style={styles.workoutEmoji}>
                  {item.icon}
                </Text>
              </View>

              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>
                  {item.name}
                </Text>

                <Text style={styles.workoutDescription}>
                  {item.description}
                </Text>

                <Text style={styles.workoutMuscles}>
                  {item.muscles}
                </Text>
              </View>

              <View
                style={[
                  styles.radio,
                  isSelected && styles.radioSelected,
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </Pressable>
          );
        })}

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>✦</Text>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Your goal: quality reps
            </Text>

            <Text style={styles.tipDescription}>
              Consistent movement matters more than rushing through
              your workout.
            </Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onStartWorkout}
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed,
          ]}
        >
          <Text style={styles.startButtonText}>
            Start Workout
          </Text>

          <Text style={styles.startButtonArrow}>→</Text>
        </Pressable>

        <Text style={styles.footer}>
          BUILT FOR PROGRESS · POWERED BY REPVISION AI
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
