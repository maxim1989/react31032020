import React from 'react';
import { css, SerializedStyles } from '@emotion/core';

export enum ContentEnum {
    Circle=1,
    Cross
}

const wrapperStyle = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120px',
    height: '120px',
    cursor: 'pointer',
    '&:nth-child(odd)': {
        backgroundColor: '#c5dcde'
    },
    '&:nth-child(even)': {
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
}

interface ItemProps extends ItemInterface {
    handleClick: TypeHandleClick;
}

export const Item: React.FC<ItemProps> = ({
    content,
    position,
    handleClick
}) => (
  <div onClick={handleClick}
       data-position={position}
       css={wrapperStyle}
  >
      {contentStyleDict[content] && <span css={contentStyleDict[content]}/>}
  </div>
);
