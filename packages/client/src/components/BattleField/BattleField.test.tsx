import React from 'react';

import BattleField, { UserMove } from './BattleField';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';

const userMoves = ['rock', 'paper', 'scissors'];
describe('BattleField', () => {
  let container: HTMLElement;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    container = renderWithProviders(<BattleField />).container;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should render', () => {
    expect(container.getElementsByClassName('game-field').item(0)).toHaveClass('game-field')
  });

  userMoves.forEach(move => {
    test(`Should select ${move} when user click's ${move} button`, () => {
      const button = container.querySelector(`#${move}`);
      userEvent.click(button);
      const userMove = container.getElementsByClassName('user--move').item(0);
  
      act(() => {
        jest.runAllTimers();
      });
  
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(userMove.firstChild.firstChild).toHaveClass(`${move}__icon`);
    });
  })
});
