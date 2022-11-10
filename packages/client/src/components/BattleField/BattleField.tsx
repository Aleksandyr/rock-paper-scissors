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
import { moveAction } from '../../store/saga/SagsActions';
import { IMove } from '../../store/types';

import './BattleField.scss';
import { clearUserMove, selectComputerMove, selectWinner } from '../../store/slices/UserSlice';
import {
  COMPUTER_MOVE_CLASS,
  DRAW,
  LOSS,
  PAPER,
  PAPER_ICON_CLASS,
  RESULT_ICON_CLASS,
  ROCK,
  ROCK_ICON_CLASS,
  SCISSORS,
  SCISSORS_ICON_CLASS,
  USER_MOVE_CLASS,
  WIN
} from '../../utils/constants';
import { clearStats } from '../../store/slices/StatsSlice';

export enum UserMove {
  rock = 0,
  paper = 1,
  scissors = 2
}

let initialLoad = true;

const BattleField = () => {
  const [userMove, setUserMove] = useState(-1);
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
    dispatch(clearUserMove())

    setUserMove(Number(UserMove[evt.currentTarget.id]));
  };

  const whoIsTheWinner = () => {
    setDisableActions(false);

    const move: IMove = {
      userMove
    };
    dispatch(moveAction(move));
  };

  const chooseAction = (move: number) => {
    if (!makeMove) {
      return;
    }

    return move === 0 ? (
      <FontAwesomeIcon className={`player--move ${ROCK_ICON_CLASS}`} icon={faHandFist} size="10x" />
    ) : move === 1 ? (
      <FontAwesomeIcon className={`player--move ${PAPER_ICON_CLASS}`} icon={faHand} size="10x" />
    ) : move === 2 ? (
      <FontAwesomeIcon
        className={`player--move ${SCISSORS_ICON_CLASS}`}
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

  const userVictoryClasses = winner === 1 ? WIN : winner === 2 ? LOSS : winner === 0 ? DRAW : '';
  const computerVictoryClasses =
    winner === 2 ? WIN : winner === 1 ? LOSS : winner === 0 ? DRAW : '';

  return (
    <>
      <div className="game-field">
        <div className="players">
          <div className={`${COMPUTER_MOVE_CLASS} ${computerVictoryClasses}`}>
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
            <FontAwesomeIcon
              className={`${RESULT_ICON_CLASS} ${userVictoryClasses}`}
              size="5x"
              icon={moveResultIcon()}
            />
          </div>

          <div className="user">
            <div className={`${USER_MOVE_CLASS} ${userVictoryClasses}`}>
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
                id={`${ROCK}`}
                disabled={disableActions}
              >
                <FontAwesomeIcon className={`${ROCK_ICON_CLASS}`} icon={faHandFist} size="lg" />
              </IconButton>
              <IconButton
                color="primary"
                size="large"
                className="icon__button"
                onClick={onActionClick}
                id={`${PAPER}`}
                disabled={disableActions}
              >
                <FontAwesomeIcon className={`${PAPER_ICON_CLASS}`} icon={faHandPaper} size="lg" />
              </IconButton>
              <IconButton
                color="primary"
                size="large"
                className="icon__button"
                onClick={onActionClick}
                id={`${SCISSORS}`}
                disabled={disableActions}
              >
                <FontAwesomeIcon
                  className={`${SCISSORS_ICON_CLASS}`}
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
