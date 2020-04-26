type TypeGenerateBgColor = () => string;

export const generateRandomColor: TypeGenerateBgColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
