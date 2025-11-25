import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Exercise } from "../../../types/calendar";
import { SortableKind } from "../../../types/calendar-sortable";

type Props = {
  exercise: Exercise;
  dayIndex: number;
  workoutIndex: number;
};

export default function ExerciseItem({
  exercise,
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
    id: exercise.id,
    data: {
      kind: SortableKind.Exercise,
      exercise,
      dayIndex,
      workoutIndex,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    transition,
  };

  const sets = useMemo<string>(
    () => exercise.sets.map((s) => `${s.weight} lb x ${s.reps}`).join(", "),
    [exercise.sets],
  );

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="exercise-item"
    >
      <div className="exercise-item__name">{exercise.name}</div>
      <div className="exercise-item__info">
        <div className="exercise-item__count">{exercise.count}x</div>
        <div className="exercise-item__sets">{sets}</div>
      </div>
    </div>
  );
}
