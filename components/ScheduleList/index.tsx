import { useEffect } from 'react';
import Link from 'next/link';
import { BiMenu } from 'react-icons/bi';
import { Button } from '@/components/Button';
import {
  List,
  SchedulePreview,
  ScheduleHeader,
  ReorderContainer,
  ScheduleName,
  NextRunBadge,
  Users,
  ButtonsContainer,
} from './ScheduleListStyles';
import { Schedule } from '@/types/ScheduleTypes';

interface ScheduleProps {
  schedules: Schedule[];
}

const ScheduleList: React.FC<ScheduleProps> = ({ schedules }) => {
  const newSchedules = schedules;

  useEffect(() => {
    newSchedules.forEach(schedule => {
      schedule.users.push({
        ref: '235445',
        ts: 27439034,
        name: 'Gunnar',
        email: '1@1.com',
      });
      schedule.users.push({
        ref: '235446',
        ts: 24399034,
        name: 'Cocobeans',
        email: '1@1.com',
      });
      schedule.users.push({
        ref: '235456',
        ts: 27439903,
        name: 'Rhyoa',
        email: '1@1.com',
      });
      schedule.users.push({
        ref: '23456',
        ts: 27439904,
        name: 'Theo',
        email: '1@1.com',
      });
      schedule.users.push({
        ref: '234456',
        ts: 74399034,
        name: 'Crimson',
        email: '1@1.com',
      });
    });
  }, []);

  return (
    <List>
      {newSchedules.map(schedule => (
        <SchedulePreview key={schedule.ref}>
          <ScheduleHeader>
            <ReorderContainer>
              <BiMenu />
            </ReorderContainer>
            <ScheduleName>{schedule.name}</ScheduleName>
          </ScheduleHeader>
          <NextRunBadge>Runs at +6, 20/03</NextRunBadge>
          <Users>
            {schedule.users.map(user => (
              <p key={user.ref}>{user.name}</p>
            ))}
          </Users>
          <ButtonsContainer>
            <Link href={`/schedule/${schedule.ref}`}>
              <Button as='a' size='sm'>
                View Schedule
              </Button>
            </Link>
            <Button size='sm' btnStyle='danger'>
              Leave Schedule
            </Button>
          </ButtonsContainer>
        </SchedulePreview>
      ))}
    </List>
  );
};

export default ScheduleList;
