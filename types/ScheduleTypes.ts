import User from '@/types/User';

export interface RunRange {
  ref: string;
  ts: number;
  user: User;
  start: number;
  end: number;
}

export interface Day {
  ref: string;
  ts: number;
  date: string;
  ranges: RunRange[];
}

export interface Schedule {
  ref: string;
  ts: number;
  name: string;
  users: User[];
  days: Day[];
}
