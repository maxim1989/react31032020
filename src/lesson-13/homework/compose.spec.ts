import { compose } from './compose';

type FooNumber = (value: number) => number;

const inc: FooNumber = (value) => ++value;
const mul: FooNumber = (value) => value * 2;
const dec: FooNumber = (value) => --value;

test('compose', () => {
    expect(compose(dec, mul, inc)(1)).toBe(3);
});
