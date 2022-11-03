import { IconButton } from '@mui/material';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';

import RockIcon from '../icons/RockIcon';
import PaperIcon from '../icons/PaperIcon';
import ScissorsIcon from '../icons/ScissorsIcon';

import './GameField.scss';

export enum UserChoice {
    rock = 0,
    paper = 1,
    scissors = 2
}

export enum Winner {
    tie = 0,
    user = 1,
    computer = 2,
}

export class UserFight {

}

let initialLoad = true;

const GameField = () => {
    const [userChoice, setUserChoice] = useState(-1);
    const [computerChoice, setComputerChoice] = useState(-1);
    const [secondsCounter, setSecondsCounter] = useState(3);
    const [showEndResult, setShowEndResult] = useState(false);
    const [winner, setWinner] = useState(0);

    useEffect(() => {
        if (secondsCounter === 0 && userChoice >= 0) {
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
    }, [secondsCounter])

    useEffect(() => {
        if(computerChoice < 0) {
            return;
        }

        console.log(computerChoice);
        whoIsTheWinner();
    }, [computerChoice])

    const onActionClick = (evt: BaseSyntheticEvent) => {
        setUserChoice(Number(UserChoice[evt.currentTarget.id]));
        setShowEndResult(false);
        setComputerChoice(-1);
        setSecondsCounter(3);
    }

    const whoIsTheWinner = () => {
        return setWinner((3 + userChoice - computerChoice) % 3);
    }

    const chooseAction = (choice: number) => {
        return choice === 0 ? <RockIcon /> : 
            choice === 1 ? <PaperIcon /> : 
            choice === 2 ? <ScissorsIcon /> : 
            null;
    } 

    const getRandomValue = () => {
            return Math.floor(Math.random() * 3);
    }

    return (
        <div className="game-field">
            <p className="battle__info">Here is the message, who wins: {Winner[winner]} {secondsCounter}</p>
            <div className="players">
                <div className="computer">
                    {showEndResult ? chooseAction(computerChoice) : null}
                </div>
                <div className="user">
                    <div className="user__choice">
                        {showEndResult ? chooseAction(userChoice) : null}
                    </div>
                    <div className="user__actions">
                        <IconButton color="primary" size='large' onClick={onActionClick} id='rock'>
                            <RockIcon sx={{ fontSize: 40}} id='rock' />
                        </IconButton>
                        <IconButton color="primary" size='large' onClick={onActionClick} id='paper'>
                            <PaperIcon sx={{ fontSize: 40}} id='paper' />
                        </IconButton>
                        <IconButton color="primary" size='large' onClick={onActionClick} id='scissors'>
                            <ScissorsIcon sx={{ fontSize: 40}} id='scissors' />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameField