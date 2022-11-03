import { IconButton } from '@mui/material';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';

import FistIcon from '../icons/FistIcon';
import PaperIcon from '../icons/PaperIcon';
import ScissorsIcon from '../icons/ScissorsIcon';

import './GameField.scss';

export enum UserChoice {
    fist = 1,
    scissors = 2,
    paper = 3
}

let initialLoad = true;

const GameField = () => {
    const [userChoice, setUserChoice] = useState(0);
    const [secondsCounter, setSecondsCounter] = useState(3);
    const [showUserChoice, setShowUserChoice] = useState(false);

    useEffect(() => {
        console.log(userChoice);
        if (secondsCounter === 0 && userChoice > 0) {
            setShowUserChoice(true);
        }
        
        if(initialLoad || secondsCounter === 0) {
            initialLoad = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            setSecondsCounter(prev => prev -= 1);
        }, 1000)

        return () => clearTimeout(timeoutId);
    }, [userChoice, secondsCounter])

    const onActionClick = (evt: BaseSyntheticEvent) => {
        setUserChoice(Number(UserChoice[evt.target.id]));
        setShowUserChoice(false);
        setSecondsCounter(3);
    }

    const userChoiceIcon = userChoice === 1 ? <FistIcon /> : userChoice === 2 ? <ScissorsIcon /> : userChoice === 3 ? <PaperIcon /> : null;

    return (
        <div className="game-field">
            <p className="battle__info">Here is the message, who won/wost {secondsCounter}</p>
            <div className="players">
                <div className="computer">

                </div>
                <div className="user">
                    <div className="user__choice">
                        {showUserChoice ? userChoiceIcon : null}
                    </div>
                    <div className="user__actions">
                        <IconButton color="primary" size='large' onClick={onActionClick} id='fist'>
                            <FistIcon sx={{ fontSize: 40}} id='fist' />
                        </IconButton>
                        <IconButton color="primary" size='large' onClick={onActionClick} id='scissors'>
                            <ScissorsIcon sx={{ fontSize: 40}} id='scissors' />
                        </IconButton>
                        <IconButton color="primary" size='large' onClick={onActionClick} id='paper'>
                            <PaperIcon sx={{ fontSize: 40}} id='paper' />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameField