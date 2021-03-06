import { useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const forgotpassword = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();

  const { resetPassword } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
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
