
import ShelfPane from './ShelfPane'
import BookPane from './BookPane'
import React from 'react'

class MyBooks extends React.Component {
  constructor (props) {
    super(props)
    this.selectShelf = this.selectShelf.bind(this)
    this.state = {
      currShelf: 0,
      shelves: ['All Books', 'Fiction', 'Non-Fiction', 'To-Read'],
      books: [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', shelves: [0, 1], image: 'img/books/gatsby.jpg' }
      ]
    }
  }

  selectShelf (shelfKey) {
    this.setState({
      currShelf: shelfKey,
      currShelfName: this.state.shelves[shelfKey]
    })
  }

  render () {
    return (
            <>
                <div className="flex relative bg-stone-900">
                    <ShelfPane onSelect={this.selectShelf} shelves={this.state.shelves} />
                    <BookPane
                      currShelf={this.state.currShelf}
                      currShelfName={this.state.shelves[this.state.currShelf]}
                      books={this.state.books}
                      />
                </div>
            </>
    )
  }
}

export default MyBooks
