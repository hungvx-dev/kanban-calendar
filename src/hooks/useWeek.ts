import { useState } from "react";
import { getISOWeekNumber } from "../utils/date";

export function useWeek() {
  const today = new Date();
  const start = getISOWeekNumber(today);

  const [year, setYear] = useState(start.year);
  const [week, setWeek] = useState(start.week);

  const next = () => {
    let newWeek = week + 1;
    let newYear = year;

    if (newWeek > 53) {
      newWeek = 1;
      newYear++;
    }

    setYear(newYear);
    setWeek(newWeek);
  };

  const prev = () => {
    let newWeek = week - 1;
    let newYear = year;

    if (newWeek < 1) {
      newYear--;
      newWeek = 53;
    }

    setYear(newYear);
    setWeek(newWeek);
  };

  const resetToday = () => {
    const cur = getISOWeekNumber(new Date());
    setYear(cur.year);
    setWeek(cur.week);
  };

  return { year, week, next, prev, resetToday };
}
