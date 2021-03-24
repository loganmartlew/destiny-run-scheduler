import { useState, useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { Schedule } from '@/types/ScheduleTypes';

interface ScheduleProps {
  schedule: Schedule;
}

const SchedulePage: React.FC<ScheduleProps> = ({ schedule }) => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    setAuthorized(false);

    schedule.users.forEach(scheduleUser => {
      if (scheduleUser.id === user?.sub) {
        setAuthorized(true);
      }
    });
  }, [user]);

  return (
    <>
      <p>Authorized: {authorized}</p>
      {JSON.stringify(schedule)}
    </>
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
