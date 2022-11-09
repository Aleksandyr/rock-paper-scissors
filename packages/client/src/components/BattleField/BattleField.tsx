import { IconButton } from '@mui/material';
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHand,
  faHandFist,
  faHandPaper,
  faHandScissors,
  faArrowRightArrowLeft,
  faEquals,
  faGreaterThan,
  faLessThan
} from '@fortawesome/free-solid-svg-icons';

import { CSSTransition } from 'react-transition-group';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateStatsAction } from '../../store/saga/SagsActions';
// import { getRandomValue } from '../utils/utils';
import { IMove } from '../../store/types';

import './BattleField.scss';
import { selectComputerMove, selectWinner } from '../../store/slices/UserSlice';

export enum UserMove {
  rock = 0,
  paper = 1,
  scissors = 2
}

let initialLoad = true;

const BattleField = () => {
  const [userMove, setUserMove] = useState(-1);
  // const [computerMove, setComputerMove] = useState(-1);
  const [makeMove, setMakeMove] = useState(false);
  
  const [counter, setCounter] = useState(-1);
  const [disableActions, setDisableActions] = useState(false);
  
  const computerTransitionRef = useRef(null);
  const userTransitionRef = useRef(null);

  const winner = useAppSelector(selectWinner);
  const computerMove = useAppSelector(selectComputerMove);

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
    setCounter(1);
    setDisableActions(true);

    setUserMove(Number(UserMove[evt.currentTarget.id]));
  };

  const whoIsTheWinner = () => {
    setDisableActions(false);

    const move: IMove = {
      userMove
    };
    dispatch(updateStatsAction(move));
  };

  const chooseAction = (move: number) => {
    if (!makeMove) {
      return;
    }

    return move === 0 ? (
      <FontAwesomeIcon className="player--move rock__icon" icon={faHandFist} size="10x" />
    ) : move === 1 ? (
      <FontAwesomeIcon className="player--move paper__icon" icon={faHand} size="10x" />
    ) : move === 2 ? (
      <FontAwesomeIcon
        className="player--move scissors__icon"
        icon={faHandScissors}
        size="10x"
        rotation={90}
      />
    ) : null;
  };

  const moveResultIcon = () => {
    switch (winner) {
      case 0:
        return faEquals;
      case 1:
        return faLessThan;
      case 2:
        return faGreaterThan;
      default:
        return faArrowRightArrowLeft;
    }
  };

  const userVictoryClasses = winner === 1 ? 'win' : winner === 2 ? 'loss' : 'draw';
  const computerVictoryClasses = winner === 2 ? 'win' : winner === 1 ? 'loss' : 'draw';

  return (
    <>
      <div className="game-field">
        <div className="players">
          <div className={`computer--move ${computerVictoryClasses}`}>
            <CSSTransition
              nodeRef={computerTransitionRef}
              in={makeMove}
              timeout={2000}
              classNames="transition--move"
            >
              <span ref={computerTransitionRef}>{chooseAction(computerMove)}</span>
            </CSSTransition>
          </div>

          <div className="result">
            <FontAwesomeIcon className={`result__icon ${userVictoryClasses}`} size="5x" icon={moveResultIcon()} />
          </div>

          <div className="user">
            <div className={`user--move ${userVictoryClasses}`}>
              <CSSTransition
                nodeRef={userTransitionRef}
                in={makeMove}
                timeout={2000}
                classNames="transition--move"
              >
                <span ref={userTransitionRef}>{chooseAction(userMove)}</span>
              </CSSTransition>
            </div>
            <div className="user__actions">
              <IconButton
                color="primary"
                size="large"
                onClick={onActionClick}
                className="icon__button"
                data-testid="rock"
                id="rock"
                disabled={disableActions}
              >
                <FontAwesomeIcon className="rock__icon" icon={faHandFist} size="lg" />
              </IconButton>
              <IconButton
                color="primary"
                size="large"
                className="icon__button"
                onClick={onActionClick}
                id="paper"
                disabled={disableActions}
              >
                <FontAwesomeIcon className="paper__icon" icon={faHandPaper} size="lg" />
              </IconButton>
              <IconButton
                color="primary"
                size="large"
                className="icon__button"
                onClick={onActionClick}
                id="scissors"
                disabled={disableActions}
              >
                <FontAwesomeIcon
                  className="scissors__icon"
                  icon={faHandScissors}
                  size="lg"
                  rotation={90}
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BattleField;
