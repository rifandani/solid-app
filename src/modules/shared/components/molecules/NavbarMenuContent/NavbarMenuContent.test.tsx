import { themes } from '@shared/constants/global.constant';
import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { fireEvent, screen } from '@solidjs/testing-library';
import { vi } from 'vitest';
import NavbarMenuContent from './NavbarMenuContent.molecule';

describe('NavBarMenuContent', () => {
  const mockModeBtn = vi.fn();

  it('should render properly', () => {
    const view = renderProviders(() => <Route path="/" component={NavbarMenuContent} />);
    expect(() => view).not.toThrow();
  });

  it('should render role contents correctly', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={NavbarMenuContent} />);
    const link: HTMLAnchorElement = screen.getByRole('link', { name: /todos/i });
    const themeBtn: HTMLButtonElement = screen.getByRole('button', { name: /themes-opener/i });
    const modesBtn: HTMLButtonElement[] = screen.getAllByRole('button', { name: /theme-/i });

    // ACT & ASSERT
    modesBtn[0].addEventListener('click', mockModeBtn);
    fireEvent.click(modesBtn[0]);
    expect(link).toBeInTheDocument();
    expect(themeBtn).toBeInTheDocument();
    expect(modesBtn).toHaveLength(themes.length);
    expect(mockModeBtn).toHaveBeenCalled();
  });
});
