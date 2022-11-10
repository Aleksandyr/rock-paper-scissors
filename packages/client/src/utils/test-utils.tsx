import { PreloadedState, Store } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { RootState, setupStore } from '../store/store';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: Store;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const clickOnButton = (container: HTMLElement, button: string) => {
  const buttonElem = container.querySelector(`#${button}`);
  userEvent.click(buttonElem);
};
