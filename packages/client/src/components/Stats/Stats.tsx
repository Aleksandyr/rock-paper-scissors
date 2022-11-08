import React from 'react';

import StatsItem from './StatsItem/StatsItem';

import './Stats.scss';
import { useAppSelector } from '../../store/hooks';
import { selectUserStats } from '../../store/slices/UserSlice';

const Stats = () => {
  const userStats = useAppSelector(selectUserStats);

  return (
    <div className="stats">
      <StatsItem text="Wins" statsNum={userStats.wins} />
      <StatsItem text="Losses" statsNum={userStats.losses} />
      <StatsItem text="Draws" statsNum={userStats.draws} />
    </div>
  );
};

export default Stats;
