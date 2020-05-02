type TypeGenerateBgColor = () => string;

export const generateRandomColor: TypeGenerateBgColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

export const randomInteger: (min: number, max: number) => number = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
};