import { useState, useEffect, useContext, useRef } from 'react';
import Link from 'next/link';
import { ThemeContext } from 'styled-components';
import { BsChevronCompactDown } from 'react-icons/bs';
import { HamburgerButton } from 'react-hamburger-button';
import gsap from 'gsap';
import TextAccent from '@/components/TextAccent';
import { Button } from '@/components/Button';
import {
  HeroSection,
  TopBar,
  Logo,
  Nav,
  AccountButtons,
  HeroContent,
  Title,
  Subtitle,
  ArrowContainer,
  MenuBtnContainer,
  Menu,
  MenuNav,
  MenuAccountButtons,
} from '@/components/PageStyles/HomeStyles';
import { Theme } from '@/styles/theme';

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const theme = useContext<Theme>(ThemeContext);

  const menuRef = useRef<HTMLElement>();

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
    <main>
      <HeroSection>
        <TopBar>
          <Logo>
            <Link href='/'>Runs?</Link>
          </Logo>
          <Nav>
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
          </Nav>
          <AccountButtons>
            <Link href='/login'>
              <Button as='a' btnStyle='outline'>
                Log In
              </Button>
            </Link>
            <Link href='/signup'>
              <Button as='a'>Sign Up</Button>
            </Link>
          </AccountButtons>
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
        </TopBar>
        <Menu ref={menuRef}>
          <MenuNav>
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
          </MenuNav>
          <MenuAccountButtons>
            <Link href='/login'>
              <Button as='a' btnStyle='outline'>
                Log In
              </Button>
            </Link>
            <Link href='/signup'>
              <Button as='a'>Sign Up</Button>
            </Link>
          </MenuAccountButtons>
        </Menu>
        <HeroContent>
          <Title>
            When Are <TextAccent>Runs?</TextAccent>
          </Title>
          <Subtitle>Always know when your team can run</Subtitle>
          <Button as='a' size='lg'>
            Learn More
          </Button>
        </HeroContent>
        <ArrowContainer>
          <BsChevronCompactDown />
        </ArrowContainer>
      </HeroSection>
    </main>
  );
};

export default Home;
