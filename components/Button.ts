import styled from 'styled-components';

interface ButtonProps {
  btnStyle?: 'primary' | 'outline' | 'danger' | 'none';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.35em 0.9em;
  width: max-content;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 3px solid;
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 100ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }

  ${props => {
    switch (props.btnStyle) {
      case 'outline':
        return `
          background-color: unset;
          border-color: ${props.theme.colors.white};

          &:hover {
            background-color: ${props.theme.colors.white};
            color: ${props.theme.colors.dark}
          }
        `;
      case 'danger':
        return `
          background-color: ${props.theme.colors.danger};
          border-color: ${props.theme.colors.danger};

          &:hover {
            background-color: ${props.theme.colors.dangerLight};
            border-color: ${props.theme.colors.dangerLight};
          }
        `;
      case 'none':
        return `
          background-color: unset;
          border: unset;

          &:hover {
            background-color: unset;
            color: ${props.theme.colors.primary}
          }
        `;
    }
  }}

  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          font-size: 0.9rem;
        `;
      case 'lg':
        return `
          font-size: 1.6rem;
        `;
    }
  }}
`;
