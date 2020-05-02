import React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { Button } from '../src/components/GameLife/components/components/Button';

export default {
  title: 'Button',
  decorators: [withKnobs]
};

export const ItemStory = () => {
  const selected = boolean('props.selected');
  const onClick = action('clicked');

  return <Button selected={selected} onClick={onClick}>Click on me</Button>;
};

ItemStory.story = {
  name: 'Button component',
  parameters: {
    notes: 'Домашняя работа от 24.04.2020, ветка homework_24042020.',
  }
};
