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
        const state: ItemInterface[] = [];

        for (let i: number = 0; i < 9; i++) {
            state.push({
                position: i,
                content: null
            });
        }

        return state;
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
                    content: step % 2 ? ContentEnum.Cross : ContentEnum.Circle
                };
            }

            return item;
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
                {data.map(({ content, position }) =>
                    <Item key={position}
                          content={content}
                          position={position}
                          handleClick={this.onItemClick}/>)}
            </div>
        );
    }
}
