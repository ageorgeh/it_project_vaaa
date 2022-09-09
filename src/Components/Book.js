import React from "react";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeletion = this.handleDeletion.bind(this);
    }
    
    handleDeletion() {
        this.props.onDelete(this.props.bookKey);
    }



    render () {
        return (
            <>
            <div className="relative w-32 h-48 bg-gray-800 rounded-lg shadow-md m-1 place-content-center text-center">
                <div className="place-content-center">
                    <h5 className="text-gray-200 text-center m-3">{this.props.title}</h5>
                </div>
                <button onClick={this.handleDeletion} type="button" className="text-gray-100 text-center bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">Delete</button>
                <div className="place-content-center">
                    <a href="/edit">
                        <button type="button" className="text-gray-100 bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">Edit</button>
                    </a>
                </div>
            </div>   
            </>
          );
    }

}

export default Book;