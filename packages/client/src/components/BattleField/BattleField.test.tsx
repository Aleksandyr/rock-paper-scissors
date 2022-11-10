import React, { Component } from 'react';

import BattleField from './BattleField';
import { act, render, screen } from '@testing-library/react';

import { clickAndGetMove, renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../store/store';
import { IWinner } from '../../store/types';
import { move } from '../../store/slices/UserSlice';
import {
  COMPUTER_MOVE_CLASS,
  PAPER,
  PAPER_ICON_CLASS,
  RESULT_ICON_CLASS,
  ROCK,
  SCISSORS,
  USER_MOVE_CLASS
} from '../../utils/constants';

const userMoves = [ROCK, PAPER, SCISSORS];

describe('BattleField: UI', () => {
  let container: HTMLElement;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    const component = renderWithProviders(<BattleField />);
    container = component.container;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should render', () => {
    expect(container.getElementsByClassName('game-field').item(0)).toHaveClass('game-field');
  });

  userMoves.forEach((userMove: string) => {
    test(`Should select ${userMove} when user click's ${userMove} button`, () => {
      const moveIcon = clickAndGetMove(container, userMove, USER_MOVE_CLASS);

      act(() => {
        jest.runAllTimers();
      });

      expect(moveIcon.firstChild.firstChild).toHaveClass(`${userMove}__icon`);
    });
  });

  describe('BattleField: Redux', () => {
    test('User should win when faced user:rock to computer:scissors', () => {
      const store = setupStore();
      const makeAMove: IWinner = {
        computerMove: 2,
        winner: 1
      };

      store.dispatch(move(makeAMove));

      const container = renderWithProviders(<BattleField />, { store }).container;
      const resultIcon = clickAndGetMove(container, ROCK, RESULT_ICON_CLASS);
      expect(resultIcon).toHaveClass('win');
    });

    test('User should lose when faced user:paper to computer:scissors', () => {
      const store = setupStore();
      const makeAMove: IWinner = {
        computerMove: 2,
        winner: 2
      };

      store.dispatch(move(makeAMove));

      const container = renderWithProviders(<BattleField />, { store }).container;
      const resultIcon = clickAndGetMove(container, PAPER, RESULT_ICON_CLASS);
      expect(resultIcon).toHaveClass('loss');
    });

    test(`Computer should choose paper when passed paper`, () => {
      const store = setupStore();
      const makeAMove: IWinner = {
        computerMove: 1,
        winner: 1
      };

      store.dispatch(move(makeAMove));

      const container = renderWithProviders(<BattleField />, { store }).container;
      const computerMoveIcon = clickAndGetMove(container, ROCK, COMPUTER_MOVE_CLASS);

      act(() => {
        jest.runAllTimers();
      });

      expect(computerMoveIcon.firstChild.firstChild).toHaveClass(PAPER_ICON_CLASS);
    });
  });
});

describe('BattleField Integration', () => {
  test('', () => {
    return;
  });
});
