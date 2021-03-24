import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  padding: 3rem 1rem;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.dark};
`;

export const Title = styled.h1`
  margin-bottom: 3rem;
  height: max-content;
`;

export const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  height: max-content;
  background-color: ${({ theme }) => theme.colors.darkLight};
`;

export const NameInputLabel = styled.h3`
  font-size: 1.5rem;
`;

export const FormButtons = styled.div`
  display: flex;
  gap: 1rem;
`;
