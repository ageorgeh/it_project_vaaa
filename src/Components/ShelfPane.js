import React from "react";
import Shelf from './Shelf.js'

class ShelfPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shelves: ['All books', 'Fiction', 'Non-fiction', 'To-read']};
    }
    
    render() {
        const shelfElems = this.state.shelves.map((shelf, index) => 
            <Shelf name={shelf} key={index}/>
        );
        return (
            
            <>
            <div className="sticky top-3 flex-auto w-1/5 rounded-lg bg-gray-700 h-fit mt-3 z-1 left-6 py-3">
                {shelfElems}
            </div>
            </>
    )
    }
}

export default ShelfPanel;