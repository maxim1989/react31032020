// Задание 1
export type OriginalTeam = {
    size: number;
    name: string;
    league: string;
};

export type ExpectedTeam = {
    name: string;
    league: string;
    roster: number;
};

export const originalTeamToExpectedTeam = (
    originalTeam: OriginalTeam
): ExpectedTeam => {
    const { size, ...rest } = originalTeam;

    return { ...rest, name: 'New York Badgers', roster: 25 };
};

// Задание 2
type SomeArray = Readonly<Array<number | string>>;

export const originalArrayToExpectedArray = (originalArray: SomeArray): SomeArray => {
    const [, , a, b] = originalArray;

    return ['two', a, b, 5];
};

// Задание 3

export type Team = {
    name: string;
    captain: {
        name: string;
        age: number;
    };
};

export const originalTeamToExpectedTeam2 = (originalTeam: Team): Team => {
    return { ...originalTeam, captain: { ...originalTeam.captain, age: 28 } };
};