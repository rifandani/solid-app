import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { screen } from '@solidjs/testing-library';
import NotFoundPage from './NotFound.page';

describe('NotFoundPage', () => {
  it('should render properly', () => {
    const view = renderProviders(() => <Route path="/" component={NotFoundPage} />);
    expect(() => view).not.toThrow();
  });

  it('should render contents correctly', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={NotFoundPage} />);
    const heading: HTMLHeadingElement = screen.getByText(/404: not found/i);
    const paragraph: HTMLParagraphElement = screen.getByText(/It's gone/i);
    const anchor: HTMLAnchorElement = screen.getByRole('link');

    // ASSERT
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(anchor).toBeInTheDocument();
  });
});
