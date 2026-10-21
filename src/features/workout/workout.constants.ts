export const COLORS = {
  background: '#0B1220',
  surface: '#172235',
  surfaceSelected: '#26364C',
  primary: '#34D399',
  text: '#F8FAFC',
  secondary: '#94A3B8',
  border: '#334155',
  tipBackground: '#122B2B',
  tipBorder: '#205047',
};

export const WORKOUTS = [
  {
    id: 'push-ups',
    name: 'Push-ups',
    description: 'Upper body strength',
    icon: '💪',
    muscles: 'Chest · Arms · Core',
  },
  {
    id: 'squats',
    name: 'Squats',
    description: 'Lower body strength',
    icon: '🏋️',
    muscles: 'Legs · Glutes · Core',
  },
] as const;

export type WorkoutId = (typeof WORKOUTS)[number]['id'];

export const REST_OPTIONS = [15, 30, 60] as const;

export type Workout = (typeof WORKOUTS)[number];
export type SessionStatus = 'ready' | 'active' | 'paused' | 'finished';
