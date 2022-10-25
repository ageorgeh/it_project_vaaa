/* eslint-disable no-unused-vars */
import React from 'react'
import { render, screen } from '@testing-library/react'
import BookPane from './BookPane'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

const shelves = [
  { shelf: 'All Books' },
  { shelf: 'Testing' }
]

useAuthState.mockReturnValue([false, false])

test.each(shelves)(
  'Check BookPane has the current shelf: %s',
  (shelf) => {
    render(
      <BrowserRouter>
      <BookPane
            shelves={[]}
            currShelf={shelf.shelf}
            currShelfName={shelf.shelf}
            books={[]}
            />
      </BrowserRouter>
    )
    const linkDom = screen.getByText(shelf.shelf)
    expect(linkDom).not.toBeNull()
  }
)
