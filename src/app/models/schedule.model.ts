export type Schedule = {
  // guid: string;
  id: number;
  subject: string;
  startTime: string;
  endTime: string;
  startTimezone: string;
  endTimezone: string;
  isAllDay: boolean;
  isBlock: boolean;
  isReadonly: boolean;
  recurrenceRule: string;
  // roomId: number;
  // resourceId: number;
};
