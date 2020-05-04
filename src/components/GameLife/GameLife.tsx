import React from 'react';
import { css } from '@emotion/core';

import { FieldSizeEnum, StartPercentEnum, AgeEnum, SpeedEnum, OperationEnum } from '@shared/enums';
import { randomInteger } from '@shared/utils';
import { Cell, CellInterface } from './components/Cell';
import { BlockSize, HandleFieldSize } from './components/BlockSize';
import { BlockStartPercent, HandleStartPercent } from './components/BlockStartPercent';
import { Pult, HandlePult } from './components/Pult';
import { Button } from './components/components/Button';

export type FieldSize = FieldSizeEnum.Small | FieldSizeEnum.Medium | FieldSizeEnum.Big;
export type StartPercent = StartPercentEnum.Small | StartPercentEnum.Medium | StartPercentEnum.Big;
type Speed = SpeedEnum.Small | SpeedEnum.Medium | SpeedEnum.Big;
type RandomStoreType = { [key: number]: boolean };

export interface GameLifeState {
    data: CellInterface[];
    fieldSize: FieldSize;
    startPercent: StartPercent,
    speed: Speed,
    active: boolean
};

export class GameLife extends React.PureComponent<{}, GameLifeState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            data: this.createData(FieldSizeEnum.Small, StartPercentEnum.Medium),
            fieldSize: FieldSizeEnum.Small,
            startPercent: StartPercentEnum.Medium,
            speed: SpeedEnum.Medium,
            active: false
        };
    }

    generateRandomNumbers = (fieldSize:FieldSize, startPercent:StartPercent): RandomStoreType => {
        const store: RandomStoreType = {};
        const max = fieldSize * (fieldSize - 20) - 1;
        const storeLength = Math.round(startPercent * max / 100);
        let count:number = 0;

        while (count < storeLength) {
            const num: number = randomInteger(0, max);

            if (!store[num]) {
                store[num] = true;
                count++;
            }
        }

        return store;
    }

    createData = (l: FieldSize, p: StartPercent):CellInterface[] => {
        const dataLength: number = l * (l - 20);
        const randomNumbers: RandomStoreType = this.generateRandomNumbers(l, p);
        
        return [...new Array(dataLength)].map((_, position): CellInterface => {
            const age: string = randomNumbers[position] ? AgeEnum.Small : AgeEnum.Empty;

            return {
                position,
                age 
            };
        });
    }

    handleFieldSize: HandleFieldSize = (event) => {
        const fieldSize: number = parseInt(event.currentTarget.getAttribute('data-size'));
        // const { startPercent } = this.state;

        // this.setState({ fieldSize, active: false, data: this.createData(fieldSize, startPercent) }); TODO Нужна функция updateData
        this.setState({ fieldSize, active: false });
    }

    handleStartPercent: HandleStartPercent = (event) => {
        const startPercent: number = parseInt(event.currentTarget.getAttribute('data-percent'));
        // const { fieldSize } = this.state;

        // this.setState({ startPercent, active: false, data: this.createData(fieldSize, startPercent) }); TODO Нужна функция updateData
        this.setState({ startPercent, active: false });
    }

    handlePult: HandlePult = (event) => {
        const operation: string = event.currentTarget.getAttribute('data-operation');

        switch (operation) {
            case OperationEnum.Slower:
                this.setState(state => ({ speed: state.speed - 1 }));
                break;
            case OperationEnum.Pause:
                this.setState({ active: false });
                break;
            case OperationEnum.Play:
                this.setState({ active: true });
                break;
            case OperationEnum.Faster:
                this.setState(state => ({ speed: state.speed + 1 }));
                break;
            default:
                break;
        }
    }

    handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void = () => {
        this.setState({
            data: this.createData(FieldSizeEnum.Small, StartPercentEnum.Medium),
            active: false
        });
    }

    render() {
        const { data, fieldSize, startPercent, speed, active } = this.state;

        return (
            <>
                <div css={css({ marginBottom: '20px' })}>
                    <BlockSize fieldSize={fieldSize} handleFieldSize={this.handleFieldSize}/>
                </div>
                <div css={css({ marginBottom: '20px' })}>
                    <BlockStartPercent startPercent={startPercent} handleStartPercent={this.handleStartPercent}/>
                </div>
                <div css={css({ marginBottom: '20px' })}>
                    <Pult speed={speed} active={active} handlePult={this.handlePult}/>
                </div>
                <div  css={css({ marginBottom: '20px' })}>
                    <Button name="reset" onClick={this.handleReset}>Остановить/сбросить</Button>
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
