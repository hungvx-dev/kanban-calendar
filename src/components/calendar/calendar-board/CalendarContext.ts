import { createContext, useContext } from "react";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import type { Day } from "../../../types/calendar";

export interface CalendarContextValue {
  days: Day[];
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragOver: (event: DragOverEvent) => void;
}

const CalendarContext = createContext<CalendarContextValue | null>(null);

export const useCalendarContext = () => {
  const ctx = useContext(CalendarContext);
  if (!ctx) {
    throw new Error(
      "useCalendarContext must be used inside <CalendarProvider>",
    );
  }
  return ctx;
};

export const CalendarProvider = CalendarContext.Provider;
