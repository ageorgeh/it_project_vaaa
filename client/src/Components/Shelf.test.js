/* eslint-disable no-unused-vars */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Shelf from './Shelf'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

const shelves = [
  { name: 'All Books', shelfID: 'All Books' },
  { name: 'Test', shelfID: 'Test' }
]

useAuthState.mockReturnValue([false, false])

test.each(shelves)(
  'Check Book has the current book: %s',
  (shelf) => {
    render(
      <BrowserRouter>
      <Shelf
        name={shelf.name}
        key={0}
        onSelect={null}
        shelfID={shelf.shelfID}
        onDeleteClose={null}
    />
      </BrowserRouter>
    )
    const title = screen.getByText(shelf.name)
    expect(title).not.toBeNull()
  }
)
