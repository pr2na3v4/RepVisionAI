import { useState } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { Platform } from 'react-native';
import CameraInstructionsScreen from '../features/workout/screens/CameraInstructionsScreen';
import WorkoutHomeScreen from '../features/workout/screens/WorkoutHomeScreen';
import WorkoutSessionScreen from '../features/workout/screens/WorkoutSessionScreen';
import WorkoutSetupScreen from '../features/workout/screens/WorkoutSetupScreen';
import {
  WORKOUTS,
  type SessionStatus,
  type WorkoutId,
} from '../features/workout/workout.constants';

type Screen = 'home' | 'setup' | 'instructions' | 'session';

export default function HomeScreen() {
  const [, requestCameraPermission] = useCameraPermissions();
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutId>('push-ups');
  const [repTarget, setRepTarget] = useState(10);
  const [restSeconds, setRestSeconds] = useState(30);
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>('ready');
  const [cameraError, setCameraError] = useState<string | null>(null);

  const workout = WORKOUTS.find((item) => item.id === selectedWorkout)!;

  const continueToWorkout = async () => {
    if (
      Platform.OS === 'web' &&
      typeof window !== 'undefined' &&
      !window.isSecureContext
    ) {
      setCameraError(
        'Camera access in your browser requires a secure connection (HTTPS or localhost).',
      );
      return;
    }

    setCameraError(null);

    try {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        setCameraError(
          'Camera permission is needed to start a session. Enable camera access in your device or browser settings, then try again.',
        );
        return;
      }

      setSessionStatus('ready');
      setScreen('session');
    } catch {
      setCameraError(
        'Camera access could not be started. Check your device or browser settings and try again.',
      );
    }
  };

  if (screen === 'session') {
    return (
      <WorkoutSessionScreen
        workout={workout}
        repTarget={repTarget}
        restSeconds={restSeconds}
        status={sessionStatus}
        cameraError={cameraError}
        onBackToInstructions={() => {
          if (sessionStatus !== 'finished') {
            setSessionStatus('paused');
          }
          setScreen('instructions');
        }}
        onRetryCamera={() => setCameraError(null)}
        onCameraReady={() => setCameraError(null)}
        onCameraError={setCameraError}
        onToggleSession={() =>
          setSessionStatus(
            sessionStatus === 'ready' || sessionStatus === 'paused'
              ? 'active'
              : 'paused',
          )
        }
        onFinishSession={() => setSessionStatus('finished')}
      />
    );
  }

  if (screen === 'instructions') {
    return (
      <CameraInstructionsScreen
        workout={workout}
        selectedWorkout={selectedWorkout}
        repTarget={repTarget}
        restSeconds={restSeconds}
        cameraError={cameraError}
        onBackToSetup={() => setScreen('setup')}
        onContinue={continueToWorkout}
      />
    );
  }

  if (screen === 'setup') {
    return (
      <WorkoutSetupScreen
        workout={workout}
        repTarget={repTarget}
        setRepTarget={setRepTarget}
        restSeconds={restSeconds}
        setRestSeconds={setRestSeconds}
        onBackToHome={() => setScreen('home')}
        onConfirm={() => setScreen('instructions')}
      />
    );
  }

  return (
    <WorkoutHomeScreen
      selectedWorkout={selectedWorkout}
      onSelectWorkout={setSelectedWorkout}
      onStartWorkout={() => setScreen('setup')}
    />
  );
}
