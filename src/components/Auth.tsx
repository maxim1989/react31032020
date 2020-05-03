import React from 'react';

import { css } from '@emotion/core';

export type SubmitType = (event: React.FormEvent<HTMLFormElement>) => void;
export type ChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface AuthProps {
    user?: string;
    onSubmit: SubmitType;
    onChange: ChangeType;
};

export const Auth: React.FC<AuthProps> = ({
    user,
    onSubmit,
    onChange
}) => (
    <div css={css({
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    })}>
        <form onSubmit={onSubmit}>
            <label>
                <p css={css({
                  height: '100%',
                  width: '100%'
                })}>
                    Введите ваше имя
                </p>
                <input type="text" value={user} onChange={onChange} required/>
                <input type="submit"/>
            </label>
        </form>
    </div>
);
