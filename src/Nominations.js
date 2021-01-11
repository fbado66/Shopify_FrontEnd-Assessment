import React from 'react' 
import {Button} from 'semantic-ui-react';


function Nominations(props) {

    const handleRemove = (movie) => {
        props.removeNominationList(movie)
    }

    let userNominationList = props.nominationList.map(movie => {
        return <div key={movie.Poster} className='NominationListHolder'>
                    <img src={movie.Poster !== "N/A" ? movie.Poster : './assets/image_placeholder.jpeg'}
                        alt={movie.Title} />   
                    <p className='movieTitle'>{movie.Title}</p> 
                    <p className='movieYear'>{movie.Year}</p>
                    <Button
                        color = 'red'
                        onClick = {() => handleRemove(movie)}
                        type = 'submit'>
                        Remove
                    </Button>
                </div>
    })

    
    return (
            <div className='outerGridNomination'>
                <div className='NominationListGrid'>{userNominationList}</div>
            </div>  
    )
}

export default Nominations


