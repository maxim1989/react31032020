import React from 'react';
import _ from 'lodash';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { FieldSizeEnum, StartPercentEnum, AgeEnum } from '@shared/enums';
import { randomInteger } from '@shared/utils';
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
type RandomStoreType = { [key: number]: boolean };

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
            data: this.createData(FieldSizeEnum.Small, StartPercentEnum.Medium),
            fieldSize: FieldSizeEnum.Small,
            startPercent: StartPercentEnum.Medium
        };
    }

    generateRandomNumbers = (fieldSize:FieldSize, startPercent:StartPercent): RandomStoreType => {
        const store: RandomStoreType = {};
        const max = fieldSize * (fieldSize - 20) - 1;
        const storeLength = Math.round(startPercent * max / 100);

        while (Object.keys(store).length < storeLength) {
            const num: number = randomInteger(0, max);

            if (!store[num]) {
                store[num] = true;
            }
        }

        return store;
    }

    createData = (l: FieldSize, p: StartPercent):CellInterface[] => {
        const dataLength: number = l * (l - 20);
        const randomNumbers: RandomStoreType = this.generateRandomNumbers(l, p);
        
        return [...new Array(dataLength)].map((_, index): CellInterface => {
            const age: string = randomNumbers[index] ? AgeEnum.Small : AgeEnum.Empty;

            return {
                position: index,
                age 
            };
        });
    }

    handleFieldSize = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault();
        const fieldSize: number = _.toInteger(event.currentTarget.getAttribute('data-size'));
        const { startPercent } = this.state;

        this.setState({ fieldSize, data: this.createData(fieldSize, startPercent) });
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
                    {data.map((item: CellInterface) => <Cell key={item.position} position={item.position} age={item.age}/>)}
                </div>
            </>
        );
    }
} 
