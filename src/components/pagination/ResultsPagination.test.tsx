import renderer from 'react-test-renderer';
import ResultsPagination from './ResultsPagination';

describe('ResultsPagination', () => {
  test.each([1, 2, 3, 4, 5, 6])('renders correctly for page %i', (page) => {
    const component = renderer.create(
      <ResultsPagination activePage={page} numberOfPages={6} setActivePage={jest.fn()} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
