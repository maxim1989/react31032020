export const compose = (...foos: Function[]): Function => (value: any): any => foos.reduceRight((acc, func) => func(acc), value);
