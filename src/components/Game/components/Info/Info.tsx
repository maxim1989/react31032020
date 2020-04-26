import React from 'react';
import { css } from '@emotion/core';

import { ContentEnum } from '@shared/enums';

interface InfoProps {
    position: number;
    content: number | null;
}
interface InfoState {
    bgColor: string;
}

export class Info extends React.PureComponent<InfoProps, InfoState> {
    state: InfoState = {
        bgColor: '#000'
    }

    render() {
        const { bgColor } = this.state;
        const { position, content } = this.props;

        return (
            <div css={css({
                backgroundColor: bgColor
            })}>
                { `Элемент в позиции ${position} содержит ${
                    !content && 'пустое значение'
                    || content === ContentEnum.Circle && 'нолик'
                    || content === ContentEnum.Cross && 'крестик'
                    || 'неизвестное значение'
                }` }
            </div>
        );
    }

    componentDidUpdate(prevProps: InfoProps) {
        if (prevProps.content !== this.props.content) {
            this.setState({bgColor: '#fff'});
        }
    }
}
