import React from 'react' 
import {Button} from 'semantic-ui-react';


function Nominations(props) {

    const handleRemove = (movie) => {
        props.removeNominationList(movie)
    }
    let nomination = ""
    if(props.nominationList.length > 0){
        nomination = "!Nominations!"
    } else {
        nomination = ''
    }

    let userNominationList = props.nominationList.map(movie => {
        return <div key={movie.Poster}>
                    <div className='NominationListHolder'>
                        <img src={movie.Poster !== "N/A" ? movie.Poster : './assets/image_placeholder.jpeg'}
                            alt={movie.Title} />   
                        <p className='movieTitle'>{movie.Title}</p> 
                        <p className='movieYear'>({movie.Year})</p>
                        <Button
                            color = 'red'
                            onClick = {() => handleRemove(movie)}
                            type = 'submit'>
                            Remove
                        </Button>
                    </div>
                </div>
    })

    
    return (
            <div className='outerGridNomination'>
                <h2 className='subHeader'>{nomination}</h2>
                <div className='NominationListGrid'>{userNominationList}</div>
            </div>  
    )
}

export default Nominations


