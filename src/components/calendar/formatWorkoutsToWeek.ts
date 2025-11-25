import type { Day, Workout } from "../../types/calendar";
import { formatDateYMD } from "../../utils/date";

export function getDatesOfISOWeek(year: number, week: number): Day[] {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dow = simple.getUTCDay();
  const ISOweekStart = simple;

  if (dow <= 4) {
    ISOweekStart.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
  } else {
    ISOweekStart.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
  }

  const days: Day[] = [];
  let isTodayIndex = -1;

  for (let i = 0; i < 7; i++) {
    const d = new Date(ISOweekStart);
    d.setUTCDate(ISOweekStart.getUTCDate() + i);
    if (isTodayIndex < 0) {
      isTodayIndex = formatDateYMD(d) === formatDateYMD(new Date()) ? i : isTodayIndex;
    }

    days.push({
      id: formatDateYMD(d),
      date: d,
      index: i,
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      isToday: isTodayIndex === i,
      workouts: [],
    });
  }

  return days;
}

export function formatWorkoutsToWeek(days: Day[], workouts: Workout[]) {
  const map = new Map<string, Workout[]>();

  for (const w of workouts) {
    const dayId = formatDateYMD(new Date(w.date));
    if (!map.has(dayId)) {
      map.set(dayId, []);
    }
    map.get(dayId)!.push(w);
  }

  return days.map((day) => ({
    ...day,
    workouts: map.get(day.id) ?? [],
  }));
}
