import React from 'react';
import { Redirect } from 'react-router-dom';

export const loginRequired = (WrappedComponent: React.ElementType, isAuthorised: boolean) => {
    const LoginRequiredHOC: React.FC<{}> = () => (
        <>
            {isAuthorised ? <WrappedComponent/> : <Redirect to="/login" />}
        </>
    );

    return LoginRequiredHOC;
};
