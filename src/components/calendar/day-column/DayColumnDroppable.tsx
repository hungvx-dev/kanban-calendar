import { useDroppable } from "@dnd-kit/core";
import type { Day } from "../../../types/calendar";
import WorkouSortable from "../work-card/WorkouSortable";
import { SortableKind } from "../../../types/calendar-sortable";

type Props = {
  day: Day;
};

export default function DayColumnDroppable({ day }: Props) {
  const { setNodeRef } = useDroppable({
    id: day.id,
    data: { kind: SortableKind.Day, dayIndex: day.index },
  });

  return (
    <div className="day-column">
      <div className="day-column__header">
        <div className="day-column__weekday">{day.weekday}</div>
        <div
          className={
            "day-column__date" + (day.isToday ? " day-column__date--today" : "")
          }
        >
          {day.date.getDate()}
        </div>
      </div>

      <div ref={setNodeRef} className="day-column__body">
        <WorkouSortable day={day} />
      </div>
    </div>
  );
}
