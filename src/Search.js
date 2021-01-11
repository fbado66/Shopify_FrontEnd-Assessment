import React from 'react' 
import { Icon } from 'semantic-ui-react';

function Search(props) {
    const handleResult = (evt) => {
        props.movieSearchResults(evt.target.value)
    }

    return (
        <div className='searchComponent'>
            <input type='text'
                name='search'
                className='searchBar'
                value={props.searchTerm}
                onChange={handleResult}
                placeholder='Search movies'/>
            <Icon id='searchIcon' size='large' color='red' name='search'/>
        </div>
    )
}

export default Search 