import React from 'react';

import './StatsItem.scss';

export interface IStatsItemProps {
    text: string;
    statsNum: number;
}

const StatsItem = (props: IStatsItemProps) => {
    return (
        <div className="stats__item">
            <span className="stats__item-text stats__title">{props.text}</span>
            <span className="stats__item-text stats__number">{props.statsNum}</span>
        </div>
    )
}

export default StatsItem;