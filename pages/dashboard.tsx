import { useState } from 'react';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import { useAuth, AuthContext } from '../contexts/AuthContext';
import { GetServerSideProps } from 'next';
import { Schedules, Schedule } from '../types/DashboardTypes';

const LoggedinDashboard = ({ schedules }) => {
  const [error, setError] = useState('');

  const router: NextRouter = useRouter();
  const { logout, dbUser }: AuthContext = useAuth();

  const handleLogout: React.FormEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    try {
      await logout();
      router.push('/');
    } catch {
      setError('Failed to log out');
    };
  };

  return (
    <>
      <h1>Welcome, {dbUser?.name}!</h1>
      <h2>Schedules</h2>
      <div>
        {schedules.map((schedule: Schedule) => <p>{schedule.name}</p>)}
      </div>
      <div>
        <button onClick={handleLogout}>Log out</button>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

const DefaultDashboard = () => {
  return (
    <>
      <p>You are not signed in in</p>
      <div>
        <Link href='/signin'>
          <a href='/signin'>Sign In</a>
        </Link>
      </div>
    </>
  );
};

const DashboardHOC = ({ schedules }) => {
  const { authUser }: AuthContext = useAuth();

  return authUser ? <LoggedinDashboard schedules={schedules} /> : <DefaultDashboard />;
};

export default DashboardHOC;

export const getServerSideProps: GetServerSideProps<Schedules> = async () => {
  const schedule1: Schedule = {
    ref: 1,
    ts: 1,
    name: 'Wish Runs',
    users: [
      {
        ref: 1,
        ts: 1,
        name: 'Jag',
        email: 'logan.martlew@gmail.com',
      }
    ],
    days: [
      {
        ref: 1,
        ts: 1,
        date: '3/7/2021',
        ranges: [
          {
            ref: 1,
            ts: 1,
            user: {
              ref: 1,
              ts: 1,
              name: 'Jag',
              email: 'logan.martlew@gmail.com',
            },
            start: 6,
            end: 10,
          }
        ]
      }
    ]
  }

  const schedule2: Schedule = {
    ref: 1,
    ts: 1,
    name: 'Other Runs',
    users: [
      {
        ref: 1,
        ts: 1,
        name: 'Jag',
        email: 'logan.martlew@gmail.com',
      }
    ],
    days: [
      {
        ref: 1,
        ts: 1,
        date: '3/7/2021',
        ranges: [
          {
            ref: 1,
            ts: 1,
            user: {
              ref: 1,
              ts: 1,
              name: 'Jag',
              email: 'logan.martlew@gmail.com',
            },
            start: 6,
            end: 10,
          }
        ]
      }
    ]
  }

  const schedules: Schedules = [schedule1, schedule2];

  return {
    props: {
      schedules,
    }
  }
}