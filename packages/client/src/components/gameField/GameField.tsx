import { Divider, IconButton } from '@mui/material';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';

import RockIcon from '../icons/RockIcon';
import PaperIcon from '../icons/PaperIcon';
import ScissorsIcon from '../icons/ScissorsIcon';
import Stats from '../stats/Stats';

import './GameField.scss';

export enum UserChoice {
  rock = 0,
  paper = 1,
  scissors = 2
}

export enum Winner {
  tie = 0,
  user = 1,
  computer = 2
}

export class UserFight {}

let initialLoad = true;

const GameField = () => {
  const [userChoice, setUserChoice] = useState(-1);
  const [computerChoice, setComputerChoice] = useState(-1);
  const [winner, setWinner] = useState(0);

  const [secondsCounter, setSecondsCounter] = useState(3);
  const [showEndResult, setShowEndResult] = useState(false);
  const [message, setMessage] = useState('Make a selection.');

  useEffect(() => {
    if (userChoice >= 0) {
      setMessage(secondsCounter.toString());
    }

    if (secondsCounter === 0 && userChoice >= 0) {
      setShowEndResult(true);
      setComputerChoice(getRandomValue());
    }

    if (initialLoad || secondsCounter === 0) {
      initialLoad = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      setSecondsCounter((prev) => (prev -= 1));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [secondsCounter]);

  useEffect(() => {
    if (computerChoice < 0) {
      return;
    }

    whoIsTheWinner();
  }, [computerChoice]);

  const onActionClick = (evt: BaseSyntheticEvent) => {
    setUserChoice(Number(UserChoice[evt.currentTarget.id]));
    setShowEndResult(false);
    setComputerChoice(-1);
    setSecondsCounter(3);
  };

  const whoIsTheWinner = () => {
    const winner = (3 + userChoice - computerChoice) % 3;
    setMessage(Winner[winner]);
    return setWinner(winner);
  };

  const chooseAction = (choice: number) => {
    return choice === 0 ? (
      <RockIcon sx={{ fontSize: 200 }} />
    ) : choice === 1 ? (
      <PaperIcon sx={{ fontSize: 200 }} />
    ) : choice === 2 ? (
      <ScissorsIcon sx={{ fontSize: 200 }} />
    ) : null;
  };

  const getRandomValue = () => {
    return Math.floor(Math.random() * 3);
  };

  return (
    <>
      <div className="game-field">
        <p className="battle__info">{message}</p>
        <div className="players">
          <div className="computer--choice">
            {showEndResult ? chooseAction(computerChoice) : null}
          </div>
          <div className="user">
            <div className="user--choice">{showEndResult ? chooseAction(userChoice) : null}</div>
            <div className="user__actions">
              <IconButton color="primary" size="large" onClick={onActionClick} id="rock">
                <RockIcon sx={{ fontSize: 40 }} id="rock" />
              </IconButton>
              <IconButton color="primary" size="large" onClick={onActionClick} id="paper">
                <PaperIcon sx={{ fontSize: 40 }} id="paper" />
              </IconButton>
              <IconButton color="primary" size="large" onClick={onActionClick} id="scissors">
                <ScissorsIcon sx={{ fontSize: 40 }} id="scissors" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <Divider className="divider" />
      <Stats />
    </>
  );
};

export default GameField;
