import React from 'react'

class Shelf extends React.Component {
  constructor (props) {
    super(props)
    this.selectShelf = this.selectShelf.bind(this)
  }

  selectShelf () {
    this.props.onSelect(this.props.shelfKey)
  }

  render () {
    return (
            <>
                <li>
                    <div className="mx-2">
                        <button onClick={this.selectShelf} className="flex items-center py-2 w-full font-normal text-stone-900 rounded-lg dark:text-white hover:bg-stone-100 pl-3 dark:hover:bg-stone-700">
                        {this.props.name}
                        </button>
                    </div>
                </li>
            </>
    )
  }
}

export default Shelf
