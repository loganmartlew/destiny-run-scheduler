import styled from 'styled-components';

interface NavProps {
  nav: boolean;
}

export const TopBar = styled.header<NavProps>`
  display: grid;
  grid-template-columns: ${({ nav }) =>
    nav ? 'max-content auto max-content' : 'max-content auto'};
  gap: 1rem 3rem;
  padding: 1rem 0;

  ${({ nav }) => {
    if (nav) {
      return `
        @media (max-width: 1075px) {
          grid-template-columns: max-content auto;
        }
      `;
    } else {
      return `
        @media (max-width: 550px) {
          display: flex;
          flex-direction: column;
          gap: 2em;
        }
      `;
    }
  }}
`;

export const Logo = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  ${({ theme }) => theme.letterSpacing.space(theme.letterSpacing.title)}
`;

export const NavBar = styled.nav`
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

export const AccountButtons = styled.div<NavProps>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: right;

  ${({ nav }) =>
    nav &&
    `
  @media (max-width: 690px) {
    display: none;
  }

  @media (max-width: 1075px) {
    grid-column: -1/-2;
    grid-row: 2/3;
  }
  `}
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
