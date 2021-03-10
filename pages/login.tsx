import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth, AuthContext } from '@/contexts/AuthContext';

const Login = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { login } = useAuth() as AuthContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current!.value, passwordRef.current!.value);
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
          <input
            type='password'
            name='password'
            id='password'
            ref={passwordRef}
          />
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
