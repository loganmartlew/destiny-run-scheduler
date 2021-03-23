import { useState, useEffect } from 'react';
import LoggedInHOC from '@/components/LoggedInHOC';

const Profile: React.FC = () => {
  return <main></main>;
};

const Auth: React.FC = () => <LoggedInHOC LoggedinComponent={Profile} />;

export default Auth;
