import React from 'react'
import Book from './Book'

class BookPane extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    const bookElems = []
    for (let i = 0; i < this.props.books.length; i++) {
      if (this.props.books[i].shelves.includes(this.props.currShelf)) {
        bookElems.push(
                    <Book
                        title={this.props.books[i].title}
                        author={this.props.books[i].author}
                        bookKey={i}
                        key={i}
                        onDelete={this.deleteBook}
                        image={this.props.books[i].image}
                    />
        )
      }
    }
    return (
            <>
            <div className="w-5/6 m-2 pl-5 rounded-lg">
                <div className="flex text-center items-center pb-2 border-b-2 mb-8 border-stone-500">
                    <span className="flex text-stone-100 ml-2 text-3xl">{this.props.currShelfName}</span>
                </div>
                <div className="flex flex-wrap">
                    <div className="relative w-48 h-64 place-content-center mb-1">
                        <button className="h-48 w-32 flex justify-center bg-emerald-700 rounded-lg items-center overflow-hidden hover:bg-emerald-600">
                            <div className="flex justify-center w-full">
                                <div className="w-12 h-12 text-stone-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-full h-full" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                    {bookElems}
                </div>
            </div>
            </>
    )
  }
}

export default BookPane

// deleteBook(bookKey) {
//     let currBooks = this.props.books;
//     currBooks.splice(bookKey,1);
//     this.setState({books: currBooks});
// }
