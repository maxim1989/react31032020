import { createAction, createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { FieldSizeEnum, StartPercentEnum, SpeedEnum } from '@shared/enums';

import { GameLifeProps, FieldSize, StartPercent, Speed } from '../GameLifeInterfaces';

import { RootState } from '../../..';

interface CalculateDataInterface {
    fieldSize: FieldSize,
    startPercent: StartPercent
}

export const updateData = createAction<GameLifeProps>('UPDATE_DATA');
export const updateFieldSize = createAction<FieldSize>('UPDATE_FIELD_SIZE');
export const updateStartPercent = createAction<StartPercent>('UPDATE_START_PERCENT');
export const updateSpeed = createAction<Speed>('UPDATE_SPEED');
export const updateActive = createAction<true | false>('UPDATE_ACTIVE');
export const calculateData = createAction<CalculateDataInterface>('CALCULATE_DATA');

export const selectData = (state: RootState) => state.gameLife.data;
export const selectFieldSize = (state: RootState) => state.gameLife.fieldSize;
export const selectStartPercent = (state: RootState) => state.gameLife.startPercent;
export const selectSpeed = (state: RootState) => state.gameLife.speed;
export const selectActive = (state: RootState) => state.gameLife.active;

export const data = createReducer([], {
    [updateData.type]: (_state, action) => action.payload
});
export const fieldSize = createReducer(FieldSizeEnum.Small, {
    [updateFieldSize.type]: (_state, action) => action.payload
});
export const startPercent = createReducer(StartPercentEnum.Medium, {
    [updateStartPercent.type]: (_state, action) => action.payload
});
export const speed = createReducer(SpeedEnum.Medium, {
    [updateSpeed.type]: (_state, action) => action.payload
});
export const active = createReducer(false, {
    [updateActive.type]: (_state, action) => action.payload
});

export default combineReducers({
    data,
    fieldSize,
    startPercent,
    speed,
    active
});
