import { CameraView } from 'expo-camera';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { type SessionStatus, type Workout } from '../workout.constants';
import { styles } from '../workout.styles';
type Props = {
  workout: Workout;
  repTarget: number;
  restSeconds: number;
  status: SessionStatus;
  cameraError: string | null;
  onBackToInstructions: () => void;
  onRetryCamera: () => void;
  onToggleSession: () => void;
  onFinishSession: () => void;
  onCameraReady: () => void;
  onCameraError: (message: string) => void;
};
export default function WorkoutSessionScreen({
  workout,
  repTarget,
  restSeconds,
  status: sessionStatus,
  cameraError,
  onBackToInstructions,
  onRetryCamera,
  onToggleSession,
  onFinishSession,
  onCameraReady,
  onCameraError,
}: Props) {
  const insets = useSafeAreaInsets();
  const contentStyle = [styles.content, { paddingBottom: insets.bottom + 32 }];
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={contentStyle} showsVerticalScrollIndicator={false}>
        <Pressable
          accessibilityRole="button"
          onPress={onBackToInstructions}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back to Instructions</Text>
        </Pressable>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>LIVE WORKOUT SESSION</Text>
          <Text style={styles.heading}>
            {sessionStatus === 'finished' ? 'Session' : sessionStatus === 'ready' ? 'Ready' : 'Stay'}{'\n'}
            <Text style={styles.headingAccent}>{sessionStatus === 'finished' ? 'complete.' : sessionStatus === 'ready' ? 'to begin.' : 'in frame.'}</Text>
          </Text>
          <Text style={styles.description}>{workout.name} · Target: {repTarget} reps · Rest: {restSeconds}s</Text>
        </View>

        <View style={styles.cameraFrame}>
          {cameraError ? (
            <View style={styles.cameraMessage}>
              <Text style={styles.cameraMessageTitle}>Camera unavailable</Text>
              <Text style={styles.cameraMessageText}>{cameraError}</Text>
              <Pressable accessibilityRole="button" onPress={onRetryCamera} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Try camera again</Text>
              </Pressable>
            </View>
          ) : sessionStatus === 'finished' ? (
            <View style={styles.cameraMessage}>
              <Text style={styles.cameraMessageTitle}>Workout finished</Text>
              <Text style={styles.cameraMessageText}>No repetitions were counted or saved in this preview session.</Text>
            </View>
          ) : (
            <CameraView
              style={styles.cameraPreview}
              facing="front"
              active={sessionStatus === 'ready' || sessionStatus === 'active'}
              onCameraReady={onCameraReady}
              onMountError={(event) => onCameraError(event.message || 'The camera could not start.')}
            />
          )}
        </View>

        <View style={styles.sessionSummary}>
          <Text style={styles.setupLabel}>SESSION STATUS</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Status</Text>
            <Text style={styles.summaryValue}>{sessionStatus === 'ready' ? 'Ready to start' : sessionStatus === 'active' ? 'Workout in progress' : sessionStatus === 'paused' ? 'Workout paused' : 'Workout finished'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Repetitions</Text>
            <Text style={styles.summaryValue}>Not tracked</Text>
          </View>
          <Text style={styles.helperText}>Camera preview only. Pose detection, rep counting, and video recording are not active.</Text>
        </View>

        <View style={styles.sessionControls}>
          {sessionStatus !== 'finished' && (
            <Pressable accessibilityRole="button" onPress={onToggleSession} style={[styles.controlButton, styles.startControl]}>
              <Text style={styles.startButtonText}>{sessionStatus === 'ready' ? 'Start' : sessionStatus === 'active' ? 'Pause' : 'Resume'}</Text>
            </Pressable>
          )}
          {sessionStatus !== 'finished' ? (
            <Pressable accessibilityRole="button" onPress={onFinishSession} style={[styles.controlButton, styles.finishControl]}>
              <Text style={styles.finishButtonText}>Finish</Text>
            </Pressable>
          ) : (
            <Pressable accessibilityRole="button" onPress={onBackToInstructions} style={styles.startButton}>
              <Text style={styles.startButtonText}>Back to Instructions</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
