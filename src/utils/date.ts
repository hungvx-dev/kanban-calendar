export function formatDateYMD(d: Date): string {
  return d.toISOString().split("T")[0];
}

export function getWeekRange(baseDate = new Date()) {
  // Default is current day
  const date = new Date(baseDate);
  const currentDay = date.getDay();

  const diff = date.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  const monday = new Date(date);
  monday.setDate(diff);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    from: formatDateYMD(monday),
    to: formatDateYMD(sunday),
    monday,
    sunday,
  };
}

export function getISOWeekNumber(date: Date) {
  const tmp = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  tmp.setUTCDate(tmp.getUTCDate() + 4 - (tmp.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(
    ((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return {
    year: tmp.getUTCFullYear(),
    week: weekNumber,
  };
}
