import React from 'react';
import _ from 'lodash';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { FieldSizeEnum } from '@shared/enums';
import { Cell, CellInterface } from './components/Cell';

interface ButtonProps {
    selected: boolean;
    'data-size': number;
}

const Button = styled.button<ButtonProps>`
  color: ${props => props.selected ? 'green' : 'red'};
`;

type FieldSize = FieldSizeEnum.Small | FieldSizeEnum.Medium | FieldSizeEnum.Big;

interface FormInterface {
    fieldSize: FieldSize;
};

interface GameLifeProps {};
interface GameLifeState {
    form: FormInterface;
    data: CellInterface[];
};

export class GameLife extends React.PureComponent<GameLifeProps, GameLifeState> {
    constructor(props: GameLifeProps) {
        super(props);

        this.state = {
            form: {
                fieldSize: FieldSizeEnum.Small
            },
            data: this.createData(FieldSizeEnum.Small)
        };
    }

    createData = (l: FieldSize):CellInterface[] => [...new Array(l * (l - 20))].map((_, index) => ({
        position: index
    }))

    handleFieldSize = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault();
        const fieldSize: number = _.toInteger(event.currentTarget.getAttribute('data-size'));

        this.setState({ form: { fieldSize }, data: this.createData(fieldSize) });
    }

    render() {
        const { data, form: { fieldSize } } = this.state;

        return (
            <>
                <div css={css({
                    marginBottom: '20px'
                })}>
                    <Button selected={fieldSize === FieldSizeEnum.Small}
                            data-size={FieldSizeEnum.Small}
                            onClick={this.handleFieldSize}
                    >
                        50x30
                    </Button>
                    <Button selected={fieldSize === FieldSizeEnum.Medium}
                            data-size={FieldSizeEnum.Medium}
                            onClick={this.handleFieldSize}
                    >
                        70x50
                    </Button>
                    <Button selected={fieldSize === FieldSizeEnum.Big}
                            data-size={FieldSizeEnum.Big}
                            onClick={this.handleFieldSize}
                    >
                        100x80
                    </Button>
                </div>
                <div css={css({
                     display: 'flex',
                     flexWrap: 'wrap',
                     width: `${fieldSize * 11}px`,
                     borderTop: '1px solid #000',
                     borderRight: '1px solid #000'
                })}>
                    {data.map(({ position }) => <Cell key={position} position={position}/>)}
                </div>
            </>
        );
    }
} 
