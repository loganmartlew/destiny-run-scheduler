import Link from 'next/link';
import { Button } from '@/components/Button';

const Nav = () => {
  return (
    <>
      <Link href='#'>
        <Button as='a' btnStyle='none'>
          Features
        </Button>
      </Link>
      <Link href='#'>
        <Button as='a' btnStyle='none'>
          Pricing
        </Button>
      </Link>
      <Link href='#'>
        <Button as='a' btnStyle='none'>
          Contact
        </Button>
      </Link>
    </>
  );
};

export default Nav;
