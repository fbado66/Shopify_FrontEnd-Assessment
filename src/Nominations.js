import React from 'react' 

function Nominations(props) {
    // console.log(props.nominationList)

    let userNominations = props.nominationList.map(movie => {
        return <div key={movie.Title}>
                {movie.Title}
                </div>
    })

    return (
        <div>
            <h1>Nominations</h1>
            {userNominations}
        </div>
    )
}


export default Nominations


