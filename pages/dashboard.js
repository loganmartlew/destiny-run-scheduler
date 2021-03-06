import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth, AuthProvider } from '../contexts/AuthContext';

const LoggedinDashboard = () => {
  const [error, setError] = useState('');

  const router = useRouter();
  const { logout, currentUser, username } = useAuth();

  const handleLogout = async e => {
    setError('');

    try {
      await logout();
      router.push('/');
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <>
      <h1>Schedules</h1>
      {username && username}
      {currentUser && currentUser.email}
      <div>
        <button onClick={handleLogout}>Log out</button>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

const DefaultDashboard = () => {
  return (
    <>
      <p>You are not signed in in</p>
      <div>
        <Link href='/signin'>
          <a href='/signin'>Sign In</a>
        </Link>
      </div>
    </>
  );
};

const DashboardHOC = () => {
  const { currentUser } = useAuth();

  return currentUser ? <LoggedinDashboard /> : <DefaultDashboard />;
};

export default DashboardHOC;
