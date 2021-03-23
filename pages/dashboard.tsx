import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { IoMdAdd } from 'react-icons/io';
import ScheduleList from '@/components/ScheduleList';
import { Button } from '@/components/Button';
import Header from '@/components/Header';
import {
  DashboardWrapper,
  Title,
  SectionTitle,
  SchedulesTitle,
} from '@/components/PageStyles/DashboardStyles';
import { Schedule } from '@/types/ScheduleTypes';

interface DashboardProps {
  schedules: Schedule[];
}

const LoggedinDashboard: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>();

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      fetch('/api/schedules/previews?userid=1')
        .then(res => res.json())
        .then(schedules => setSchedules(schedules));
    }
  }, [user]);

  return (
    <DashboardWrapper>
      <Header />
      <Title>Welcome{user && ', ' + user.name}!</Title>
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

const DefaultDashboard = () => {
  return (
    <>
      <p>You are not signed in in</p>
      <div>
        <Button as='a' href='/api/auth/login'>
          Log In
        </Button>
      </div>
    </>
  );
};

const DashboardHOC: React.FC<DashboardProps> = ({ schedules }) => {
  const { user } = useUser();

  let [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  return loggedIn ? <LoggedinDashboard /> : <DefaultDashboard />;
};

export default DashboardHOC;
