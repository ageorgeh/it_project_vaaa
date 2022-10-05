import React from 'react';
import renderer from 'react-test-renderer';
import Shelf from './Shelf';

it('displays shelf', () => {
  const component = renderer.create(
    <Shelf />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});