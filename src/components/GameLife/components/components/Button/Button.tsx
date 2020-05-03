import styled from '@emotion/styled';

interface ButtonProps {
    selected?: boolean;
    'data-size'?: number;
    'data-percent'?: number;
    'data-operation'?: string;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${props => props.selected ? 'grey' : '#fff'};
  margin-right: 5px;
  width: 100px;
  &:last-child {
      margin-right: 0;
  }
`;