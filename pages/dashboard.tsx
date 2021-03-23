import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { IoMdAdd } from 'react-icons/io';
import LoggedInHOC from '@/components/LoggedInHOC';
import ScheduleList from '@/components/ScheduleList';
import { Button } from '@/components/Button';
import {
  DashboardWrapper,
  Title,
  SectionTitle,
  SchedulesTitle,
} from '@/components/PageStyles/DashboardStyles';
import { Schedule } from '@/types/ScheduleTypes';

const Dashboard: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>();

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      fetch(`/api/schedules/previews?userid=${user.sub}`)
        .then(res => res.json())
        .then(schedules => setSchedules(schedules));
    }
  }, [user]);

  return (
    <DashboardWrapper>
      <Title>Welcome{user && ', ' + user.nickname}!</Title>
      <SectionTitle>
        <SchedulesTitle>My Schedules</SchedulesTitle>
        <Button as='a'>
          <IoMdAdd /> New Schedule
        </Button>
      </SectionTitle>
      <div>
        {Array.isArray(schedules) ? (
          <ScheduleList schedules={schedules} />
        ) : isLoading ? (
          <p>Loading Schedules...</p>
        ) : (
          <p>No schedules found</p>
        )}
      </div>
      <div>{error && <p>{error}</p>}</div>
    </DashboardWrapper>
  );
};

const Auth: React.FC = () => <LoggedInHOC LoggedinComponent={Dashboard} />;

export default Auth;
