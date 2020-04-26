import React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';

import { Item } from '../src/components/Game/components/Item';

export default {
  title: 'Item',
  decorators: [withKnobs]
};

export const ItemStory = () => {
  const position = number('props.position');
  const content = number('props.content');
  const x = number('props.x');
  const y = number('props.y');
  const handleClick = action('clicked');

  return <Item position={position} content={content} x={x} y={y} handleClick={handleClick}/>;
};

ItemStory.story = {
  name: 'Item component',
  parameters: {
    notes: 'Домашняя работа от 13.04.2020, ветка homework_13042020.',
  }
};
