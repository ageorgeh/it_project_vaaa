import React from 'react';
import renderer from 'react-test-renderer';
import BookPane from './BookPane';

it('displays bookpane', () => {
  const component = renderer.create(
    <BookPane />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});