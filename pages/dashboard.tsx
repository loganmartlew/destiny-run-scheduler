import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth, AuthContext } from '@/contexts/AuthContext';
import { GetServerSideProps } from 'next';
import { Schedule, DashboardProps } from '@/types/DashboardTypes';

const LoggedinDashboard: React.FC<DashboardProps> = ({ schedules }) => {
  const [error, setError] = useState<string>('');

  const router = useRouter();
  const { logout, dbUser } = useAuth() as AuthContext;

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    try {
      await logout();
      router.push('/');
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <>
      <h1>Welcome, {dbUser?.name}!</h1>
      <h2>Schedules</h2>
      <div>
        {schedules.map(schedule => (
          <p key={schedule.ref}>{schedule.name}</p>
        ))}
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
        <Link href='/login'>
          <a href='/login'>Sign In</a>
        </Link>
      </div>
    </>
  );
};

const DashboardHOC: React.FC<DashboardProps> = ({ schedules }) => {
  const { authUser, dbUser, login }: AuthContext = useAuth() as AuthContext;

  let [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (authUser && dbUser) setLoggedIn(true);

    if (authUser) {
      login(authUser.email!, '');
      setLoggedIn(true);
    }
  }, []);

  return loggedIn ? (
    <LoggedinDashboard schedules={schedules} />
  ) : (
    <DefaultDashboard />
  );
};

export default DashboardHOC;

export const getServerSideProps: GetServerSideProps<DashboardProps> = async () => {
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
      },
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
          },
        ],
      },
    ],
  };

  const schedule2: Schedule = {
    ref: 2,
    ts: 1,
    name: 'Other Runs',
    users: [
      {
        ref: 1,
        ts: 1,
        name: 'Jag',
        email: 'logan.martlew@gmail.com',
      },
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
          },
        ],
      },
    ],
  };

  const schedules: Schedule[] = [schedule1, schedule2];

  return {
    props: {
      schedules,
    },
  };
};
