import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      router.push('/dashboard');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email:
          <input type='email' name='email' id='email' ref={emailRef} />
        </label>
        <label htmlFor='password'>
          Password:
          <input type='password' name='password' id='password' ref={passwordRef} />
        </label>
        <button type='submit' disabled={loading}>
          Sign In
        </button>
        {error && <p>{error}</p>}
      </form>
      <div>
        <Link href='/forgotpassword'>
          <a href='/forgotpassword'>Forgot Password?</a>
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

export default Login;
