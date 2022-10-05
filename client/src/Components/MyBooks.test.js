import React from 'react';
import renderer from 'react-test-renderer';
import MyBooks from './MyBooks';

it('displays mybooks', () => {
  const component = renderer.create(
    <MyBooks />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});