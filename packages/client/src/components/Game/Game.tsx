import React from 'react';
import { Divider } from '@mui/material';

import BattleField from '../BattleField/BattleField';
import Stats from '../Stats/Stats';

const Game = () => {
  return (
    <>
      <BattleField />
      <Divider className="divider" />
      <Stats />
    </>
  );
};

export default Game;
