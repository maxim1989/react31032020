import React from 'react';
import { css } from '@emotion/core';
import _ from 'lodash';

import {
    ContentEnum,
    Item,
    ItemInterface,
    TypeHandleClick
} from './components/Item';

const style = css`
    width: 360px;
    display: flex;
    flex-wrap: wrap;
`;

export interface GameProps {}

export interface GameState {
    data: ItemInterface[];
    step: number;
}

export class Game extends React.PureComponent<GameProps, GameState> {
    state: GameState

    constructor(props: GameProps) {
        super(props);
        this.state = {
            data: this.createData(),
            step: 0
        };
    }

    createData: () => ItemInterface[] = () => {
        const data: ItemInterface[] = [];

        for (let i: number = 0; i < 9; i++) {
            data.push({
                position: i,
                content: null,
                x: 0,
                y: 0
            });
        }

        return data;
    }

    randomInteger: (min: number, max: number) => number = (min, max) => {
        const rand = min - 0.5 + Math.random() * (max - min + 1);

        return Math.round(rand);
    }

    onItemClick: TypeHandleClick = (event) => {
        const currentPosition: number = _.toInteger(event.currentTarget.getAttribute('data-position'));
        const { data, step } = this.state;
        let nextStep = step;
        const newData = data.map((item) => {
            const {content, position} = item;

            if (position === currentPosition && !content) {
                nextStep++;

                return {
                    ...item,
                    content: step % 2 ? ContentEnum.Circle : ContentEnum.Cross
                };
            }

            return { ...item, x: this.randomInteger(10, 100), y: this.randomInteger(10, 100)};
        });

        if (nextStep !== step) {
            this.setState({
                data: newData,
                step: nextStep
            });
        }
    }  

    render() {
        const { data } = this.state;

        return (
            <div css={style}>
                {data.map(({ content, position, x, y }) =>
                    <Item key={position}
                          content={content}
                          x={x}
                          y={y}
                          position={position}
                          handleClick={this.onItemClick}/>)}
            </div>
        );
    }
}
