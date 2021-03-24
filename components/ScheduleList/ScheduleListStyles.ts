import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 1150px) {
    align-items: center;
  }
`;

export const Preview = styled.li`
  display: flex;
  align-items: center;
  gap: 1.6em;
  flex-wrap: wrap;
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.darkLight};

  @media (max-width: 1150px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    padding: 1.5em;
    width: max-content;
  }

  @media (max-width: 600px) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 1em;
    padding: 2em;
  }
`;

export const ScheduleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: max-content;
`;

export const ReorderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 2em;
  cursor: pointer;

  @media (max-width: 1150px) {
    width: max-content;
  }
`;

export const ScheduleName = styled.h3`
  font-size: 1.3em;

  @media (max-width: 1150px) {
    width: max-content;
  }
`;

export const NextRunBadge = styled.span`
  padding: 0.3em 0.8em;
  width: max-content;
  border-radius: 500px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const Users = styled.div`
  display: flex;
  gap: 1.3em;
  flex-grow: 1;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  @media (max-width: 1150px) {
    grid-column: 1/-1;
    justify-content: center;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.6em;

  @media (max-width: 1150px) {
    grid-column: 1/3;
    justify-content: space-around;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 1em;
    margin-top: 1em;
  }
`;
