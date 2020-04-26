import React, { useEffect, useState } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { generateRandomColor } from '@shared/utils';
import { ContentEnum } from '@shared/enums';

const wrapperStyle = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120px',
    height: '120px',
    cursor: 'pointer',
    '&:nth-of-type(n)': {
        backgroundColor: '#c5dcde'
    },
    '&:nth-of-type(2n)': {
        backgroundColor: '#f2d9d5'
    }
});

const circleStyle = css({
    borderRadius: '55px',
    height: '100px',
    width: '100px',
    border: '4px solid black'
});

const crossStyle = css({
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '100%',
    '&:before': {
        content: '" "',
        position: 'absolute',
        height: '100px',
        width: '4px',
        transform: 'rotate(45deg)',
        backgroundColor: 'black',
        top: '10%',
        left: '50%'
    },
    '&:after': {
        content: '" "',
        position: 'absolute',
        height: '100px',
        width: '4px',
        transform: 'rotate(-45deg)',
        backgroundColor: 'black',
        top: '10%',
        left: '50%'
    }
});

export const contentStyleDict: {[key: number]: SerializedStyles} = {
    [ContentEnum.Circle]: circleStyle,       
    [ContentEnum.Cross]: crossStyle
};

type content = ContentEnum.Circle | ContentEnum.Cross | null;
export type TypeHandleClick = (event: React.MouseEvent) => void;

export interface ItemInterface {
    position: number;
    content: content;
    x?: number;
    y?: number;
}

interface ItemProps extends ItemInterface {
    handleClick: TypeHandleClick;
}

export const Item: React.FC<ItemProps> = ({
    content,
    position,
    x=0,
    y=0,
    handleClick
}) => {
    const [bgColor, setBgColor] = useState('#000');
    const cssContent = contentStyleDict[content];

    useEffect(() => {
        setBgColor(generateRandomColor());
    }, [x, y]);
    
    return (
        <div onClick={handleClick}
            data-position={position}
            css={wrapperStyle}
        >
            {!cssContent && <div css={css({
                height: `${y}px`,
                width: `${x}px`,
                backgroundColor: bgColor,
                transitionProperty: 'width, height, background-color',
                transitionDuration: '0.5s, 0.5s, 2s',
                transitionTimingFunction: 'linear, linear, ease'
                })}/>}
            {cssContent && <span css={cssContent}/>}
        </div>
    );
};
