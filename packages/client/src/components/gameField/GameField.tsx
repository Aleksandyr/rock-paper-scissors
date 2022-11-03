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
    const [showEndResult, setShowEndResult] = useState(false);
    const [computerChoice, setComputerChoice] = useState(0);

    useEffect(() => {
        if (secondsCounter === 0 && userChoice > 0) {
            setShowEndResult(true);
            setComputerChoice(getRandomValue());
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
        setShowEndResult(false);
        setSecondsCounter(3);
    }

    const chooseAction = (choice: number) => {
        return choice === 1 ? <FistIcon /> : 
            choice === 2 ? <ScissorsIcon /> : 
            choice === 3 ? <PaperIcon /> : 
            null;
    } 

    const getRandomValue = () => {
            return Math.round(Math.random() * (3 - 1) + 1);
    }

    return (
        <div className="game-field">
            <p className="battle__info">Here is the message, who won/wost {secondsCounter}</p>
            <div className="players">
                <div className="computer">
                    {showEndResult ? chooseAction(computerChoice) : null}
                </div>
                <div className="user">
                    <div className="user__choice">
                        {showEndResult ? chooseAction(userChoice) : null}
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