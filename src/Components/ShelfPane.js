import React from "react";
import Shelf from './Shelf.js'

class ShelfPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shelves: ['All books', 'Fiction', 'Non-fiction', 'To-read']};
    }
    
    render() {
        const shelfElems = this.state.shelves.map((shelf) => 
            <Shelf name={shelf}/>
        );
        return (
            
            <>
            <div className="w-64 fixed bg-gray-800 overflow-hidden z-1 top-11 left-6 py-3">
                <h4 className="text-2xl text-center text-gray-100 font-bold">Shelves</h4>
                <hr></hr>
                {shelfElems}
            </div>
            </>
    )
    }
}

export default ShelfPanel;