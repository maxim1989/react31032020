import React from 'react';
import { css } from '@emotion/core';

export interface CellInterface {
    position: number;
}

interface CellProps extends CellInterface {}

export const Cell: React.FC<CellProps> = ({
    position
}) => (
    <div css={css({
        width: '10px',
        height: '10px',
        borderLeft: '1px solid #000',
        borderBottom: '1px solid #000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:nth-of-type(n)': {
            backgroundColor: '#c5dcde'
        },
        '&:nth-of-type(2n)': {
            backgroundColor: '#f2d9d5'
        },
        '&:nth-of-type(3n)': {
            backgroundColor: 'red'
        }
    })}>
        -
    </div>
);
