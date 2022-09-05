function Shelf(props) {
    return (
    <>
    <div className="text-center">
        <button type="button" className="text-white text-center rounded-lg bg-gray-800 hover:bg-gray-900 font-medium text-sm px-5 py-2.5 mr-2 mb-2">{props.name}</button>
    </div>
    </>
  );
}

export default Shelf;