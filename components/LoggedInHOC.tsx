import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { Button } from '@/components/Button';

interface LoggedInHOCProps {
  LoggedinComponent: React.FC<any>;
}

const LoggedInHOC: React.FC<LoggedInHOCProps> = ({ LoggedinComponent }) => {
  const { user } = useUser();

  let [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  return loggedIn ? <LoggedinComponent /> : <LoggedOut />;
};

export default LoggedInHOC;

const LoggedOut = () => {
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
