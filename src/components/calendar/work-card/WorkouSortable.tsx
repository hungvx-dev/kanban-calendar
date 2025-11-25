import "../../../styles/workout-card.css";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { Day } from "../../../types/calendar";
import WorkoutCard from "./WorkoutCard";

type Props = {
  day: Day;
};

function WorkouSortable({ day }: Props) {
  return (
    <SortableContext
      items={day.workouts.map((w) => w.id)}
      strategy={verticalListSortingStrategy}
    >
      {day.workouts.map((w, i) => (
        <WorkoutCard
          key={w.id}
          workout={w}
          dayIndex={day.index}
          workoutIndex={i}
        />
      ))}
    </SortableContext>
  );
}

export default WorkouSortable;
