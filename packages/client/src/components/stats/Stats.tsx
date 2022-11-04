import React from 'react';

import StatsItem from './statsItem/StatsItem';

import './Stats.scss';

const Stats = () => {
    return (
        <div className="stats">
            <StatsItem text={'Wins'} statsNum={0} />
            <StatsItem text='Losses' statsNum={0} />
            <StatsItem text='Ties' statsNum={0} />
        </div>
    )
}

export default Stats;