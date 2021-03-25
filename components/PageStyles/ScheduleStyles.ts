import styled from 'styled-components';

export const ScheduleContainer = styled.div`
  padding-top: 5rem;
`;

export const ScheduleTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const Users = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const UserBadge = styled.span`
  padding: 0.5rem 0.8rem;
  border-radius: 500px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const NextRuns = styled.h2`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
`;

export const WeekContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
`;

export const WeekLabel = styled.h3`
  font-size: 1.5rem;
`;

export const WeekDay = styled.span`
  display: flex;
  padding: 0.8em;
  align-items: center;
  justify-content: center;
  width: 2ch;
  height: 2ch;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 500px;
  /* text-align: center; */
`;

export const WeekdayRuns = styled.p`
  font-size: 1.3rem;
`;
