import React from 'react';
import styled from '@emotion/styled';

import { AgeEnum } from '@shared/enums';

interface DivProps {
    age: string;
};

const Div = styled.div<DivProps>`
    width: 10px;
    height: 10px;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.age}
`;

export interface CellInterface {
    position: number;
    age: AgeEnum.Small | AgeEnum.Medium | AgeEnum.Big | AgeEnum.Empty;
}

interface CellProps extends CellInterface {}

export const Cell: React.FC<CellProps> = ({
    position,
    age
}) => (
    <Div age={age}>
        -
    </Div>
);
