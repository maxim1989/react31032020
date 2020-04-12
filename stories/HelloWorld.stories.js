import React from 'react';

import HelloWorld from '../src/components/HelloWorld';

export default {
  title: 'HelloWorld',
  component: HelloWorld
};

export const HelloWorldStory = () => <HelloWorld name="John Smith"/>;

HelloWorldStory.story = {
  name: 'HelloWorld test component',
};
