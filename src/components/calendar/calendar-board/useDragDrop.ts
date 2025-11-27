import type { Active, Over } from "@dnd-kit/core";
import type { Day } from "../../../types/calendar";
import {
  SortableKind,
  type SortableData,
} from "../../../types/calendar-sortable";
import { arrayMove } from "@dnd-kit/sortable";

const isMovingBelowOverItem = (active: Active, over: Over) =>
  Boolean(
    active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height,
  );

// - Active must be Workout, Over must be
//    + Over is day -> push to end of over workouts
//    + Active and Over difference day -> insert to over workouts
export function moveWorkoutThroughColumn(
  days: Day[],
  active: Active,
  over: Over,
): Day[] | null {
  const activeData = active.data.current as SortableData<SortableKind.Workout>;
  const overData = over.data.current as SortableData<
    SortableKind.Workout | SortableKind.Day
  >;

  if (
    activeData.kind !== SortableKind.Workout ||
    !(overData.kind & (SortableKind.Day | SortableKind.Workout))
  )
    return null;

  const isDifferentDay = overData.dayIndex !== activeData.dayIndex;
  if (!isDifferentDay) return null;

  const activeWorkouts = [...days[activeData.dayIndex].workouts];
  const overWorkouts = [...days[overData.dayIndex].workouts];

  const [moved] = activeWorkouts.splice(activeData.sortable.index, 1);

  let newIndex: number = overWorkouts.length; // SortableKind.Day
  if (overData.kind === SortableKind.Workout) {
    newIndex =
      overData.sortable.index + (isMovingBelowOverItem(active, over) ? 1 : 0);
  }

  overWorkouts.splice(newIndex, 0, {
    ...moved,
    date: days[overData.dayIndex].date.toISOString(),
  });

  return days.map((day, index) => {
    if (index === activeData.dayIndex)
      return { ...day, workouts: activeWorkouts };
    if (index === overData.dayIndex) return { ...day, workouts: overWorkouts };
    return day;
  });
}

export function sortWorkoutInsideColumns(
  days: Day[],
  active: Active,
  over: Over,
): Day[] | null {
  const activeData = active.data.current as SortableData<SortableKind.Workout>;
  const overData = over.data.current as SortableData<SortableKind.Workout>;
  const isSameDayWorkout =
    overData.dayIndex === activeData.dayIndex &&
    overData.kind === SortableKind.Workout;
  if (isSameDayWorkout) {
    const activeIndex = activeData.sortable.index;
    const overIndex = overData.sortable.index;
    if (activeIndex !== overIndex) {
      return days.map((day, i) =>
        i === overData.dayIndex
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

// Overdata is kind = exercise for sortable difference workout
// Overdata is kind = workout for adding to empty workout
export function moveExerciseThroughWorkoutCard(
  days: Day[],
  active: Active,
  over: Over,
): Day[] | null {
  const activeData = active.data.current as SortableData<SortableKind.Exercise>;
  const overData = over.data.current as SortableData<
    SortableKind.Exercise | SortableKind.Workout
  >;

  if (
    activeData.kind !== SortableKind.Exercise ||
    !(overData.kind & (SortableKind.Exercise | SortableKind.Workout))
  )
    return null;

  const overWorkout = days[overData.dayIndex].workouts[overData.workoutIndex];
  const isDiffWorkout = activeData.exercise.workoutId !== overWorkout.id;

  if (!isDiffWorkout) return null;

  const activeExercises = [
    ...days[activeData.dayIndex].workouts[activeData.workoutIndex].exercises,
  ];
  const [moved] = activeExercises.splice(activeData.sortable.index, 1);

  const overExercises = [...overWorkout.exercises];

  let newIndex = overExercises.length;
  if (overData.kind !== SortableKind.Exercise) {
    newIndex =
      overData.sortable.index + (isMovingBelowOverItem(active, over) ? 1 : 0);
  }

  overExercises.splice(newIndex, 0, {
    ...moved,
    workoutId: overWorkout.id,
  });

  return days.map((day, dayIndex) => {
    const isActiveDay = dayIndex === activeData.dayIndex;
    const isOverDay = dayIndex === overData.dayIndex;
    if (!isActiveDay && !isOverDay) return day;

    return {
      ...day,
      workouts: day.workouts.map((workout, index) => {
        if (isActiveDay && index === activeData.workoutIndex) {
          return { ...workout, exercises: activeExercises };
        }
        if (isOverDay && index === overData.workoutIndex) {
          return { ...workout, exercises: overExercises };
        }
        return workout;
      }),
    };
  });
}

export function sortExerciseInsideWorkout(
  days: Day[],
  active: Active,
  over: Over,
): Day[] | null {
  const activeData = active.data.current as SortableData<SortableKind.Exercise>;
  const overData = over.data.current as SortableData<SortableKind.Exercise>;
  if (
    overData.workoutIndex === activeData.workoutIndex &&
    activeData.kind & overData.kind & SortableKind.Exercise
  ) {
    const activeIndex = activeData.sortable.index;
    const overIndex = overData.sortable.index;
    if (activeIndex !== overIndex) {
      return days.map((day, dayIndex) =>
        dayIndex === overData.dayIndex
          ? {
              ...day,
              workouts: day.workouts.map((workout, workoutIndex) =>
                workoutIndex !== activeData.workoutIndex
                  ? workout
                  : {
                      ...workout,
                      exercises: arrayMove(
                        workout.exercises,
                        activeIndex,
                        overIndex,
                      ),
                    },
              ),
            }
          : day,
      );
    }
  }
  return null;
}
