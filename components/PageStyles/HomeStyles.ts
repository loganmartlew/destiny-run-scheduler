import styled from 'styled-components';

export const HeroSection = styled.section`
  display: grid;
  position: relative;
  grid-template-rows: max-content auto max-content;
  padding: 0 ${({ theme }) => theme.padding};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
`;

export const TopBar = styled.header`
  display: grid;
  grid-template-columns: max-content auto max-content;
  gap: 1rem 3rem;
  padding: 1rem 0;

  @media (max-width: 1075px) {
    grid-template-columns: max-content auto;
  }
`;

export const Logo = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  ${({ theme }) => theme.letterSpacing.space(theme.letterSpacing.title)}
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 690px) {
    display: none;
  }

  @media (max-width: 1075px) {
    justify-self: right;
  }
`;

export const AccountButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: right;

  @media (max-width: 690px) {
    display: none;
  }

  @media (max-width: 1075px) {
    grid-column: -1/-2;
    grid-row: 2/3;
  }
`;

export const HeroContent = styled.div`
  display: grid;
  place-content: center;

  & * {
    margin: 0 auto;
  }
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 4rem;
  ${({ theme }) => theme.letterSpacing.space(theme.letterSpacing.title)}

  @media (max-width: 690px) {
    margin-bottom: 3rem;
    font-size: 3rem;
  }
`;

export const Subtitle = styled.h2`
  margin-bottom: 3rem;
  max-width: 22ch;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  ${({ theme }) => theme.letterSpacing.space(theme.letterSpacing.title)};

  @media (max-width: 690px) {
    display: none;
  }
`;

export const ArrowContainer = styled.div`
  margin: 0 auto;
  font-size: 4rem;
`;

export const MenuBtnContainer = styled.div`
  display: none;

  @media (max-width: 690px) {
    display: grid;
    justify-content: right;
    align-content: center;
  }
`;

interface MenuProps {
  ref: any;
}

export const Menu = styled.header<MenuProps>`
  display: none;

  @media (max-width: 690px) {
    display: grid;
    position: fixed;
    top: 79px;
    left: 0;
    padding: 2rem 1rem;
    width: 100vw;
    background-color: ${({ theme }) => theme.colors.darkLight};
    transform: scaleY(0) translateY(-50%);
  }
`;

export const MenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7em;
  margin-bottom: 2em;
`;

export const MenuAccountButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.7em;
`;
