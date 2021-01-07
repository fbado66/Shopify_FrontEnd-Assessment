import React from 'react' 

function SearchResult(props) {
    console.log(props)

    const handleClick = (movie) => {
        props.updateNominationList(movie)
    }

    let MovieResults = props.resultArray.map(movie => {
        return <div key={movie.Title + movie.Poster}>
                    <h1>{movie.Title}</h1>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster !== "N/A" ? movie.Poster : 'https://vignette.wikia.nocookie.net/donatello-the-ninja-turtle/images/4/47/Placeholder.png/revision/latest?cb=20190403161112'}/>
            
                    <button
                        disabled = {props.disabledButton}
                        onClick = { () => handleClick(movie) }
                        type = 'submit'>
                        Nominate 
                    </button>  
            
                </div>
    })

        // "./assets/name-image.png"

    return (
        <div>
            {MovieResults}
        </div>
    )
}


export default SearchResult