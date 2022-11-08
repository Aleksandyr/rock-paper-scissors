import { IconButton } from '@mui/material';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandFist, faHandPaper, faHandScissors, faArrowRightArrowLeft 
  } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUserStats } from '../../store/slices/UserSlice';
import { updateStatsAction } from '../../store/saga/SagsActions';

import './BattleField.scss';

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
    setWhoWins(0);
    setCounter(1);
    setMessage('');
  };

  const whoIsTheWinner = () => {
    const winner = (3 + userChoice - computerChoice) % 3;
    const message = winner === 1 ? 'You won' : winner === 2 ? 'You lost' : 'Draws'
    setMessage(message);
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
        <FontAwesomeIcon className="player--choice" icon={faHandFist} size="10x" color='#1BEFDB' />
    ) : choice === 1 ? (
      <FontAwesomeIcon className="player--choice" icon={faHand} size="10x" color='#A7D32B' />
    ) : choice === 2 ? (
      <FontAwesomeIcon className="player--choice" icon={faHandScissors} size="10x" color='#EF1B3A' rotation={90} />
    ) : null;
  };

  const youWonClass = whoWins === 1 ? 'win' : whoWins === 2 ? 'lose' : null;
  const getRandomValue = () => {
    return Math.floor(Math.random() * 3);
  };

  return (
    <>
      <div className="game-field">
        <p className={`battle__info ${youWonClass}`}>{message}</p>
        <div className="players">
          <div className={`computer--choice ${whoWins === 2 ? 'win' : whoWins === 1 ? 'lose' : null}` }>
              {showEndResult && chooseAction(computerChoice)}
          </div>
          <div className='arrows'>
            <FontAwesomeIcon size="5x" icon={faArrowRightArrowLeft} />
          </div>
          <div className="user">
            <div className={`user--choice ${youWonClass}`}>
              {showEndResult && chooseAction(userChoice)}
            </div>
            <div className="user__actions">
              <IconButton
                color="primary"
                size="large"
                onClick={onActionClick}
                className="icon-button"
                data-testid="rock"
                id="rock"
              >
                <FontAwesomeIcon icon={faHandFist} size="lg" color='#1BEFDB' />
              </IconButton>
              <IconButton color="primary" size="large" 
                className="icon-button" onClick={onActionClick} id="paper">
                <FontAwesomeIcon icon={faHandPaper} size="lg" color='#A7D32B' />
              </IconButton>
              <IconButton color="primary" size="large" 
                className="icon-button" onClick={onActionClick} id="scissors">
                <FontAwesomeIcon icon={faHandScissors} size="lg" color='#EF1B3A' rotation={90} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BattleField;
