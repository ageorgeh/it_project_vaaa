import ShelfPane from './ShelfPane';
import BookPane from './BookPane';
import React from 'react';

class MyBooks extends React.Component {
    constructor(props) {
        super(props);
        this.selectShelf = this.selectShelf.bind(this);
        this.state = {
            currShelf: 0,
            currShelfName: 'All Books'
        };
    }

    selectShelf(shelfKey, shelfName) {
        this.setState({
            currShelf: shelfKey,
            currShelfName: shelfName,
        });
    }
    
    render() {
        return (
            <>
                <div className="flex relative bg-stone-900"> 
                    <ShelfPane onSelect={this.selectShelf}/>
                    <BookPane currShelf={this.state.currShelf} currShelfName={this.state.currShelfName}/>
                </div>
            </>
            )
    }
}

export default MyBooks;