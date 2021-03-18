import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, AuthContext } from '@/contexts/AuthContext';
import { GetServerSideProps } from 'next';
import User from '@/types/User';
import { Schedule, Day, RunRange } from '@/types/ScheduleTypes';

interface ScheduleProps {
  schedule: Schedule;
}

const AuthorizedSchedule: React.FC<ScheduleProps> = ({ schedule }) => {
  console.log(schedule);
  return <>{JSON.stringify(schedule)}</>;
};

const UnauthSchedule: React.FC = () => {
  return (
    <>
      <p>You are not authorized to view this schedule.</p>
      <div>
        <Link href='/dashboard'>
          <a href='/dashboard'>Dashboard</a>
        </Link>
      </div>
    </>
  );
};

const DefaultSchedule: React.FC = () => {
  return (
    <>
      <p>You are not signed in</p>
      <div>
        <Link href='/login'>
          <a href='/login'>Sign In</a>
        </Link>
      </div>
    </>
  );
};

const ScheduleHOC: React.FC<ScheduleProps> = ({ schedule }) => {
  const { authUser, dbUser, login }: AuthContext = useAuth() as AuthContext;

  let [loggedIn, setLoggedIn] = useState<boolean>(false);
  let [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (authUser && dbUser) setLoggedIn(true);

    if (authUser) {
      login(authUser.email!, '');
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    schedule.users.forEach(user => {
      if (user.ref === dbUser?.ref) {
        setAuthorized(true);
      }
    });
  }, [dbUser]);

  if (loggedIn) {
    if (authorized) {
      return <AuthorizedSchedule schedule={schedule} />;
    } else {
      return <UnauthSchedule />;
    }
  } else {
    return <DefaultSchedule />;
  }

  return loggedIn ? (
    <AuthorizedSchedule schedule={schedule} />
  ) : (
    <DefaultSchedule />
  );
};

export default ScheduleHOC;

export const getServerSideProps: GetServerSideProps<ScheduleProps> = async ctx => {
  const { ref } = ctx.params!;

  const res = await fetch(`http://localhost:3000/api/schedules/${ref}`);
  const schedule = await res.json();

  return {
    props: {
      schedule,
    },
  };
};
