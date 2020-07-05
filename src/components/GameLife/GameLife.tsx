import React from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';

import { FieldSizeEnum, StartPercentEnum, AgeEnum, OperationEnum } from '@shared/enums';

import { Cell, CellInterface } from './components/Cell';
import { BlockSize, HandleFieldSize } from './components/BlockSize';
import { BlockStartPercent, HandleStartPercent } from './components/BlockStartPercent';
import { Pult, HandlePult } from './components/Pult';
import { Button } from './components/components/Button';

import { GameLifeProps } from './GameLifeInterfaces';
import {
    calculateData,
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
    handleFieldSize: HandleFieldSize = (event) => {
        const fieldSize: number = parseInt(event.currentTarget.getAttribute('data-size'));

        this.props.updateActive(false);
        this.props.updateFieldSize(fieldSize);
        this.props.calculateData({fieldSize, startPercent: this.props.startPercent });
    }

    handleStartPercent: HandleStartPercent = (event) => {
        const startPercent: number = parseInt(event.currentTarget.getAttribute('data-percent'));
        
        this.props.updateActive(false);
        this.props.updateStartPercent(startPercent);
        this.props.calculateData({fieldSize: this.props.fieldSize, startPercent});
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
        const { calculateData, updateActive, updateStartPercent, updateFieldSize } = this.props;
        
        updateActive(false);
        updateFieldSize(FieldSizeEnum.Small);
        updateStartPercent(StartPercentEnum.Medium);
        
        calculateData({fieldSize: FieldSizeEnum.Small, startPercent: StartPercentEnum.Medium});
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
        this.props.calculateData({fieldSize: FieldSizeEnum.Small, startPercent: StartPercentEnum.Medium});
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
    calculateData,
    updateFieldSize,
    updateStartPercent,
    updateSpeed,
    updateActive
};

export const GameLifeContainer = connect(mapStateToProps, mapDispatchToProps)(GameLife);
