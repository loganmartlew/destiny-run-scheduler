import User from '@/types/User';

export interface RunRange {
  ref: any;
  ts: any;
  user: User;
  start: number;
  end: number;
}

export interface Day {
  ref: any;
  ts: any;
  date: string;
  ranges: [RunRange];
}

export interface Schedule {
  ref: any;
  ts: any;
  name: string;
  users: [User];
  days: [Day];
}

export interface DashboardProps {
  schedules: Schedule[];
}
