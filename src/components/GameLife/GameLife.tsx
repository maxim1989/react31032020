import React from 'react';
import _ from 'lodash';
import { css } from '@emotion/core';

import { FieldSizeEnum, StartPercentEnum, AgeEnum, SpeedEnum, OperationEnum } from '@shared/enums';
import { randomInteger } from '@shared/utils';
import { Cell, CellInterface } from './components/Cell';
import { BlockSize, HandleFieldSize } from './components/BlockSize';
import { BlockStartPercent, HandleStartPercent } from './components/BlockStartPercent';
import { Pult, HandlePult } from './components/Pult';
import { Button } from './components/components/Button';

type FieldSize = FieldSizeEnum.Small | FieldSizeEnum.Medium | FieldSizeEnum.Big;
type StartPercent = StartPercentEnum.Small | StartPercentEnum.Medium | StartPercentEnum.Big;
type Speed = SpeedEnum.Small | SpeedEnum.Medium | SpeedEnum.Big;
type RandomStoreType = { [key: number]: boolean };

interface GameLifeProps {};
interface GameLifeState {
    data: CellInterface[];
    fieldSize: FieldSize;
    startPercent: StartPercent,
    speed: Speed,
    active: boolean
};

export class GameLife extends React.PureComponent<GameLifeProps, GameLifeState> {
    constructor(props: GameLifeProps) {
        super(props);

        this.state = {
            // data: this.createData(FieldSizeEnum.Small, StartPercentEnum.Medium), HW 30.04.2020
            data: this.createData(FieldSizeEnum.Small),
            fieldSize: FieldSizeEnum.Small,
            startPercent: StartPercentEnum.Medium,
            speed: SpeedEnum.Small,
            active: false
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

    createData = (l: FieldSize):CellInterface[] => {
    // createData = (l: FieldSize, p: StartPercent):CellInterface[] => { HW 30.04.2020
        const dataLength: number = l * (l - 20);
        // const randomNumbers: RandomStoreType = this.generateRandomNumbers(l, p); HW 30.04.2020
        
        return [...new Array(dataLength)].map((_, index): CellInterface => {
            // const age: string = randomNumbers[index] ? AgeEnum.Small : AgeEnum.Empty; HW 30.04.2020
            const age: string = AgeEnum.Empty;

            return {
                position: index,
                age 
            };
        });
    }

    handleFieldSize: HandleFieldSize = (event) => {
        event.preventDefault();
        const fieldSize: number = _.toInteger(event.currentTarget.getAttribute('data-size'));

        this.setState({ fieldSize, active: false });
    }

    handleStartPercent: HandleStartPercent = (event) => {
        event.preventDefault();
        const startPercent: number = _.toInteger(event.currentTarget.getAttribute('data-percent'));

        this.setState({ startPercent, active: false });
    }

    handlePult: HandlePult = (event) => {
        event.preventDefault();
        const operation: string = event.currentTarget.getAttribute('data-operation');
        const { speed } = this.state;

        switch (operation) {
            case OperationEnum.Slower:
                this.setState({ speed: speed - 1 });
                break;
            case OperationEnum.Pause:
                this.setState({ active: false });
                break;
            case OperationEnum.Play:
                this.setState({ active: true });
                break;
            case OperationEnum.Faster:
                this.setState({ speed: speed + 1 });
                break;
            default:
                break;
        }
    }

    handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void = (event) => {
        event.preventDefault();
        // const { fieldSize, startPercent } = this.state; HW 30.04.2020
        const { fieldSize } = this.state;

        this.setState({
            // data: this.createData(fieldSize, startPercent), HW 30.04.2020
            data: this.createData(fieldSize),
            active: false,

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
                    <Button onClick={this.handleReset}>Остановить/сбросить</Button>
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
