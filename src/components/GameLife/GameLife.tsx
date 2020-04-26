import React from 'react';
import { css } from '@emotion/core';

import { FieldSizeEnum } from '@shared/enums';
import { Cell, CellInterface } from './components/Cell';

interface FormInterface {
    fieldSize: FieldSizeEnum.Small | FieldSizeEnum.Medium | FieldSizeEnum.Big;
};

interface GameLifeProps {};
interface GameLifeState {
    form: FormInterface;
    data: CellInterface[];
};

export class GameLife extends React.PureComponent<GameLifeProps, GameLifeState> {
    state: GameLifeState = {
        form: {
            fieldSize: FieldSizeEnum.Small
        },
        data: [...new Array(FieldSizeEnum.Small * (FieldSizeEnum.Small - 20))].map((_, index) => ({
            position: index
        }))
    }

    render() {
        const { data, form: { fieldSize } } = this.state;

        return (
            <div className="wrapper" css={css({
                display: 'flex',
                flexWrap: 'wrap',
                width: `${fieldSize * 11}px`,
                borderTop: '1px solid #000',
                borderRight: '1px solid #000'
            })}>
                {data.map(({ position }) => <Cell key={position} position={position}/>)}
            </div>
        );
    }
} 
