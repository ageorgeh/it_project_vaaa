import React from 'react';
import Book from './Book';

class BookPane extends React.Component {
    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
        this.state = {
            books: [
                {title: "The Great Gatsby", author: "F. Scott Fitzgerald", shelves: [0,1], image: "img/books/gatsby.jpg"},
                {title: "1984", author: "George Orwell", shelves: [0,1], image: "img/books/1984.jpg"},
                {title: "Moby Dick", author: "Herman Melville", shelves: [0,1], image: "img/books/moby.jpg"},
                {title: "The Catcher in the Rye", author: "J. D. Salinger", shelves: [0,1], image: "img/books/catcher.jpg"},
                {title: "Alice in Wonderland", author: "Lewis Carrol", shelves: [0,1], image: "img/books/alice.jpg"},
                {title: "Anna Karenina", author: "Leo Tolstoy", shelves: [0,1], image: "img/books/anna.jpg"},
                {title: "The Course of Love", author: "Alain de Botton", shelves: [0,2], image: "img/books/botton.jpg"},
                {title: "Dune", author: "Frank Herbert", shelves: [0,1], image: "img/books/dune.jpg"},
                {title: "How To Do Good Better", author: "William MacAskill", shelves: [0,2], image: "img/books/ea.jpg"},
                {title: "My 60 Memorable Games", author: "Bobby Fischer", shelves: [0,1], image: "img/books/fischer.jpg"},
                {title: "The Hobbit", author: "J.R. Tolkien", shelves: [0,1], image: "img/books/hobbit.jpg"},
                {title: "How to Kill a Mockingbird", author: "Harper Lee", shelves: [0,1], image: "img/books/mockingbird.jpg"},
                {title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", shelves: [0,1], image: "img/books/narnia.jpg"},
                {title: "Harry Potter and the Philosopher's Stone", author: "J.K Rowling", shelves: [0,1], image: "img/books/potter1.jpg"},
                {title: "Harry Potter and the Chamber of Secrets", author: "J.K Rowling", shelves: [0,1], image: "img/books/potter2.jpg"},
                {title: "Harry Potter and the Prisoner of Azkaban", author: "J.K Rowling", shelves: [0,1], image: "img/books/potter3.jpg"},
                {title: "Harry Potter and the Goblet of Fire", author: "J.K Rowling", shelves: [0,1], image: "img/books/potter4.jpg"},
                {title: "Pride and Prejudice", author: "Jane Austen", shelves: [0,1], image: "img/books/prejudice.jpg"},
                {title: "Sapiens", author: "Yuval Noah Harrari", shelves: [0,2], image: "img/books/sapiens.jpg"},
                {title: "A Brief History of Time", author: "Stephen Hawking", shelves: [0,2], image: "img/books/time.jpg"},
                {title: "A Walk in the Woods", author: "Bill Bryson", shelves: [0,2], image: "img/books/walk.jpg"},
                {title: "Into the Wild", author: "Jon Krakauer", shelves: [0,1], image: "img/books/wild.jpg"},
                ]
        };
    }

    deleteBook(bookKey) {
        let currBooks = this.state.books;
        currBooks.splice(bookKey,1);
        this.setState({books: currBooks});
    }
    
    render() {
        const bookElems = [];
        for (let i=0; i<this.state.books.length; i++) {
            if (this.state.books[i].shelves.includes(this.props.currShelf)) {
                bookElems.push(
                    <Book 
                        title={this.state.books[i].title} 
                        author={this.state.books[i].author}
                        bookKey={i}
                        key={i}
                        onDelete={this.deleteBook}
                        image={this.state.books[i].image}
                    />
                );
            }
        }
        return (
            <>
            <div className="w-5/6 m-2 pl-5 rounded-lg">
                <div className="flex text-center items-center pb-2 border-b-2 mb-8 border-stone-500">
                    <span className="flex text-stone-100 ml-2 text-3xl">{this.props.currShelfName}</span>
                </div>
                <div className="flex flex-wrap">
                    <div className="relative w-1/6 h-64 place-content-center mb-1">
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

export default BookPane;
