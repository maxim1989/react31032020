import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';

import { Info } from '../src/components/Game/components/Info';

export default {
  title: 'Info',
  decorators: [withKnobs]
};

export const InfoStory = () => {
  const position = number('props.position');
  const content = number('props.content');

  return <Info position={position} content={content}/>;
};

InfoStory.story = {
  name: 'Info component',
  parameters: {
    notes: 'Компонент, чтобы сделать в нём didUpdate.',
  }
};
