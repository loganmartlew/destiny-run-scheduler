import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { IoMdAdd } from 'react-icons/io';
import ScheduleList from '@/components/ScheduleList';
import { Button } from '@/components/Button';
import {
  DashboardWrapper,
  TopBar,
  Logo,
  AccountButtons,
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
      <TopBar>
        <Logo>
          <Link href='/'>Runs?</Link>
        </Logo>
        <AccountButtons>
          <Button as='a' href='/api/auth/logout' btnStyle='outline'>
            Log Out
          </Button>
          <Link href='/signup'>
            <Button as='a'>Profile</Button>
          </Link>
        </AccountButtons>
      </TopBar>
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
  const { user, error, isLoading } = useUser();

  let [loggedIn, setLoggedIn] = useState<boolean>(false);

  if (user) setLoggedIn(true);

  return loggedIn ? <LoggedinDashboard /> : <DefaultDashboard />;
};

export default LoggedinDashboard;

// export const getServerSideProps: GetServerSideProps<DashboardProps> = async () => {
//   const schedule1: Schedule = {
//     ref: 1,
//     ts: 1,
//     name: 'Wish Runs',
//     users: [
//       {
//         ref: '1',
//         ts: 1,
//         name: 'Jag',
//         email: 'logan.martlew@gmail.com',
//       },
//     ],
//     days: [
//       {
//         ref: '1',
//         ts: 1,
//         date: '3/7/2021',
//         ranges: [
//           {
//             ref: '1',
//             ts: 1,
//             user: {
//               ref: '1',
//               ts: 1,
//               name: 'Jag',
//               email: 'logan.martlew@gmail.com',
//             },
//             start: 6,
//             end: 10,
//           },
//         ],
//       },
//     ],
//   };

//   const schedule2: Schedule = {
//     ref: '2',
//     ts: 1,
//     name: 'Other Runs',
//     users: [
//       {
//         ref: '1',
//         ts: 1,
//         name: 'Jag',
//         email: 'logan.martlew@gmail.com',
//       },
//     ],
//     days: [
//       {
//         ref: '1',
//         ts: 1,
//         date: '3/7/2021',
//         ranges: [
//           {
//             ref: '1',
//             ts: 1,
//             user: {
//               ref: '1',
//               ts: 1,
//               name: 'Jag',
//               email: 'logan.martlew@gmail.com',
//             },
//             start: 6,
//             end: 10,
//           },
//         ],
//       },
//     ],
//   };

//   const schedules: Schedule[] = [schedule1, schedule2];

//   return {
//     props: {
//       schedules,
//     },
//   };
// };
