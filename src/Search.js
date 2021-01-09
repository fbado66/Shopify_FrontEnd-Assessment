import React from 'react' 

function Search(props) {
    const handleResult = (evt) => {
        console.log(evt.target.value)
        props.movieSearchResults(evt.target.value)
    }

    return (
        <div>
            <input type='text'
                name='search'
                className='search'
                value={props.searchTerm}
                onChange={handleResult}
                placeholder='Search for movie'


                // <p id='search_header'>Search Restaurants closest to you</p>
                // <GoogleComponent
                //     apiKey = {API_KEY}
                //     language = {'en'}
                //     country = {'country:us'}
                //     coordinates = {true}
            />
        </div>
    )
}

export default Search 