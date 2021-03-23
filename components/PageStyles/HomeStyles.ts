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
