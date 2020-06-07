import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchLessonSeventeenData, lessonSeventeenLoadSuccess, lessonSeventeenLoadFaild, ResponseInterface } from './asyncFlow';
import { RootState } from '../../index';

interface LessonSeventeenState {
    fetchLessonSeventeenData: Function,
    lessonSeventeenLoadSuccess: Function,
    lessonSeventeenLoadFaild: Function,
    data: any,
    error: any,
    isLoading: boolean
}

export const LessonSeventeen: React.FC<LessonSeventeenState> = ({
    isLoading,
    data,
    error,
    fetchLessonSeventeenData,
    lessonSeventeenLoadSuccess,
    lessonSeventeenLoadFaild
}) => {
    useEffect(() => {
        fetchLessonSeventeenData()
            .then((response: ResponseInterface) => lessonSeventeenLoadSuccess(response))
            .catch((error: any) => lessonSeventeenLoadFaild(error.toString()));
    }, []);
    
    return (
        <div>
            {isLoading && 'isLoading...'}
            {!isLoading && data && JSON.stringify(data)}
            {!isLoading && error && JSON.stringify(error)}
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        data: state.lessonSeventeen.data,
        isLoading: state.lessonSeventeen.isLoading,
        error: state.lessonSeventeen.error
    };
};

const mapDispatchToProps = { fetchLessonSeventeenData, lessonSeventeenLoadSuccess, lessonSeventeenLoadFaild };

export const LessonSeventeenConnector = connect(mapStateToProps, mapDispatchToProps)(LessonSeventeen);
