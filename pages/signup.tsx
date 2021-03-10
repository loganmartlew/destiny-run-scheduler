import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth, AuthContext } from '@/contexts/AuthContext';

const Signup = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { signup } = useAuth() as AuthContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordRef.current!.value !== passwordConfirmRef.current!.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(
        emailRef.current!.value,
        passwordRef.current!.value,
        usernameRef.current!.value
      );
      router.push('/dashboard');
    } catch {
      setError('Failed to create account');
    }

    setLoading(false);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          Username:
          <input type='text' name='username' id='username' ref={usernameRef} />
        </label>
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
        <label htmlFor='passwordConfirm'>
          Confirm Password:
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            ref={passwordConfirmRef}
          />
        </label>
        <button type='submit' disabled={loading}>
          Sign Up
        </button>
        {error && <p>{error}</p>}
      </form>
      <div>
        Already have an account?{' '}
        <Link href='/login'>
          <a href='/login'>Log In</a>
        </Link>
      </div>
    </>
  );
};

export default Signup;
