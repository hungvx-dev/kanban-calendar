import "../../../styles/exercise-item.css";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Workout } from "../../../types/calendar";
import ExerciseItem from "./ExerciseItem";

type Props = {
  workout: Workout;
  dayIndex: number;
  workoutIndex: number;
};

function ExerciseSortable({ workout, dayIndex, workoutIndex }: Props) {
  return (
    <SortableContext
      items={workout.exercises.map((ex) => ex.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="workout-card__exercises">
        {workout.exercises.length === 0 ? (
          <div className="empty-text">Drop exercise here</div>
        ) : (
          workout.exercises.map((ex) => (
            <ExerciseItem
              key={ex.id}
              exercise={ex}
              dayIndex={dayIndex}
              workoutIndex={workoutIndex}
            />
          ))
        )}
      </div>
    </SortableContext>
  );
}

export default ExerciseSortable;
