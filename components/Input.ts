import styled from 'styled-components';

export default styled.input`
  margin-right: 1rem;
  padding: 0.4em 0.7em;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;
