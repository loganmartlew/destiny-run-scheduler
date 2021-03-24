import Link from 'next/link';
import { Schedule } from '@/types/ScheduleTypes';

interface ListProps {
  schedules: Schedule[];
}

const SchedulePreviewList: React.FC<ListProps> = ({ schedules }) => {
  return (
    <section>
      {schedules.map(schedule => (
        <div key={schedule.ref}>
          <Link href={`/schedule/${schedule.ref}`}>
            <a href={`/schedule/${schedule.ref}`}>
              <h3>{schedule.ref}</h3>
              <ul>
                {schedule.users.map(user => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </a>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default SchedulePreviewList;
