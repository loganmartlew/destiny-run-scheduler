import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth, AuthContext } from '@/contexts/AuthContext';
import { GetServerSideProps } from 'next';
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
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<String>('');

  const router = useRouter();
  const { logout, dbUser } = useAuth() as AuthContext;

  useEffect(() => {
    if (dbUser) {
      fetch(`/api/schedules?userref=${dbUser?.ref}`)
        .then(res => res.json())
        .then(data => {
          setSchedules(data);
          setLoading(false);
        });
    }
  }, [dbUser]);

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
    <DashboardWrapper>
      <TopBar>
        <Logo>
          <Link href='/'>Runs?</Link>
        </Logo>
        <AccountButtons>
          <Button btnStyle='outline' onClick={handleLogout}>
            Log Out
          </Button>
          <Link href='/signup'>
            <Button as='a'>Profile</Button>
          </Link>
        </AccountButtons>
      </TopBar>
      <Title>Welcome{dbUser && ', ' + dbUser.name}!</Title>
      <SectionTitle>
        <SchedulesTitle>My Schedules</SchedulesTitle>
        <Button as='a'>
          <IoMdAdd /> New Schedule
        </Button>
      </SectionTitle>
      <div>
        {Array.isArray(schedules) ? (
          <ScheduleList schedules={schedules} />
        ) : loading ? (
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

  return loggedIn ? <LoggedinDashboard /> : <DefaultDashboard />;
};

export default DashboardHOC;

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
