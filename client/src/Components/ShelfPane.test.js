/* eslint-disable no-unused-vars */
import React from 'react'
import { render, screen } from '@testing-library/react'
import ShelfPane from './ShelfPane'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

const tests = [
  { shelves: [] }
]

useAuthState.mockReturnValue([false, false])

test.each(tests)(
  'Check ShelfPane has the shelves: %s',
  (test) => {
    render(
      <BrowserRouter>
      <ShelfPane onSelect={null} shelves={test.shelves} onShelfChange={null} />
      </BrowserRouter>
    )
    const linkDom = screen.getByText('Shelves')
    expect(linkDom).not.toBeNull()
  }
)
