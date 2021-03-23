import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  padding-top: 5em;
`;

export const Title = styled.h1`
  margin-bottom: 3rem;
  font-size: 3rem;
`;

export const ProfileField = styled.div`
  display: flex;
  align-items: center;
`;

export const FieldTitle = styled.h2`
  margin-right: 1rem;
  font-size: 1.8rem;
`;

export const FieldValue = styled.span`
  font-size: 1.5rem;
`;

export const FieldInput = styled.input`
  margin-right: 1rem;
  padding: 0.4em 0.7em;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;
