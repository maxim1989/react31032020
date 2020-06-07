import {
    lessonSeventeenIsLoading,
    lessonSeventeenLoadSuccess,
    lessonSeventeenLoadFaild,
    isLoading,
    data,
    error,
    ResponseInterface
} from './asyncFlow';

const serverData: ResponseInterface = {
    count: 1,
    next: null,
    previous: null,
    results: []
};

test('actionCreator lessonSeventeenIsLoading', () => {
    expect(lessonSeventeenIsLoading()).toEqual({
        type: 'LESSON_SEVENTEEN_ISLOADING'
    });
});

test('actionCreator lessonSeventeenLoadSuccess', () => {
    expect(lessonSeventeenLoadSuccess('success')).toEqual({
        type: 'LESSON_SEVENTEEN_LOAD_SUCCESS',
        payload: 'success'
    });
});

test('actionCreator lessonSeventeenLoadFaild', () => {
    expect(lessonSeventeenLoadFaild('error')).toEqual({
        type: 'LESSON_SEVENTEEN_LOAD_FAILD',
        payload: 'error'
    });
});

test('reducer isLoading', () => {
    expect(isLoading(false, lessonSeventeenIsLoading())).toBe(true);
    expect(isLoading(true, lessonSeventeenLoadSuccess(serverData))).toBe(false);
    expect(isLoading(true, lessonSeventeenLoadFaild({ error: 1 }))).toBe(false);
});

test('reducer error', () => {
    expect(error(null, lessonSeventeenLoadSuccess())).toBe(null);
    expect(error(null, lessonSeventeenLoadFaild({ error: 1 }))).toEqual({ error: 1 });
});

test('reducer data', () => {
    expect(data(null, lessonSeventeenLoadSuccess(serverData))).toEqual(serverData);
    expect(data(null, lessonSeventeenLoadFaild(serverData))).toBe(null);
});
