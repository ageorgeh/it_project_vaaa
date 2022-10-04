import React from 'react';
import renderer from 'react-test-renderer';
import Book from './Book';

it('does not change', () => {
  const component = renderer.create(
    <Book />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});