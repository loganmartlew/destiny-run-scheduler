import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.white};
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
