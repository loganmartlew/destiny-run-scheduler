import styled from 'styled-components';

export const DashboardWrapper = styled.main`
  padding: 0 ${({ theme }) => theme.padding};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
`;

export const TopBar = styled.header`
  display: grid;
  grid-template-columns: max-content auto;
  gap: 1rem 3rem;
  padding: 1rem 0;
  margin-bottom: 5rem;

  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }
`;

export const Logo = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  ${({ theme }) => theme.letterSpacing.space(theme.letterSpacing.title)}
`;

export const AccountButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: right;
`;

export const Title = styled.h1`
  margin-bottom: 3rem;
  font-size: 3rem;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em 2em;
  margin-bottom: 1.5rem;
`;

export const SchedulesTitle = styled.h2`
  font-size: 2rem;
`;
