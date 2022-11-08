import React from 'react';

import BattleField from './BattleField';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('BattleField', () => {
  let container: HTMLElement;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    container = render(<BattleField />).container;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should have action test', () => {
    expect(container.getElementsByClassName('battle__info').item(0)?.textContent).toEqual(
      'Make a selection.'
    );
  });

  test('should make a move when click on btn action', async () => {
    await userEvent.click(screen.getByTestId('rock'));
    const userChoice = container.getElementsByClassName('user--choice').item(0);
    
    act(() => {
      jest.runAllTimers()
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(userChoice?.firstChild.id).toEqual('rock-icon');
  });
});
