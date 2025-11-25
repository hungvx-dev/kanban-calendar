import type { Exercise, Workout } from "./calendar";

export const enum SortableKind {
  Day = 1, // 001
  Workout = 2, // 010
  Exercise = 4, // 100
}

type _SortaleData =
  | { kind: SortableKind.Day; dayIndex: number }
  | {
      kind: SortableKind.Workout;
      dayIndex: number;
      workout: Workout;
      workoutIndex: number;
      sortable: { index: number };
    }
  | {
      kind: SortableKind.Exercise;
      dayIndex: number;
      exercise: Exercise;
      workoutIndex: number;
      sortable: { index: number };
    };

export type SortaleData<K extends SortableKind> = Extract<
  _SortaleData,
  { kind: K }
>;
