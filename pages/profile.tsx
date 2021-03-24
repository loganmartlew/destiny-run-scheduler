import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AiFillEdit } from 'react-icons/ai';
import { Button } from '@/components/Button';
import {
  ProfileWrapper,
  Title,
  ProfileField,
  FieldTitle,
  FieldValue,
  FieldInput,
} from '@/pagestyles/ProfileStyles';

const Profile: React.FC = () => {
  const { user } = useUser();

  const [username, setUsername] = useState<string>(user?.nickname!);
  const [usernameEdit, setUsernameEdit] = useState<boolean>(false);

  const router = useRouter();

  const toggleUsernameEdit = () => {
    setUsernameEdit(prevState => !prevState);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const saveUsername = async (e: React.MouseEvent) => {
    e.preventDefault();
    toggleUsernameEdit();

    await fetch(`/api/users/${user?.sub}/username`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
      }),
    });

    router.push('/api/auth/login?profile=1');
  };

  return (
    <ProfileWrapper>
      <Title>Profile</Title>

      <ProfileField>
        <FieldTitle>Username:</FieldTitle>
        {!usernameEdit ? (
          <>
            <FieldValue>{username}</FieldValue>
            <Button btnStyle='none' size='lg' onClick={toggleUsernameEdit}>
              <AiFillEdit />
            </Button>
          </>
        ) : (
          <>
            <FieldInput
              type='text'
              value={username}
              onChange={handleUsernameChange}
            />
            <Button size='sm' onClick={saveUsername}>
              Save
            </Button>
          </>
        )}
      </ProfileField>

      <ProfileField>
        <FieldTitle>Email:</FieldTitle>
        <FieldValue>{user?.email}</FieldValue>
      </ProfileField>
    </ProfileWrapper>
  );
};

export default withPageAuthRequired(Profile);
