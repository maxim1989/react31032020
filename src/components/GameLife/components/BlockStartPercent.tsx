import React from 'react';
import { Button } from './components/Button';
import { StartPercentEnum } from '@shared/enums';

type StartPercent = StartPercentEnum.Small | StartPercentEnum.Medium | StartPercentEnum.Big;
export type HandleStartPercent = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface BlockStartPercentProps {
    startPercent: StartPercent;
    handleStartPercent: HandleStartPercent;
}

export const BlockStartPercent: React.FC<BlockStartPercentProps> = ({startPercent, handleStartPercent}) => (
    <>
        <Button selected={startPercent === StartPercentEnum.Small}
                data-percent={StartPercentEnum.Small}
                onClick={handleStartPercent}
        >
            10%
        </Button>
        <Button selected={startPercent === StartPercentEnum.Medium}
                data-percent={StartPercentEnum.Medium}
                onClick={handleStartPercent}
        >
            30%
        </Button>
        <Button selected={startPercent === StartPercentEnum.Big}
                data-percent={StartPercentEnum.Big}
                onClick={handleStartPercent}
        >
            50%
        </Button>
    </>
);