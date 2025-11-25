import { workouts } from "../mocks/db/calendar";
import type { Workout } from "../types/calendar";

export async function fetchWeekWorkouts(
  _year: number,
  _week: number,
): Promise<Workout[]> {
  // const res = await fetch(`/api/workouts?year=${year}&week=${week}`);
  //
  // if (!res.ok) throw new Error("Failed to fetch weekly workouts");

  return workouts;
}
