import { useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth, AuthContext } from '@/contexts/AuthContext';

const forgotpassword = () => {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const { resetPassword } = useAuth() as AuthContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current!.value);
      setMessage('Check your email for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  };

  return (
    <>
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email:
          <input type='email' name='email' id='email' ref={emailRef} />
        </label>
        <button type='submit' disabled={loading}>
          Reset Password
        </button>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </form>
      <div>
        <Link href='/signin'>
          <a href='/signin'>Sign In</a>
        </Link>
      </div>
      <div>
        Need an account?{' '}
        <Link href='/signup'>
          <a href='/signup'>Sign Up</a>
        </Link>
      </div>
    </>
  );
};

export default forgotpassword;
