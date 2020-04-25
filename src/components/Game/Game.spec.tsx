import React from 'react';
import { shallow } from 'enzyme';

import { Game, GameState, GameProps } from './Game';

class Instance extends React.Component<GameProps, GameState> {
    createData() {
        return 'createData';
    }

    randomInteger(min: number, max: number) {
        return 'randomInteger';
    }
}

describe('Тестирование модуля Game.tsx:', () => {
    it('createData:', () => {
        const wrapper = shallow<Instance>(<Game />);
        const instance = wrapper.instance();
        const result = instance.createData();

        expect(result).toEqual([                                
            { position: 0, content: null, x: 0, y: 0 },
            { position: 1, content: null, x: 0, y: 0 },
            { position: 2, content: null, x: 0, y: 0 },
            { position: 3, content: null, x: 0, y: 0 },
            { position: 4, content: null, x: 0, y: 0 },
            { position: 5, content: null, x: 0, y: 0 },
            { position: 6, content: null, x: 0, y: 0 },
            { position: 7, content: null, x: 0, y: 0 },
            { position: 8, content: null, x: 0, y: 0 } 
        ]);
    });

    it('randomInteger:', () => {
        const wrapper = shallow<Instance>(<Game />);
        const instance = wrapper.instance()

        expect(instance.randomInteger(1, 10)).toBeGreaterThan(0);
        expect(instance.randomInteger(1, 10)).toBeLessThan(11);
        expect(instance.randomInteger(1, 10)).toBeGreaterThan(0);
        expect(instance.randomInteger(1, 10)).toBeLessThan(11);
        expect(instance.randomInteger(1, 10)).toBeGreaterThan(0);
        expect(instance.randomInteger(1, 10)).toBeLessThan(11);
        expect(instance.randomInteger(1, 10)).toBeGreaterThan(0);
        expect(instance.randomInteger(1, 10)).toBeLessThan(11);
        expect(instance.randomInteger(1, 10)).toBeGreaterThan(0);
        expect(instance.randomInteger(1, 10)).toBeLessThan(11);
        expect(instance.randomInteger(1, 10)).toBeGreaterThan(0);
        expect(instance.randomInteger(1, 10)).toBeLessThan(11);
    });
});
