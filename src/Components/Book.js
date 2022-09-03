function Book(props) {
    return (
    <>
    <button className="w-32 h-48 bg-gray-700 shadow-md m-1 align-top">
        <h5 className="text-gray-200 align-top">{props.title}</h5>
        <p className="text-gray-400">{props.author}</p>
    </button>   
    </>
  );
}

export default Book;