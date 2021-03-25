import { useState, useEffect, useContext } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { HorizontalBar, defaults } from 'react-chartjs-2';
import { ThemeContext } from 'styled-components';
import { ChartData, ChartOptions } from 'chart.js';
import { Schedule } from '@/types/ScheduleTypes';
import {
  ScheduleContainer,
  ScheduleTitle,
  Users,
  UserBadge,
  NextRuns,
  WeekContainer,
  WeekLabel,
  WeekDay,
  WeekdayRuns,
} from '@/components/PageStyles/ScheduleStyles';

const options: ChartOptions = {
  // maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          // min: 4,
          // max: 16,
        },
      },
    ],
  },
};

defaults.global.defaultFontFamily = 'Rubik';
defaults.global.defaultFontColor = 'white';
defaults.global.defaultFontSize = 15;

interface ScheduleProps {
  schedule: Schedule;
}

const SchedulePage: React.FC<ScheduleProps> = ({ schedule }) => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  const theme = useContext(ThemeContext);

  const { user } = useUser();

  useEffect(() => {
    schedule.users = [
      ...schedule.users,
      {
        id: 'testid',
        name: 'Coco',
        email: 'test@test.com',
      },
      {
        id: 'testid',
        name: 'Gunnar',
        email: 'test@test.com',
      },
      {
        id: 'testid',
        name: 'Rhyoa',
        email: 'test@test.com',
      },
      {
        id: 'testid',
        name: 'Theo',
        email: 'test@test.com',
      },
      {
        id: 'testid',
        name: 'Crimson',
        email: 'test@test.com',
      },
    ];
  }, []);

  useEffect(() => {
    setAuthorized(false);

    schedule.users.forEach(scheduleUser => {
      if (scheduleUser.id === user?.sub) {
        setAuthorized(true);
      }
    });
  }, [user]);

  const data: ChartData = {
    labels: ['Jag', 'Coco', 'Gunnar', 'Rhyoa', 'Theo', 'Crimson'],
    datasets: [
      {
        label: 'Range',
        data: [
          [6, 10.5], // Jag
          [7.5, 11], // Coco
          [5, 12], // Gunnar
          [4, 11], // Rhyoa
          [5, 12], // Theo
          [6.5, 11], // Crimson
        ],
        backgroundColor: theme.colors.primary,
        barThickness: 40,
      },
    ],
  };

  return (
    <ScheduleContainer>
      <ScheduleTitle>{schedule.name}</ScheduleTitle>
      <Users>
        {schedule.users.map(user => (
          <UserBadge>{user.name}</UserBadge>
        ))}
      </Users>
      <NextRuns>Next Runs: +6, 20/07</NextRuns>
      <WeekContainer>
        <WeekLabel>Week Starting 22/03:</WeekLabel>
        <WeekDay>M</WeekDay>
        <WeekDay>T</WeekDay>
        <WeekDay>W</WeekDay>
        <WeekDay>T</WeekDay>
        <WeekDay>F</WeekDay>
        <WeekDay>S</WeekDay>
        <WeekDay>S</WeekDay>
      </WeekContainer>
      <WeekdayRuns>Mondays Runs: +7:30 - +10:30</WeekdayRuns>
      <HorizontalBar data={data} options={options} />
    </ScheduleContainer>
  );
};

export const getServerSideProps: GetServerSideProps<ScheduleProps> = async ctx => {
  const { id } = ctx.params!;

  const res = await fetch(`http://localhost:3000/api/schedules/${id}`);
  const schedule = await res.json();

  return {
    props: {
      schedule,
    },
  };
};

export default withPageAuthRequired(SchedulePage);
