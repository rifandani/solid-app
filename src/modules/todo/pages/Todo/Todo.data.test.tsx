import { mockedCreateResource } from '@mocks/module.mock';
import routeDataTodo from './Todo.data';

describe('routeDataTodo', () => {
  it('should work correctly', () => {
    // ARRANGE
    mockedCreateResource.mockReturnValue([]);

    // ACT & ASSERT
    mockedCreateResource();
    expect(routeDataTodo).toBeDefined();
    expect(mockedCreateResource).toHaveBeenCalled();
    expect(mockedCreateResource()).toEqual([]);
  });
});
