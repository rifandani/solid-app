import { mockedCreateResource } from '../../mocks/module.mock';
import routeDataPost from './Post.data';

describe('routeDataPost', () => {
  it('should work correctly', () => {
    // ARRANGE
    mockedCreateResource.mockReturnValue([]);

    // ACT
    mockedCreateResource();

    // ASSERT
    expect(routeDataPost).toBeDefined();
    expect(mockedCreateResource).toHaveBeenCalled();
    expect(mockedCreateResource()).toEqual([]);
  });
});
