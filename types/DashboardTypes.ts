import User from '../types/User';

export interface RunRange {
  ref;
  ts;
  user: User;
  start: number;
  end: number;
}

export interface Day {
  ref;
  ts;
  date: string;
  ranges: [RunRange];
}

export interface Schedule {
  ref;
  ts;
  name: string;
  users: [User];
  days: [Day];
}
export interface Schedules {
  [schedules: number]: Schedule;
}
