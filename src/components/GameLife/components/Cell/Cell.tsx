import React from 'react';
import { css } from '@emotion/core';

import { AgeEnum } from '@shared/enums';

export interface CellInterface {
    position: number;
    age: AgeEnum.Small | AgeEnum.Medium | AgeEnum.Big | AgeEnum.Empty;
}

interface CellProps extends CellInterface {}

export const Cell: React.FC<CellProps> = ({
    position,
    age
}) => (
    <div css={css({
        width: '10px',
        height: '10px',
        borderLeft: '1px solid #000',
        borderBottom: '1px solid #000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: age
    })}>
        -
    </div>
);
