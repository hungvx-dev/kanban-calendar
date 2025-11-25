import type { Workout } from "../../types/calendar";

export const workouts: Workout[] = [
  {
    id: "w1",
    name: "Chest Day",
    date: new Date("2025-11-24").toISOString(),
    exercises: [
      {
        id: "e1",
        name: "Bench Press (Medium Grip t t)",
        workoutId: "w1",
        count: 3,
        sets: [
          { id: "s1", exerciseId: "e1", weight: 50, reps: 5 },
          { id: "s2", exerciseId: "e1", weight: 60, reps: 5 },
          { id: "s3", exerciseId: "e1", weight: 70, reps: 5 },
        ],
      },
      {
        id: "e2",
        name: "Incline Dumbbell Press",
        count: 3,
        workoutId: "w1",
        sets: [
          { id: "s4", exerciseId: "e2", weight: 40, reps: 8 },
          { id: "s5", exerciseId: "e2", weight: 40, reps: 8 },
          { id: "s6", exerciseId: "e2", weight: 40, reps: 8 },
        ],
      },
    ],
  },
  {
    id: "w10",
    name: "Chest Day",
    date: new Date("2025-11-24").toISOString(),
    exercises: [
      {
        id: "e30",
        name: "Bench Press (Medium Grip t t)",
        workoutId: "w10",
        count: 3,
        sets: [
          { id: "s30", exerciseId: "e30", weight: 50, reps: 5 },
          { id: "s31", exerciseId: "e30", weight: 60, reps: 5 },
          { id: "s32", exerciseId: "e30", weight: 70, reps: 5 },
        ],
      },
      {
        id: "e32",
        name: "Incline Dumbbell Press",
        count: 3,
        workoutId: "w10",
        sets: [
          { id: "s4", exerciseId: "e2", weight: 40, reps: 8 },
          { id: "s5", exerciseId: "e2", weight: 40, reps: 8 },
          { id: "s6", exerciseId: "e2", weight: 40, reps: 8 },
        ],
      },
    ],
  },
  {
    id: "w2",
    name: "Back Day",
    date: new Date("2025-11-25").toISOString(),
    exercises: [
      {
        id: "e3",
        name: "Lat Pulldown",
        workoutId: "w2",
        count: 1,
        sets: [
          { id: "s7", exerciseId: "e3", weight: 70, reps: 10 },
          { id: "s8", exerciseId: "e3", weight: 70, reps: 10 },
          { id: "s9", exerciseId: "e3", weight: 70, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "w3",
    name: "Back Day",
    date: new Date("2025-11-25").toISOString(),
    exercises: [
      {
        id: "e4",
        name: "Lat Pulldown 2",
        workoutId: "w3",
        count: 5,
        sets: [
          { id: "s10", exerciseId: "e4", weight: 70, reps: 10 },
          { id: "s11", exerciseId: "e4", weight: 70, reps: 10 },
        ],
      },
      {
        id: "e9",
        name: "Lat Pulldown 3",
        workoutId: "w3",
        count: 5,
        sets: [
          { id: "s16", exerciseId: "e4", weight: 70, reps: 10 },
          { id: "s17", exerciseId: "e4", weight: 70, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "w7",
    name: "Back Day",
    date: new Date("2025-11-25").toISOString(),
    exercises: [
      {
        id: "e20",
        name: "Lat Pulldown 33",
        workoutId: "w7",
        count: 5,
        sets: [
          { id: "s20", exerciseId: "e4", weight: 70, reps: 10 },
          { id: "s21", exerciseId: "e4", weight: 70, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "w4",
    name: "Back Day",
    date: new Date("2025-11-23").toISOString(),
    exercises: [
      {
        id: "e5",
        name: "Lat Pulldown 2",
        workoutId: "w4",
        count: 5,
        sets: [
          { id: "s12", exerciseId: "e4", weight: 70, reps: 10 },
          { id: "s13", exerciseId: "e4", weight: 70, reps: 10 },
          { id: "s14", exerciseId: "e4", weight: 70, reps: 10 },
        ],
      },
      {
        id: "e6",
        name: "Lat Pulldown 3",
        workoutId: "w4",
        count: 5,
        sets: [
          { id: "s15", exerciseId: "e4", weight: 70, reps: 10 },
          { id: "s16", exerciseId: "e4", weight: 70, reps: 10 },
          { id: "s17", exerciseId: "e4", weight: 70, reps: 10 },
        ],
      },
    ],
  },
];
