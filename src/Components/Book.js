function Book(props) {
    return (
    <>
    <div>
        <button className="relative w-32 h-48 bg-gray-800 rounded-lg shadow-md m-1">
            <h5 className="text-gray-200">{props.title}</h5>
            <button type="button" className="text-gray-100 bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">Delete</button>
            <button type="button" className="text-gray-100 bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2">Edit</button>
        </button>   
    </div>
    </>
  );
}

export default Book;