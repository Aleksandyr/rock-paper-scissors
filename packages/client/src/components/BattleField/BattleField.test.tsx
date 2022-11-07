import React from 'react';

import BattleField from './BattleField';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('BattleField', () => {
  let container: HTMLElement;
  beforeEach(() => {
    container = render(<BattleField />).container;
  });

  test('should have action test', () => {
    expect(container.getElementsByClassName('battle__info').item(0)?.textContent).toEqual(
      'Make a selection.'
    );
  });

  test('should make a move when click on btn action', async () => {
    await userEvent.click(screen.getByTestId('rock'));
    const userChoice = container.getElementsByClassName('user--choice').item(0);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(userChoice?.firstChild.id).toEqual('rock-icon');
  });
});
