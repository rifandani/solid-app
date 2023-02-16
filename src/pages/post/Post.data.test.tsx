import { mockedCreateResource } from '../../mocks/module.mock';
import { routeDataPost } from './Post.data';

describe('routeDataPost', () => {
  it('should work correctly', async () => {
    // ARRANGE
    mockedCreateResource.mockReturnValue('post');

    // ACT
    mockedCreateResource();

    // ASSERT
    expect(routeDataPost).toBeDefined();
    expect(mockedCreateResource).toHaveBeenCalled();
    expect(mockedCreateResource()).toEqual('post');
  });
});
