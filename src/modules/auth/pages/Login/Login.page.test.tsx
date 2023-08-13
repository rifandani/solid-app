import { Route } from '@solidjs/router';
import { screen } from '@solidjs/testing-library';
import { renderProviders } from '../../../shared/utils/test.util';
import LoginPage from './Login.page';

describe('LoginPage', () => {
  it('should render properly', () => {
    const result = renderProviders(() => <Route path="/" component={LoginPage} />);
    expect(() => result).not.toThrow();
  });

  it('should render content roles correctly', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={LoginPage} />);
    const linkHome: HTMLAnchorElement = screen.getByRole('link', { name: /home/i });
    const linkRegister: HTMLAnchorElement = screen.getByRole('link', { name: /register/i });
    const imgCover: HTMLImageElement = screen.getByRole('img', { name: /cover/i });

    // ASSERT
    expect(linkHome).toBeInTheDocument();
    expect(linkRegister).toBeInTheDocument();
    expect(imgCover).toBeInTheDocument();
  });
});
