import React from 'react';
import { css } from '@emotion/core';
import _ from 'lodash';

import {
    Item,
    ItemInterface,
    TypeHandleClick
} from './components/Item';
import {
    Info
} from './components/Info';
import { generateRandomColor } from '@shared/utils';
import { ContentEnum } from '@shared/enums';

export interface GameProps {}

export interface GameState {
    data: ItemInterface[];
    step: number;
    border: string;
}

export class Game extends React.PureComponent<GameProps, GameState> {
    state: GameState
    border: any

    constructor(props: GameProps) {
        super(props);
        this.state = {
            data: this.createData(),
            step: 0,
            border: '#fff'
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
        const { data, border } = this.state;

        return (
            <>
                <div css={css({
                    width: '360px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    border: `10px solid ${border}`
                })}>
                    {data.map(({ content, position, x, y }) =>
                        <Item key={position}
                            content={content}
                            x={x}
                            y={y}
                            position={position}
                            handleClick={this.onItemClick}/>)}
                </div>
                {data.map(({ content, position }) => 
                    <Info key={position}
                        position={position}
                        content={content}
                    />
                )}
            </>
        );
    }

    componentDidMount() {
        this.border = setInterval(() => {
            this.setState({
                border: generateRandomColor()
            });
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.border);
    }
}
