import ShelfPane from './ShelfPane';
import BookPane from './BookPane';

export default function MyBooks() {
    return (
    <>
        <ShelfPane />
        <div className="ml-64 pl-12 pt-3">
            <BookPane />
        </div>
    </>
    )
}