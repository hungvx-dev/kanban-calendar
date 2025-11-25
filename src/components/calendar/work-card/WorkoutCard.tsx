import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Workout } from "../../../types/calendar";
import { SortableKind } from "../../../types/calendar-sortable";
import ExerciseSortable from "../exercise/ExerciseSortable";

type Props = {
  workout: Workout;
  dayIndex: number;
  workoutIndex: number;
};

export default function WorkoutCard({
  workout,
  dayIndex,
  workoutIndex,
}: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: workout.id,
    data: {
      kind: SortableKind.Workout,
      workout,
      dayIndex,
      workoutIndex,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="workout-card"
    >
      <div className="workout-card__title">{workout.name}</div>
      <ExerciseSortable
        workout={workout}
        dayIndex={dayIndex}
        workoutIndex={workoutIndex}
      />
    </div>
  );
}
