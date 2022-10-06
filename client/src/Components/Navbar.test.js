import React from 'react'
import {render, screen} from '@testing-library/react'
import Navbar from './Navbar'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

const links = [
  { text: 'Home', location: '/home' },
  { text: 'My Books', location: '/mybooks'},
  { text: 'Friends', location: '/friends'},
  { text: 'Profile', location: '/profile'},
];

test.each(links)(
  "Check Navbar consist of %s link.",
  (link) => {
    render(
      <BrowserRouter>
      <Navbar />
      </BrowserRouter>
    );
    // check if the text is in the dom, else error
    const linkDom = screen.getByText(link.text)
    // assert and verify the link's property   
    expect(linkDom).toHaveAttribute("href", link.location)
  }
);
