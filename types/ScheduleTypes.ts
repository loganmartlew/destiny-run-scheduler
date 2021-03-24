import User from '@/types/User';

export interface RunRange {
  id: number;
  user: User;
  start: number;
  end: number;
}

export interface Day {
  id: number;
  date: string;
  ranges: RunRange[];
}

export interface SchedulePreview {
  id: number;
  name: string;
  users: User[];
}

export interface Schedule extends SchedulePreview {
  days: Day[];
}
