import ShelfPane from './ShelfPane';
import BookPane from './BookPane';

export default function MyBooks() {
    return (
    <>
        <div className="flex relative"> 
            <ShelfPane />
            <BookPane />
        </div>
    </>
    )
}