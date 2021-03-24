import Link from 'next/link';
import { useUser, UserContext } from '@auth0/nextjs-auth0';
import { BiMenu } from 'react-icons/bi';
import { Button } from '@/components/Button';
import {
  List,
  Preview,
  ScheduleHeader,
  ReorderContainer,
  ScheduleName,
  NextRunBadge,
  Users,
  ButtonsContainer,
} from './ScheduleListStyles';
import { SchedulePreview } from '@/types/ScheduleTypes';

interface ScheduleProps {
  schedules: SchedulePreview[];
  fetchPreviews: () => void;
}

const ScheduleList: React.FC<ScheduleProps> = ({
  schedules,
  fetchPreviews,
}) => {
  const newSchedules = schedules;

  const { user }: UserContext = useUser();

  const leaveSchedule = async (e: React.MouseEvent, id: number) => {
    await fetch(`/api/schedules/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userid: user?.sub,
      }),
    });

    fetchPreviews();
  };

  return (
    <List>
      {newSchedules.map(schedule => (
        <Preview key={schedule.id}>
          <ScheduleHeader>
            <ReorderContainer>
              <BiMenu />
            </ReorderContainer>
            <ScheduleName>{schedule.name}</ScheduleName>
          </ScheduleHeader>
          <NextRunBadge>Runs at +6, 20/03</NextRunBadge>
          <Users>
            {schedule.users.map(user => (
              <p key={user.id}>{user.name}</p>
            ))}
          </Users>
          <ButtonsContainer>
            <Link href={`/schedule/${schedule.id}`}>
              <Button as='a' size='sm'>
                View Schedule
              </Button>
            </Link>
            <Button
              size='sm'
              btnStyle='danger'
              onClick={e => leaveSchedule(e, schedule.id)}
            >
              Leave Schedule
            </Button>
          </ButtonsContainer>
        </Preview>
      ))}
    </List>
  );
};

export default ScheduleList;
