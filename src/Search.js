import React from 'react' 

function Search(props) {
    const handleInput = (evt) => {
        props.finder(evt.target.value)
    }

    return (
        <div>
            <input type='text'
                name='search'
                className='search'
                value={props.searchTerm}
                onChange={handleInput}
            />
        </div>
    )
}

export default Search 