import React from 'react';
import { shallow } from 'enzyme';

import { Game, GameState, GameProps } from './Game';

class Instance extends React.Component<GameProps, GameState> {
    fillState() {
        return 'some string';
    }
}

describe('Тестирование модуля Game.tsx:', () => {
    it('fillState:', () => {
        const wrapper = shallow<Instance>(<Game />);
        const instance = wrapper.instance();
        const result = instance.fillState();

        expect(result).toEqual([                                
            { position: 0, content: null },
            { position: 1, content: null },
            { position: 2, content: null },
            { position: 3, content: null },
            { position: 4, content: null },
            { position: 5, content: null },
            { position: 6, content: null },
            { position: 7, content: null },
            { position: 8, content: null } 
        ]);
    });
});
