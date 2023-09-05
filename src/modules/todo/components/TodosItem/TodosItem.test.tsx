import { mockTodo } from '@mocks/http/entities.http';
import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { fireEvent, screen } from '@solidjs/testing-library';
import { TodoSchema } from '@todo/api/todo.schema';
import TodosItem from './TodosItem.component';

describe('TodosItem', () => {
  const todo: TodoSchema = mockTodo();
  // const onDeleteTodo = vi.fn();
  const mockSubmit = vi.fn();
  const mockChangeTodo = vi.fn();
  const getItemSpy = vi.spyOn(localStorage, 'getItem');
  localStorage.getItem = vi.fn(() => JSON.stringify({ id: todo.id }));

  afterEach(() => {
    getItemSpy.mockClear(); // clear call history
    localStorage.clear();
  });

  it('should render properly', () => {
    const view = renderProviders(() => (
      <Route path="/" component={() => <TodosItem todo={todo} />} />
    ));
    expect(() => view).not.toThrow();
  });

  it('should render, check, and remove todo correctly', async () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={() => <TodosItem todo={todo} />} />);
    const form: HTMLFormElement = await screen.findByRole('form', { name: /todo/i });
    const inputId: HTMLInputElement = await screen.findByTestId('input-todoId');
    const inputTodo: HTMLInputElement = await screen.findByRole('checkbox', { name: /todo/i });
    const link: HTMLAnchorElement = await screen.findByRole('link', { name: /todo/i });
    form.addEventListener('submit', mockSubmit);
    inputTodo.addEventListener('change', mockChangeTodo);

    // ACT & ASSERT
    expect(form).toBeInTheDocument();
    expect(inputId).toBeInTheDocument();
    expect(inputId).toHaveValue(todo.id.toString());
    expect(inputTodo).toBeInTheDocument();
    expect(inputTodo).not.toBeChecked();
    expect(link).toBeInTheDocument();
    fireEvent.click(inputTodo);
    expect(mockChangeTodo).toHaveBeenCalled();
  });

  // FIXME: Unable to find role="button" -> mock storage doesn't work
  it.todo('should remove todo item correctly', async () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={() => <TodosItem todo={todo} />} />);
    const removeBtn: HTMLButtonElement = await screen.findByRole('button');

    // ACT & ASSERT
    expect(removeBtn).toBeInTheDocument();
    // await fireEvent.click(buttonRemove);
    // expect(mockSubmit).toHaveBeenCalled();
    // expect(onDeleteTodo).toHaveBeenCalled();
  });
});
