import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import HelloWorld from '../src/components/HelloWorld';

export default {
  title: 'HelloWorld',
  decorators: [withKnobs]
};

export const HelloWorldStory = () => {
  const name = text('props.name');

  return <HelloWorld name={name || 'John Smith'} />;
};

HelloWorldStory.story = {
  name: 'HelloWorld test component',
  parameters: {
    notes: 'homework_09042020 Второе домашнее задание, компонент HelloWorld.',
  }
};
