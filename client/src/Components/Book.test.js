/* eslint-disable no-unused-vars */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Book from './Book'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

const books = [
  { title: 'Test title', author: 'Test author', bookID: 'testingID' }
]

useAuthState.mockReturnValue([false, false])

test.each(books)(
  'Check Book has the current book: %s',
  (book) => {
    render(
      <BrowserRouter>
      <Book
          title={'title' in book ? book.title : '' }
          author={'author' in book ? book.author : ''}
          bookKey={0}
          key={0}
          image={'image' in book ? book.image : process.env.REACT_APP_NO_IMAGE}
          bookID={book.bookID}
          shelves={['All Books', 'Test']}
          book={book}
      />
      </BrowserRouter>
    )
    const title = screen.getByText(book.title)
    expect(title).not.toBeNull()
    const author = screen.getByText(book.author)
    expect(author).not.toBeNull()
  }
)
