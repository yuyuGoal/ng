export type Schedule = {
  Id: number;
  Subject: string;
  StartTime: string;
  EndTime: string;
  IsAllDay: boolean;
  IsBlock: boolean;
  IsReadonly: boolean;
  RoomId: number;
  ResourceId: number;
};
