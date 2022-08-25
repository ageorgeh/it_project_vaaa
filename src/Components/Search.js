//references:  https://www.emgoto.com/react-search-bar/
const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search for books</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search books"
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;