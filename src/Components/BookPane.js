import React from 'react';
import Book from './Book';

class BookPane extends React.Component {
    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.state = {
            books: [
                {title: "The Great Gatsby", author: "F. Scott Fitzgerald"},
                {title: "1984", author: "George Orwell"},
                {title: "Moby Dick", author: "Herman Melville"},
                {title: "The Catcher in the Rye", author: "J. D. Salinger"},
                {title: "The Great Gatsby", author: "F. Scott Fitzgerald"},
                {title: "1984", author: "George Orwell"},
                {title: "Moby Dick", author: "Herman Melville"},
                {title: "The Catcher in the Rye", author: "J. D. Salinger"},
                {title: "The Great Gatsby", author: "F. Scott Fitzgerald"},
                {title: "1984", author: "George Orwell"},
                {title: "Moby Dick", author: "Herman Melville"},
                {title: "The Catcher in the Rye", author: "J. D. Salinger"},
                {title: "The Great Gatsby", author: "F. Scott Fitzgerald"},
                {title: "1984", author: "George Orwell"},
                {title: "Moby Dick", author: "Herman Melville"},
                {title: "The Catcher in the Rye", author: "J. D. Salinger"},
                ]
        };
    }

    deleteBook(bookKey) {
        let currBooks = this.state.books;
        currBooks.splice(bookKey,1);
        this.setState({books: currBooks});
    }

    editBook(bookKey) {
        
    }
    
    render() {
        const bookElems = this.state.books.map((book, index) => 
            <Book 
                title={book.title} 
                bookKey={index}
                key={index}
                onDelete={this.deleteBook}
            />
        );
        return (
            <>
            <div className="flex flex-wrap w-4/5 pl-12 pt-3">
                {bookElems}
            </div>
            </>
        )
    }
}

export default BookPane;
