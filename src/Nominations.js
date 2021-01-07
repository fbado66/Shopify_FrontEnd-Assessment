import React from 'react' 

function Nominations(props) {

    const handleRemove = (movie) => {
        props.removeNominationList(movie)
    }

    let userNominationList = props.nominationList.map(movie => {
        return <div key={movie.Poster}>
                    <h2>{movie.Title}</h2> 
                    <img src={movie.Poster} />
                    <button
                        onClick = {() => handleRemove(movie)}
                        type = 'submit'>
                        Remove
                    </button>
                </div>
    })

    // console.log(userNominationList.length)
    return (
        <div>
            <h1>Nominations</h1>
            {userNominationList}
        </div>
    )
}


export default Nominations


