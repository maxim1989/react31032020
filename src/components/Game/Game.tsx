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
            data: this.fillState(),
            step: 1
        };
    }

    fillState: () => ItemInterface[] = () => {
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

        this.setState({
            data: data.map((item) => {
                const {content, position} = item;

                if (position === currentPosition && !content) {
                    this.setState({step: step + 1});

                    return step % 2 === 0 ?
                        {...item, content: ContentEnum.Circle} :
                        {...item, content: ContentEnum.Cross};
                }

                return item;
            })
        });
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
