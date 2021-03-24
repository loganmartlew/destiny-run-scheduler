import { useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { Button } from '@/components/Button';
import Input from '@/components/Input';
import {
  ModalContainer,
  Title,
  Form,
  NameInputLabel,
  FormButtons,
} from './NewScheduleStyles';

interface NewScheduleProps {
  toggleNewSchedule: (e: React.FormEvent | React.MouseEvent) => void;
}

const NewSchedule: React.FC<NewScheduleProps> = ({ toggleNewSchedule }) => {
  const nameRef = useRef<HTMLInputElement>(null);

  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/schedules', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRef.current?.value,
        user: {
          id: user?.sub,
          name: user?.nickname,
          email: user?.email,
        },
      }),
    });

    toggleNewSchedule(e);
  };

  return (
    <ModalContainer>
      <Title>New Schedule</Title>
      <Form onSubmit={handleSubmit}>
        <NameInputLabel id='name-label'>Schedule Name</NameInputLabel>
        <Input
          type='text'
          id='scheduleName'
          ref={nameRef}
          aria-labelledby='name-labe'
        />
        <FormButtons>
          <Button type='submit'>Add Schedule</Button>
          <Button btnStyle='danger' onClick={toggleNewSchedule}>
            Cancel
          </Button>
        </FormButtons>
      </Form>
    </ModalContainer>
  );
};

export default NewSchedule;
