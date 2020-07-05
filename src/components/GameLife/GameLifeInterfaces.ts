import { FieldSizeEnum, StartPercentEnum, SpeedEnum } from '@shared/enums';

import { CellInterface } from './components/Cell';

export type FieldSize = FieldSizeEnum.Small | FieldSizeEnum.Medium | FieldSizeEnum.Big;
export type StartPercent = StartPercentEnum.Small | StartPercentEnum.Medium | StartPercentEnum.Big;
export type Speed = SpeedEnum.Small | SpeedEnum.Medium | SpeedEnum.Big;
export type RandomStoreType = { [key: number]: boolean };

export interface GameLifeProps {
    data: CellInterface[];
    fieldSize: FieldSize;
    startPercent: StartPercent,
    speed: Speed,
    active: boolean,
    calculateData: Function,
    updateFieldSize: Function,
    updateStartPercent: Function,
    updateSpeed: Function,
    updateActive: Function
};