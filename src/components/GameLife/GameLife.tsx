import React from 'react';
import _ from 'lodash';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { FieldSizeEnum, StartPercentEnum } from '@shared/enums';
import { Cell, CellInterface } from './components/Cell';

interface ButtonProps {
    selected: boolean;
    'data-size'?: number;
    'data-percent'?: number;
}

const Button = styled.button<ButtonProps>`
  background-color: ${props => props.selected ? 'grey' : '#fff'};
  margin-right: 5px;
  width: 100px;
  &:last-child {
      margin-right: 0;
  }
`;

type FieldSize = FieldSizeEnum.Small | FieldSizeEnum.Medium | FieldSizeEnum.Big;
type StartPercent = StartPercentEnum.Small | StartPercentEnum.Medium | StartPercentEnum.Big;

interface FormInterface {};

interface GameLifeProps {};
interface GameLifeState {
    form: FormInterface;
    data: CellInterface[];
    fieldSize: FieldSize;
    startPercent: StartPercent
};

export class GameLife extends React.PureComponent<GameLifeProps, GameLifeState> {
    constructor(props: GameLifeProps) {
        super(props);

        this.state = {
            form: {},
            data: this.createData(FieldSizeEnum.Small),
            fieldSize: FieldSizeEnum.Small,
            startPercent: StartPercentEnum.Medium
        };
    }

    createData = (l: FieldSize):CellInterface[] => [...new Array(l * (l - 20))].map((_, index) => ({
        position: index
    }))

    handleFieldSize = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault();
        const fieldSize: number = _.toInteger(event.currentTarget.getAttribute('data-size'));

        this.setState({ fieldSize, data: this.createData(fieldSize) });
    }

    handleStartPercent = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault();
        const startPercent: number = _.toInteger(event.currentTarget.getAttribute('data-percent'));

        this.setState({ startPercent });
    }

    render() {
        const { data, fieldSize, startPercent } = this.state;

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
                    marginBottom: '20px'
                })}>
                    <Button selected={startPercent === StartPercentEnum.Small}
                            data-percent={StartPercentEnum.Small}
                            onClick={this.handleStartPercent}
                    >
                        10%
                    </Button>
                    <Button selected={startPercent === StartPercentEnum.Medium}
                            data-percent={StartPercentEnum.Medium}
                            onClick={this.handleStartPercent}
                    >
                        30%
                    </Button>
                    <Button selected={startPercent === StartPercentEnum.Big}
                            data-percent={StartPercentEnum.Big}
                            onClick={this.handleStartPercent}
                    >
                        50%
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
