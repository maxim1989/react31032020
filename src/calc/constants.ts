import {
    sum,
    sub,
    mul,
    div,
    deg
} from './simpleOperations';

export type Priority = 1 | 2 | 3

interface SimpleOperationInfo {
    priority: Priority;
    action: Function;
}

export const simpleOperation: {[key: string]: SimpleOperationInfo} = {
    '+': {
        priority: 1,
        action: sum
    },
    '-': {
        priority: 1,
        action: sub
    },
    '*': {
        priority: 2,
        action: mul
    },
    '/': {
        priority: 2,
        action: div
    },
    '^': {
        priority: 3,
        action: deg
    }
};
