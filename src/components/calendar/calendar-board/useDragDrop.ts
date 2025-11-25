import type { Active, Over } from "@dnd-kit/core";
import type { Day } from "../../../types/calendar";
import {
  SortableKind,
  type SortaleData,
} from "../../../types/calendar-sortable";
import { arrayMove } from "@dnd-kit/sortable";

export function moveWorkoutThroughColumn(
  days: Day[],
  active: Active,
  over: Over,
): Day[] | null {
  const a = active.data.current as SortaleData<SortableKind.Workout>;
  const o = over.data.current as SortaleData<
    SortableKind.Workout | SortableKind.Day
  >;
  if (a.kind !== SortableKind.Workout) return null;

  const isSameColumnWithKindDay =
    o.dayIndex === a.dayIndex && o.kind === SortableKind.Day;
  const isDiffColumn = o.dayIndex !== a.dayIndex;

  if (isSameColumnWithKindDay || isDiffColumn) {
    const newDays = structuredClone(days);
    const activeWorkouts = newDays[a.dayIndex].workouts;
    const overWorkouts = newDays[o.dayIndex].workouts;
    let newIndex: number = overWorkouts.length + 1; // SortableKind.Day
    if (o.kind === SortableKind.Workout) {
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      newIndex = o.sortable.index + (isBelowOverItem ? 1 : 0);
    }

    const [moved] = activeWorkouts.splice(a.sortable.index, 1);
    moved.date = newDays[o.dayIndex].date.toISOString();
    newDays[o.dayIndex].workouts.splice(newIndex, 0, moved);

    return newDays;
  }
  return null;
}

export function sortWorkoutInsideColumns(
  days: Day[],
  active: Active,
  over: Over,
): Day[] | null {
  const a = active.data.current as SortaleData<SortableKind.Workout>;
  const o = over.data.current as SortaleData<
    SortableKind.Workout | SortableKind.Day
  >;
  if (o.dayIndex === a.dayIndex && o.kind === SortableKind.Workout) {
    const activeIndex = a.sortable.index;
    const overIndex = o.sortable.index;
    if (activeIndex !== overIndex) {
      return days.map((day, i) =>
        i === o.dayIndex
          ? {
              ...day,
              workouts: arrayMove(day.workouts, activeIndex, overIndex),
            }
          : day,
      );
    }
  }
  return null;
}

export function moveExerciseThroughWorkoutCard(
  days: Day[],
  active: Active,
  over: Over,
): Day[] | null {
  const a = active.data.current as SortaleData<SortableKind.Exercise>;
  const o = over.data.current as SortaleData<
    SortableKind.Exercise | SortableKind.Workout
  >;
  if (a.kind !== SortableKind.Exercise || o.kind & SortableKind.Day)
    return null;

  const isDiffWorkout =
    a.exercise.workoutId !== days[o.dayIndex].workouts[o.workoutIndex].id;
  if (isDiffWorkout) {
    const newDays = structuredClone(days);
    const activeExercise =
      newDays[a.dayIndex].workouts[a.workoutIndex].exercises;
    const overWorkout = newDays[o.dayIndex].workouts[o.workoutIndex];
    let newIndex: number = overWorkout.exercises.length + 1; // SortableKind.Workout
    if (o.kind !== SortableKind.Exercise) {
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      newIndex = o.sortable.index + (isBelowOverItem ? 1 : 0);
    }

    const [moved] = activeExercise.splice(a.sortable.index, 1);
    moved.workoutId = overWorkout.id;
    overWorkout.exercises.splice(newIndex, 0, moved);
    return newDays;
  }
  return null;
}

export function sortExerciseInsideWorkout(
  days: Day[],
  active: Active,
  over: Over,
): Day[] | null {
  const a = active.data.current as SortaleData<SortableKind.Exercise>;
  const o = over.data.current as SortaleData<SortableKind.Exercise>;
  if (
    o.workoutIndex === a.workoutIndex &&
    a.kind & o.kind & SortableKind.Exercise
  ) {
    const activeIndex = a.sortable.index;
    const overIndex = o.sortable.index;
    if (activeIndex !== overIndex) {
      return days.map((day, di) =>
        di === o.dayIndex
          ? {
              ...day,
              workouts: day.workouts.map((w, wi) =>
                wi !== a.workoutIndex
                  ? w
                  : {
                      ...w,
                      exercises: arrayMove(w.exercises, activeIndex, overIndex),
                    },
              ),
            }
          : day,
      );
    }
  }
  return null;
}
