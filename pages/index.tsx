import Link from 'next/link';

const Home = () => {
  return (
    <>
      <h1>Destiny Run Scheduler</h1>
      <Link href='/login'>
        <button>Log In</button>
      </Link>
      <Link href='/signup'>
        <button>Sign Up</button>
      </Link>
    </>
  );
};

export default Home;
