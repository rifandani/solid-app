import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { fireEvent, screen } from '@solidjs/testing-library';
import { vi } from 'vitest';
import TodosFilter from './TodosFilter.component';

describe('TodosFilter', () => {
  const validLimit = '10';
  const mockChangeFn = vi.fn();

  it('should render properly', () => {
    const view = renderProviders(() => <Route path="/" component={TodosFilter} />);
    expect(() => view).not.toThrow();
  });

  it('should render and change limit correctly', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={TodosFilter} />);
    const form: HTMLFormElement = screen.getByRole('form');
    const select: HTMLInputElement = screen.getByRole('combobox', { name: /filter/i });
    const options: HTMLOptionElement[] = screen.getAllByRole('option');
    select.addEventListener('select', mockChangeFn);

    // ACT & ASSERT
    expect(form).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(options).toHaveLength(4);
    fireEvent.select(select, { target: { value: validLimit } });
    expect(select).toHaveValue(validLimit);
    expect(mockChangeFn).toHaveBeenCalled();
  });
});
