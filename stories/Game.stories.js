import React from 'react';

import { Game } from '../src/components/Game';

export default {
  title: 'Game',
  component: Game
};

export const GameStory = () => <Game />;

GameStory.story = {
  name: 'GameStory component',
  parameters: {
    notes: 'Домашняя работа от 13.04.2020, ветка homework_13042020.',
  }
};
