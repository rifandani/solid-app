import { mockedCreateResource } from '../../../../mocks/module.mock';
import routeDataTodo from './Todo.data';

describe('routeDataTodo', () => {
  it('should work correctly', () => {
    // ARRANGE
    mockedCreateResource.mockReturnValue([]);

    // ACT
    mockedCreateResource();

    // ASSERT
    expect(routeDataTodo).toBeDefined();
    expect(mockedCreateResource).toHaveBeenCalled();
    expect(mockedCreateResource()).toEqual([]);
  });
});
