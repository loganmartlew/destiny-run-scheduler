import { useState, useEffect, useContext, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { ThemeContext } from 'styled-components';
import gsap from 'gsap';
import { HamburgerButton } from 'react-hamburger-button';
import { Button } from '@/components/Button';
import Nav from './Nav';
import {
  TopBar,
  Logo,
  NavBar,
  AccountButtons,
  MenuBtnContainer,
  Menu,
  MenuNav,
  MenuAccountButtons,
} from './HeaderStyles';
import { Theme } from '@/styles/theme';

const LoggedOutButtons: React.FC = () => (
  <Button as='a' href='/api/auth/login'>
    Log In
  </Button>
);

interface LoggedInButtonsProps {
  dashboard: boolean;
}

const LoggedInButtons: React.FC<LoggedInButtonsProps> = ({ dashboard }) => (
  <>
    <Button as='a' href='/api/auth/logout' btnStyle='outline'>
      Log Out
    </Button>

    {dashboard ? (
      <Link href='/profile'>
        <Button as='a'>Profile</Button>
      </Link>
    ) : (
      <Link href='/dashboard'>
        <Button as='a'>Dashboard</Button>
      </Link>
    )}
  </>
);

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [hasNav, setHasNav] = useState<boolean>(true);

  const theme = useContext<Theme>(ThemeContext);

  const menuRef = useRef<HTMLElement>();

  const router = useRouter();

  const { user } = useUser();

  const NAVLESS_ROUTES = ['/dashboard', '/profile'];

  // Set logged in state
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  // Set hasNav
  useEffect(() => {
    setHasNav(true);

    NAVLESS_ROUTES.forEach(route => {
      if (router.pathname.includes(route)) {
        console.log(router.pathname);
        setHasNav(false);
      }
    });
  }, [router.pathname]);

  // Set initial animation
  useEffect(() => {
    gsap.to(menuRef.current!, {
      scaleY: 0,
      yPercent: -50,
      duration: 0.1,
      opacity: 0,
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);

    if (!menuOpen) {
      gsap.to(menuRef.current!, {
        scaleY: 1,
        yPercent: 0,
        duration: 0.1,
        opacity: 1,
      });
    } else {
      gsap.to(menuRef.current!, {
        scaleY: 0,
        yPercent: -50,
        duration: 0.1,
        opacity: 0,
      });
    }
  };

  return (
    <TopBar nav={hasNav}>
      <Logo>
        <Link href='/'>Runs?</Link>
      </Logo>

      {hasNav && (
        <NavBar>
          <Nav />
        </NavBar>
      )}

      <AccountButtons nav={hasNav}>
        {loggedIn ? (
          <LoggedInButtons dashboard={router.pathname.includes('dashboard')} />
        ) : (
          <LoggedOutButtons />
        )}
      </AccountButtons>

      {hasNav && (
        <MenuBtnContainer>
          <HamburgerButton
            open={menuOpen}
            onClick={toggleMenu}
            color={theme.colors.white}
            width={35}
            height={25}
            strokeWidth={3}
          />
        </MenuBtnContainer>
      )}

      <Menu ref={menuRef}>
        <MenuNav>
          <Nav />
        </MenuNav>

        <MenuAccountButtons>
          {loggedIn ? (
            <LoggedInButtons
              dashboard={router.pathname.includes('dashboard')}
            />
          ) : (
            <LoggedOutButtons />
          )}
        </MenuAccountButtons>
      </Menu>
    </TopBar>
  );
};

export default Header;
