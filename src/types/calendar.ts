export interface Calendar {
  days: Day[];
}

export type Day = {
  id: string; // For FE, not DB primary key
  date: Date;
  index: number;
  weekday: string;
  isToday: boolean;
  workouts: Workout[];
};

export type Workout = {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
};

export type Exercise = {
  id: string;
  workoutId: string; // relation 1-N
  name: string;
  count: number;
  sets: ExerciseSet[];
};

export type ExerciseSet = {
  id: string;
  exerciseId: string; // relation 1-N
  weight: number;
  reps: number;
};

// Model
// type ModelWorkout = Exclude<Workout, "exercises">;
// type ModelExercise = Exclude<Exercise, "sets">;
