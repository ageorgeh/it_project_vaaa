
import ShelfPane from './ShelfPane';
import BookPane from './BookPane';
import React from 'react';


class MyBooks extends React.Component {
    constructor(props) {
        super(props);
        this.selectShelf = this.selectShelf.bind(this);
        this.state = {
            currShelf: 0,
            shelves: ['All Books', 'Fiction', 'Non-Fiction', 'To-Read'],
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
              ],
        };
    }

    selectShelf(shelfKey) {
        this.setState({
            currShelf: shelfKey,
            currShelfName: this.state.shelves[shelfKey],
        });
    }
    
    render() {
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

export default MyBooks;