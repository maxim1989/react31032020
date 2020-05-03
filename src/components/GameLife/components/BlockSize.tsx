import React from 'react';
import { Button } from './components/Button';
import { FieldSizeEnum } from '@shared/enums';

type FieldSize = FieldSizeEnum.Small | FieldSizeEnum.Medium | FieldSizeEnum.Big;
export type HandleFieldSize = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface BlockSizeProps {
    fieldSize: FieldSize;
    handleFieldSize: HandleFieldSize;
}

export const BlockSize: React.FC<BlockSizeProps> = ({fieldSize, handleFieldSize}) => (
    <>
        <Button selected={fieldSize === FieldSizeEnum.Small}
                data-size={FieldSizeEnum.Small}
                onClick={handleFieldSize}
        >
            50x30
        </Button>
        <Button selected={fieldSize === FieldSizeEnum.Medium}
                data-size={FieldSizeEnum.Medium}
                onClick={handleFieldSize}
        >
            70x50
        </Button>
        <Button selected={fieldSize === FieldSizeEnum.Big}
                data-size={FieldSizeEnum.Big}
                onClick={handleFieldSize}
        >
            100x80
        </Button>
    </>
);