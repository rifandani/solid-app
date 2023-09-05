import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { fireEvent, screen } from '@solidjs/testing-library';
import { vi } from 'vitest';
import HomeClock from './HomeClock.component';

describe('HomeClock', () => {
  const mockButtonFn = vi.fn();

  it('should render properly', () => {
    const view = renderProviders(() => <Route path="/" component={HomeClock} />);
    expect(() => view).not.toThrow();
  });

  // FIXME: TestingLibraryElementError: Unable to find an element by: [data-testid="home-clock-show"]
  it.todo('should render clock when toggle clock button clicked', async () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={HomeClock} />);
    const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-clock/i);

    // ACT & ASSERT
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(await screen.findByTestId('home-clock-show')).toBeInTheDocument();
  });

  // FIXME: figure out how to solve the randomness behavior
  it.todo('should shuffle buttons when sort button clicked', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={HomeClock} />);
    const buttonsBefore: HTMLButtonElement[] = screen.queryAllByTestId(/home-clock-button/i);
    const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-sort/i);

    // ACT & ASSERT
    fireEvent.click(button);
    const buttonsAfter: HTMLButtonElement[] = screen.queryAllByTestId(/home-clock-button/i);
    expect(buttonsBefore[0]).not.toHaveTextContent(buttonsAfter[0].textContent as string);
    expect(buttonsBefore[1]).not.toHaveTextContent(buttonsAfter[1].textContent as string);
    expect(buttonsBefore[2]).not.toHaveTextContent(buttonsAfter[2].textContent as string);
    expect(buttonsBefore[3]).not.toHaveTextContent(buttonsAfter[3].textContent as string);
  });

  it('should translate text when change language button clicked', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={HomeClock} />);
    const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-language/i);

    // ACT & ASSERT
    expect(button).toHaveTextContent(/change language/i);
    fireEvent.click(button);
    expect(button).toHaveTextContent(/ganti bahasa/i);
  });

  it('should call mocked navigate function when get started button clicked', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={HomeClock} />);
    const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-start/i);
    button.addEventListener('click', mockButtonFn);

    // ACT & ASSERT
    fireEvent.click(button);
    expect(mockButtonFn).toHaveBeenCalled();
  });
});
