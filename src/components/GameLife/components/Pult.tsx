import React from 'react';
import { Button } from './components/Button';
import { OperationEnum, SpeedEnum } from '@shared/enums';

type Speed = OperationEnum.Slower | OperationEnum.Pause | OperationEnum.Play | OperationEnum.Faster;
export type HandlePult = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface PultProps {
    speed: Speed;
    active: boolean;
    handlePult: HandlePult;
}

export const Pult:React.FC<PultProps> = ({speed, active, handlePult}) => (
    <>
        <Button data-operation={OperationEnum.Slower}
                disabled={speed === SpeedEnum.Small}
                onClick={handlePult}
        >
            {'<'}
        </Button>
        <Button data-operation={OperationEnum.Pause}
                disabled={!active}
                onClick={handlePult}
        >
            Pause
        </Button>
        <Button data-operation={OperationEnum.Play}
                disabled={active}
                onClick={handlePult}
        >
            Play
        </Button>
        <Button data-operation={OperationEnum.Faster} 
                disabled={speed === SpeedEnum.Big}
                onClick={handlePult}
        >
            {'>'}
        </Button>
    </>
);