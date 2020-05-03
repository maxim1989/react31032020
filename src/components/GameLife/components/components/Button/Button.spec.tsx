import React from 'react';
import { shallow } from 'enzyme';

import { Button } from './Button';

describe('Button:', () => {
  it('selected:', () => {
    const wrapper = shallow(<Button selected={true} />);

    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<button selected=\\"\\" class=\\"css-a4u649-Button e2argv40\\"></button>"'
    );
  });

  it('not selected:', () => {
    const wrapper = shallow(<Button selected={false} />);

    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<button class=\\"css-1gk51xe-Button e2argv40\\"></button>"'
    );
  });
});
