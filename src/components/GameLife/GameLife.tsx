import React from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';

import { FieldSizeEnum, StartPercentEnum, AgeEnum, SpeedEnum, OperationEnum } from '@shared/enums';
import { randomInteger } from '@shared/utils';

import { Cell, CellInterface } from './components/Cell';
import { BlockSize, HandleFieldSize } from './components/BlockSize';
import { BlockStartPercent, HandleStartPercent } from './components/BlockStartPercent';
import { Pult, HandlePult } from './components/Pult';
import { Button } from './components/components/Button';

import { GameLifeProps, StartPercent, RandomStoreType, FieldSize } from './GameLifeInterfaces';
import {
    updateData,
    updateFieldSize,
    updateStartPercent,
    updateSpeed,
    updateActive,
    selectData,
    selectFieldSize,
    selectStartPercent,
    selectSpeed,
    selectActive
} from './__data__/gameLife';

import { RootState } from '../..';

export class GameLife extends React.PureComponent<GameLifeProps> {
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
            const age = randomNumbers[position] ? AgeEnum.Small : AgeEnum.Empty;

            return {
                position,
                age 
            };
        });
    }

    handleFieldSize: HandleFieldSize = (event) => {
        const fieldSize: number = parseInt(event.currentTarget.getAttribute('data-size'));

        this.props.updateActive(false);
        this.props.updateFieldSize(fieldSize);
        this.props.updateData(this.createData(fieldSize, this.props.startPercent));
    }

    handleStartPercent: HandleStartPercent = (event) => {
        const startPercent: number = parseInt(event.currentTarget.getAttribute('data-percent'));
        
        this.props.updateActive(false);
        this.props.updateStartPercent(startPercent);
        this.props.updateData(this.createData(this.props.fieldSize, startPercent));
    }

    handlePult: HandlePult = (event) => {
        const operation: string = event.currentTarget.getAttribute('data-operation');
        const { speed, updateSpeed } = this.props;

        switch (operation) {
            case OperationEnum.Slower:
                updateSpeed(speed - 1);
                break;
            case OperationEnum.Pause:
                this.props.updateActive(false);
                break;
            case OperationEnum.Play:
                this.props.updateActive(true);
                break;
            case OperationEnum.Faster:
                updateSpeed(speed + 1);
                break;
            default:
                break;
        }
    }

    handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void = () => {
        const { updateData, updateActive, updateStartPercent, updateFieldSize } = this.props;
        
        updateActive(false);
        updateFieldSize(FieldSizeEnum.Small);
        updateStartPercent(StartPercentEnum.Medium);
        updateData(this.createData(FieldSizeEnum.Small, StartPercentEnum.Medium));
    }

    render() {
        const { data, fieldSize, startPercent, speed, active } = this.props;

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

    componentDidMount() {
        this.props.updateData(this.createData(FieldSizeEnum.Small, StartPercentEnum.Medium));
    }
};

const mapStateToProps = (state: RootState) => {
    return {
        data: selectData(state),
        fieldSize: selectFieldSize(state),
        startPercent: selectStartPercent(state),
        speed: selectSpeed(state),
        active: selectActive(state)
    };
};

const mapDispatchToProps = {
    updateData,
    updateFieldSize,
    updateStartPercent,
    updateSpeed,
    updateActive
};

export const GameLifeContainer = connect(mapStateToProps, mapDispatchToProps)(GameLife);
