import { generateRandomColor } from '@shared/utils';

describe('Тестирование модуля utils.ts:', () => {
    it('generateRandomColor:', () => {
        const result = generateRandomColor();
        
        expect(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(result)).toBe(true);
    });
});
