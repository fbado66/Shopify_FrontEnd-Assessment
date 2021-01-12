import React from 'react' 
import {Icon} from 'semantic-ui-react';


function Header() {
    
    return (
        <div>
            <h1 className='header'>
                <Icon name='film' />The Shoopies Movie Awards!!
                <Icon name='star' color='yellow' />
            </h1>
            <p className='paragraph'>Search your favorite 5 movies and nominate them for the Shoopies Movie Awards</p>
        </div>
    )
}

export default Header