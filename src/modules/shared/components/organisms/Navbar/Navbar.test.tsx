import { Route } from '@solidjs/router';
import { screen } from '@solidjs/testing-library';
import { renderProviders } from '../../../utils/test.util';
import Navbar from './Navbar.organism';

describe('Navbar', () => {
  it('should render properly', () => {
    const view = renderProviders(() => <Route path="/" component={Navbar} />);
    expect(() => view).not.toThrow();
  });

  it('should be able to type the inputs and submit the login form', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={Navbar} />);
    const link: HTMLAnchorElement = screen.getByRole('link', { name: /logo/i });
    const checkbox: HTMLInputElement = screen.getByRole('checkbox', { name: /drawer/i });

    // ASSERT
    expect(link).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });
});
