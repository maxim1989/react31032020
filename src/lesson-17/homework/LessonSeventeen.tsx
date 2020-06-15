import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchLessonSeventeenData, lessonSeventeenLoadSuccess, lessonSeventeenLoadFaild, ResponseInterface } from './asyncFlow';
import { lessonSeventeenAnalyticsClick } from './probability';
import { RootState } from '../../index';

interface LessonSeventeenState {
    fetchLessonSeventeenData: Function,
    lessonSeventeenLoadSuccess: Function,
    lessonSeventeenLoadFaild: Function,
    lessonSeventeenAnalyticsClick: Function,
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
    lessonSeventeenLoadFaild,
    lessonSeventeenAnalyticsClick
}) => {
    useEffect(() => {
        fetchLessonSeventeenData()
            .then((response: ResponseInterface) => lessonSeventeenLoadSuccess(response))
            .catch((error: any) => lessonSeventeenLoadFaild(error.toString()));

        lessonSeventeenAnalyticsClick({ meta: { probability: 0 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 0.1 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 0.2 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 0.3 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 0.4 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 0.5 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 0.6 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 0.7 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 0.8 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 0.9 } });
        lessonSeventeenAnalyticsClick({ meta: { probability: 1 } });
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

const mapDispatchToProps = {
    fetchLessonSeventeenData,
    lessonSeventeenLoadSuccess,
    lessonSeventeenLoadFaild,
    lessonSeventeenAnalyticsClick
};

export const LessonSeventeenConnector = connect(mapStateToProps, mapDispatchToProps)(LessonSeventeen);
