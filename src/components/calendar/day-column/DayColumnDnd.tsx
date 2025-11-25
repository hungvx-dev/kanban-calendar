import "../../../styles/day-column.css";
import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

import { useCalendarContext } from "../calendar-board/CalendarContext";
import DayColumnDroppable from "./DayColumnDroppable";
import WorkoutCard from "../work-card/WorkoutCard";
import {
  SortableKind,
  type SortaleData,
} from "../../../types/calendar-sortable";
import ExerciseItem from "../exercise/ExerciseItem";

function DayColumnDnd() {
  const {
    days,
    handleDragEnd: handleWorkoutDragEnd,
    handleDragOver: handleWorkoutDragOverOtherColumn,
  } = useCalendarContext();
  const [activeData, setActiveData] =
    useState<SortaleData<SortableKind> | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    const data = active.data.current as SortaleData<SortableKind>;
    setActiveData(data);
  };

  const handleDragOver = (event: DragEndEvent) => {
    handleWorkoutDragOverOtherColumn(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    handleWorkoutDragEnd(event);
    setActiveData(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="calendar-grid">
        {days.map((day) => (
          <DayColumnDroppable key={day.id} day={day} />
        ))}
      </div>
      <DragOverlay>
        {(() => {
          switch (activeData?.kind) {
            case SortableKind.Workout:
              return <WorkoutCard {...activeData} />;
            case SortableKind.Exercise:
              return <ExerciseItem {...activeData} />;
            default:
              return null;
          }
        })()}
      </DragOverlay>
    </DndContext>
  );
}

export default DayColumnDnd;
