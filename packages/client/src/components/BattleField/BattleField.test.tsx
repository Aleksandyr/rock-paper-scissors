import React, { Component } from 'react';

import BattleField from './BattleField';
import { act, render, screen } from '@testing-library/react';

import { clickAndGetMove, renderWithProviders } from '../../utils/test-utils';

const userMoves = ['rock', 'paper', 'scissors'];

jest.mock('../utils/utils', () => ({
  getRandomValue: () => 1
}));

describe('BattleField', () => {
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
    expect(container.getElementsByClassName('game-field').item(0)).toHaveClass('game-field')
  });

  userMoves.forEach((userMove: string) => {
    test(`Should select ${userMove} when user click's ${userMove} button`, () => {
      const moveIcon = clickAndGetMove(container, userMove, 'user--move');
  
      act(() => {
        jest.runAllTimers();
      });
  
      expect(moveIcon.firstChild.firstChild).toHaveClass(`${userMove}__icon`);
    });
  });

  test(`Computer should choose paper when passed paper`, () => {
    const moveIcon = clickAndGetMove(container, 'paper', 'computer--move');

    act(() => {
      jest.runAllTimers();
    });
    
    expect(moveIcon.firstChild.firstChild).toHaveClass(`paper__icon`);
  });

  test(`User should win when scissors against paper`, () => {
      const result = clickAndGetMove(container, 'scissors', 'result');
  
      act(() => {
        jest.runAllTimers();
      });
      
      expect(result.firstChild).toHaveClass('win')
  });
});
