import { IconButton } from '@mui/material';
import React, { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react';

import RockIcon from '../Icons/RockIcon';
import PaperIcon from '../Icons/PaperIcon';
import ScissorsIcon from '../Icons/ScissorsIcon';

import './BattleField.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUserStats } from '../../store/slices/UserSlice';
import { updateStatsAction } from '../../store/saga/SagsActions';

export enum UserChoice {
  rock = 0,
  paper = 1,
  scissors = 2
}

export enum Winner {
  draw,
  user,
  computer
}

export class UserFight {}

let initialLoad = true;

const BattleField = () => {
  const [userChoice, setUserChoice] = useState(-1);
  const [computerChoice, setComputerChoice] = useState(-1);
  const [whoWins, setWhoWins] = useState(0);

  const [counter, setCounter] = useState(3);
  const [showEndResult, setShowEndResult] = useState(false);
  const [message, setMessage] = useState('Make a selection.');

  const userStats = useAppSelector(selectUserStats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialLoad || userChoice < 0) {
      initialLoad = false;
      return;
    }

    if (counter <= 0) {
      setComputerChoice(getRandomValue());
      return;
    }

    const timeoutId = setTimeout(() => {
      setCounter((prev) => (prev -= 1));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [userChoice, counter]);

  useEffect(() => {
    if (computerChoice < 0) {
      return;
    }

    whoIsTheWinner();
    setShowEndResult(true);
  }, [computerChoice]);

  const onActionClick = (evt: BaseSyntheticEvent) => {
    setUserChoice(Number(UserChoice[evt.currentTarget.id]));
    setShowEndResult(false);
    setComputerChoice(-1);
    setCounter(1);
    setMessage('');
  };

  const whoIsTheWinner = () => {
    const winner = (3 + userChoice - computerChoice) % 3;
    setMessage(Winner[winner]);
    setWhoWins(winner);

    const updatedStats = updateStats(winner);
    dispatch(updateStatsAction(updatedStats));
  };

  const updateStats = (winner: number) => {
    const statsCopy = { ...userStats };
    switch (winner) {
      case 0:
        statsCopy['draws'] += 1;
        break;
      case 1:
        statsCopy['wins'] += 1;
        break;
      case 2:
        statsCopy['losses'] += 1;
        break;
      default:
        return statsCopy;
    }

    return statsCopy;
  };

  const chooseAction = (choice: number) => {
    return choice === 0 ? (
      <RockIcon id="rock-icon" sx={{ fontSize: 200 }} />
    ) : choice === 1 ? (
      <PaperIcon id="paper-icon" sx={{ fontSize: 200 }} />
    ) : choice === 2 ? (
      <ScissorsIcon id="scissors-icon" sx={{ fontSize: 200 }} />
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
          <div className="computer--choice">{showEndResult && chooseAction(computerChoice)}</div>
          <div className="user">
            <div className="user--choice">{showEndResult && chooseAction(userChoice)}</div>
            <div className="user__actions">
              <IconButton
                color="primary"
                size="large"
                onClick={onActionClick}
                data-testid="rock"
                id="rock"
              >
                <RockIcon sx={{ fontSize: 40 }} id="rock-icon" />
              </IconButton>
              <IconButton color="primary" size="large" onClick={onActionClick} id="paper">
                <PaperIcon sx={{ fontSize: 40 }} id="paper-icon" />
              </IconButton>
              <IconButton color="primary" size="large" onClick={onActionClick} id="scissors">
                <ScissorsIcon sx={{ fontSize: 40 }} id="scissors-icon" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BattleField;
