import React from 'react' 
import { Grid, Button, Loader, Container, Segment } from 'semantic-ui-react';


function Nominations(props) {

    const handleRemove = (movie) => {
        props.removeNominationList(movie)
    }

    let userNominationList = props.nominationList.map(movie => {
        return <div key={movie.Poster} className='NominationListHolder'>
                    <img src={movie.Poster !== "N/A" ? movie.Poster : './assets/image_placeholder.jpeg'}
                        alt={movie.Title} />   
                    <p>{movie.Title}</p> 
                    <p>{movie.Year}</p>
                    <Button
                        color = 'red'
                        onClick = {() => handleRemove(movie)}
                        type = 'submit'>
                        Remove
                    </Button>

                </div>
    })

    

    return (
        <div>
            
            <div className='NominationListGrid'>{userNominationList}</div>  

            
        </div>
    )
}


export default Nominations


