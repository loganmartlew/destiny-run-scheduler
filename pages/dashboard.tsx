import React, { useState, useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { IoMdAdd } from 'react-icons/io';
import ScheduleList from '@/components/ScheduleList';
import NewSchedule from '@/components/NewSchedule';
import { Button } from '@/components/Button';
import {
  DashboardWrapper,
  Title,
  SectionTitle,
  SchedulesTitle,
} from '@/pagestyles/DashboardStyles';
import { Schedule } from '@/types/ScheduleTypes';

const Dashboard: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>();
  const [showScheduleForm, setShowScheduleForm] = useState<boolean>(false);

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      fetch(`/api/schedules/previews?userid=${user.sub}`)
        .then(res => res.json())
        .then(schedules => setSchedules(schedules));
    }
  }, [user, showScheduleForm]);

  const toggleNewSchedule = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setShowScheduleForm(prevState => !prevState);
  };

  return (
    <DashboardWrapper>
      <Title>Welcome{user && ', ' + user.nickname}!</Title>
      <SectionTitle>
        <SchedulesTitle>My Schedules</SchedulesTitle>
        <Button onClick={toggleNewSchedule}>
          <IoMdAdd /> New Schedule
        </Button>
      </SectionTitle>
      {showScheduleForm && (
        <NewSchedule toggleNewSchedule={toggleNewSchedule} />
      )}
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

export default withPageAuthRequired(Dashboard);
