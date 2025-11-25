import "../../../styles/calendar.css";
import { useEffect, useState } from "react";
import { type DragEndEvent, type DragOverEvent } from "@dnd-kit/core";
import { CalendarProvider } from "./CalendarContext";
import { useWeek } from "../../../hooks/useWeek";
import type { Calendar } from "../../../types/calendar";
import {
  formatWorkoutsToWeek,
  getDatesOfISOWeek,
} from "../formatWorkoutsToWeek";
import { fetchWeekWorkouts } from "../../../apis/calendar";
import {
  moveExerciseThroughWorkoutCard,
  moveWorkoutThroughColumn,
  sortExerciseInsideWorkout,
  sortWorkoutInsideColumns,
} from "./useDragDrop";
import DayColumnDnd from "../day-column/DayColumnDnd";
import { useThrottledCallback } from "use-debounce";

export function CalendarBoard() {
  const { year, week, next, prev, resetToday } = useWeek();
  const [days, setDays] = useState<Calendar["days"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const workouts = await fetchWeekWorkouts(year, week);
        const weekDays = getDatesOfISOWeek(year, week);
        const merged = formatWorkoutsToWeek(weekDays, workouts);

        setDays(merged);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [year, week]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    const newDays =
      sortWorkoutInsideColumns(days, active, over) ||
      sortExerciseInsideWorkout(days, active, over);
    if (newDays) {
      setDays(newDays);
    }
  };

  const handleDragOver = useThrottledCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    const newDays =
      moveWorkoutThroughColumn(days, active, over) ||
      moveExerciseThroughWorkoutCard(days, active, over);
    if (newDays) {
      setDays(newDays);
    }
  }, 100);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="calendar-wrapper">
      {/* For future */}
      <div className="calendar-header">
        <button className="calendar-btn" onClick={prev}>
          Prev
        </button>
        <button className="calendar-btn" onClick={resetToday}>
          Today
        </button>
        <button className="calendar-btn" onClick={next}>
          Next
        </button>

        <span className="calendar-title">
          Week {week}, {year}
        </span>
      </div>
      <CalendarProvider
        value={{
          days,
          handleDragEnd,
          handleDragOver,
        }}
      >
        <DayColumnDnd />
      </CalendarProvider>
    </div>
  );
}
