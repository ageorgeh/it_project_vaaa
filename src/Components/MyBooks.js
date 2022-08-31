import Book from './Book';

export default function MyBooks() {
    return (
    <>
        <h1 class="text-3xl font-bold underline">My Books</h1>
        <div class="bg-blue">
            <Book/>
            <Book/>
            <Book/>
            <Book/>
            <Book/>
        </div>
    </>
    )
}