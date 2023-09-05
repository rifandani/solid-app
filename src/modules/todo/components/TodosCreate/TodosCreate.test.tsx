import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { ByRoleOptions, fireEvent, screen } from '@solidjs/testing-library';
import { vi } from 'vitest';
import TodosCreate from './TodosCreate.component';

describe('TodosCreate', () => {
  const todoValue = 'new todo';
  const mockCreateSubmitFn = vi.fn();

  it('should render properly', () => {
    const view = renderProviders(() => <Route path="/" component={TodosCreate} />);
    expect(() => view).not.toThrow();
  });

  it('should be able to type the inputs and submit the create todo form', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={TodosCreate} />);
    const createOptions: ByRoleOptions = { name: /add/i };
    const formCreate: HTMLFormElement = screen.getByRole('form');
    const inputTodo: HTMLInputElement = screen.getByRole('textbox', createOptions);
    const buttonSubmit: HTMLButtonElement = screen.getByRole('button', createOptions);
    formCreate.addEventListener('submit', mockCreateSubmitFn);

    // ACT & ASSERT
    expect(formCreate).toBeInTheDocument();
    expect(inputTodo).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    fireEvent.change(inputTodo, { target: { value: todoValue } });
    expect(inputTodo).toHaveValue(todoValue);
    fireEvent.click(buttonSubmit);
    expect(mockCreateSubmitFn).toHaveBeenCalled();
  });
});
