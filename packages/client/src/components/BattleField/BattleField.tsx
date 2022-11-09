import { IconButton } from '@mui/material';
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandFist, faHandPaper, faHandScissors, faArrowRightArrowLeft, faEquals, faA, faGreaterThan, faLessThan,
  } from '@fortawesome/free-solid-svg-icons';

import { CSSTransition } from 'react-transition-group';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUserStats } from '../../store/slices/UserSlice';
import { updateStatsAction } from '../../store/saga/SagsActions';

import './BattleField.scss';

export enum UserMove {
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
  const [userMove, setUserMove] = useState(-1);
  const [computerMove, setComputerMove] = useState(-1);
  const [makeMove, setMakeMove] = useState(false);
  const [whoWins, setWhoWins] = useState(-1);

  const [counter, setCounter] = useState(-1);

  const computerTransitionRef = useRef(null);
  const userTransitionRef = useRef(null);

  const userStats = useAppSelector(selectUserStats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialLoad || counter < 0) {
      initialLoad = false;
      return;
    }

    if (counter === 0) {
      setMakeMove(true);
      whoIsTheWinner();
      return;
    }

    const timeoutId = setTimeout(() => {
      setCounter((prev) => (prev -= 1));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [counter]);

  const onActionClick = (evt: BaseSyntheticEvent) => {
    setMakeMove(false);
    setWhoWins(-1);
    setCounter(1);
    
    setUserMove(Number(UserMove[evt.currentTarget.id]));
    setComputerMove(getRandomValue());
  };

  const whoIsTheWinner = () => {
    const winner = (3 + userMove - computerMove) % 3;
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

  const chooseAction = (move: number) => {
    if(!makeMove) {
      return;
    }

    return move === 0 ? (  
      <FontAwesomeIcon className="player--move" icon={faHandFist} size="10x" color='#1BEFDB' />
    ) : move === 1 ? (
      <FontAwesomeIcon className="player--move" icon={faHand} size="10x" color='#A7D32B' />
    ) : move === 2 ? (
      <FontAwesomeIcon className="player--move" icon={faHandScissors} size="10x" color='#EF1B3A' rotation={90} />
    ) : null;
  };

  const moveResultIcon = () => {
    switch(whoWins) {
      case 0:
        return faEquals
      case 1:
        return faLessThan;
      case 2:
          return faGreaterThan;
      default:
        return faArrowRightArrowLeft;
    }
  }

  const userVictoryClasses = whoWins === 1 ? 'win' : whoWins === 2 ? 'loss' : 'draw';
  const computerVictoryClasses = whoWins === 2 ? 'win' : whoWins === 1 ? 'loss' : 'draw';
  const getRandomValue = () => {
    return Math.floor(Math.random() * 3);
  };


  return (
    <>
      <div className="game-field">
        <div className="players">
          <div className={`computer--move ${computerVictoryClasses}` }>
            <CSSTransition nodeRef={computerTransitionRef} 
              in={makeMove} 
              timeout={2000} 
              classNames="transition--move">
                <span ref={computerTransitionRef}>{chooseAction(computerMove)}</span>
            </CSSTransition>
          </div>
          
          <div className='result'>
            <FontAwesomeIcon className='result__icon' size="5x" icon={moveResultIcon()} />
          </div>

          <div className="user">
              <div className={`user--move ${userVictoryClasses}`}>
                <CSSTransition 
                  nodeRef={userTransitionRef} 
                  in={makeMove} 
                  timeout={2000} 
                  classNames="transition--move">
                  <span ref={userTransitionRef}>{chooseAction(userMove)}</span>
                </CSSTransition>
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
