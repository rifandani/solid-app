import { Route } from '@solidjs/router';
import { screen } from '@solidjs/testing-library';
import { renderProviders } from '../../../shared/utils/test.util';
import HomePage from './Home.page';

describe('HomePage', () => {
  it('should render correctly', () => {
    const result = renderProviders(() => <Route path="/" component={HomePage} />);
    expect(() => result).not.toThrow();
  });

  it('should render text correctly', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={HomePage} />);
    const heading: HTMLHeadingElement = screen.getByRole('heading', { level: 1 });

    // ASSERT
    expect(heading).toBeInTheDocument();
  });
});
