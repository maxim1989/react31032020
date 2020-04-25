import React from 'react';
import { shallow } from 'enzyme';

import { Game, GameState, GameProps } from './Game';

class Instance extends React.Component<GameProps, GameState> {
    createData() {
        return 'some string';
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
});
