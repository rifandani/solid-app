import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { screen } from '@solidjs/testing-library';
import HomePage from './Home.page';

describe('HomePage', () => {
  it('should render correctly', () => {
    const view = renderProviders(() => <Route path="/" component={HomePage} />);
    expect(() => view).not.toThrow();
  });

  it('should render text correctly', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={HomePage} />);
    const heading: HTMLHeadingElement = screen.getByRole('heading', { level: 1 });

    // ASSERT
    expect(heading).toBeInTheDocument();
  });
});
