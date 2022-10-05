import React from 'react';
import renderer from 'react-test-renderer';
import ShelfPane from './ShelfPane';

it('does not change', () => {
  const component = renderer.create(
    <ShelfPane />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});