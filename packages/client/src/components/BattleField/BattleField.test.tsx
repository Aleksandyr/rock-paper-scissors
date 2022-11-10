import React from 'react';

import BattleField from './BattleField';
import { act } from '@testing-library/react';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';

import { clickOnButton, renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../store/store';
import { move } from '../../store/slices/UserSlice';
import {
  COMPUTER_MOVE_CLASS,
  LOSS,
  PAPER,
  PAPER_ICON_CLASS,
  RESULT_ICON_CLASS,
  ROCK,
  SCISSORS,
  USER_MOVE_CLASS,
  WIN
} from '../../utils/constants';
import Api from '../../store/api/Api';
import { IMove, IWinner } from '../../store/types';

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
      // act(() => {/
      clickOnButton(container, userMove);

      act(() => {
        jest.runAllTimers();
      });

      const moveIcon = container.getElementsByClassName(USER_MOVE_CLASS).item(0);
      expect(moveIcon.firstChild.firstChild).toHaveClass(`${userMove}__icon`);
    });
  });

});

describe('BattleField: Store', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  
  test('User should win when faced user:rock to computer:scissors', () => {
    const store = setupStore();
    const makeAMove: IWinner = {
      computerMove: 2,
      winner: 1
    };

    
    const container = renderWithProviders(<BattleField />, { store }).container;
    clickOnButton(container, ROCK);
    
    act(() => {
      store.dispatch(move(makeAMove));
    });

    act(() => {
      jest.runAllTimers();
    });

    const resultIcon = container.getElementsByClassName(RESULT_ICON_CLASS).item(0);
    expect(resultIcon).toHaveClass(WIN);
  });

  test('User should lose when faced user:paper to computer:scissors', () => {
    const store = setupStore();
    const makeAMove: IWinner = {
      computerMove: 2,
      winner: 2
    };

    
    const container = renderWithProviders(<BattleField />, { store }).container;
    clickOnButton(container, PAPER);
    
    act(() => {
      store.dispatch(move(makeAMove));
    });


    act(() => {
      jest.runAllTimers();
    });

    const resultIcon = container.getElementsByClassName(RESULT_ICON_CLASS).item(0);
    expect(resultIcon).toHaveClass(LOSS);
  });

  test(`Computer should choose paper when store sends paper`, () => {
    const store = setupStore();
    const makeAMove: IWinner = {
      computerMove: 1,
      winner: 1
    };
    
    const container = renderWithProviders(<BattleField />, { store }).container;
    const buttonElem = container.querySelector(`#${ROCK}`);
    userEvent.click(buttonElem);
    
    act(() => {
      store.dispatch(move(makeAMove));
    })
    
    act(() => {
      jest.runAllTimers();
    });
    
    const computerMoveIcon = container.getElementsByClassName(COMPUTER_MOVE_CLASS).item(0);
    expect(computerMoveIcon.firstChild.firstChild).toHaveClass(PAPER_ICON_CLASS);
  });
});

describe('BattleField Integration', () => {
  let container: HTMLElement;
  beforeAll(() => {
    jest.useFakeTimers();
    container = renderWithProviders(<BattleField />).container;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('Should lose if server sends you lost', async () => {
    sinon.stub(Api, 'move').callsFake((move: IMove) => {
      return Promise.resolve({
        computerMove: 1,
        winner: 2,
        stats: { draws: 0, wins: 0, losses: 1 }
      });
    });

    const buttonElem = container.querySelector(`#${ROCK}`);

    await userEvent.click(buttonElem);

    const resultIcon = container.getElementsByClassName(RESULT_ICON_CLASS).item(0);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(resultIcon).toHaveClass(LOSS);
  });
});
