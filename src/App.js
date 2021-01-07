import React from 'react';
import Search from './Search'
import SearchResult from './SearchResult'
import Nominations from './Nominations'
import './App.css';

class App extends React.Component {

  state = {
    movieList: [],
    nominationList: [],
    disabledButton: false
  }

  searchingForMovies = (term) => {
    // console.log(term)
    let searchTerm = term.split(' ').join('%20')
    fetch(`http://omdbapi.com/?i=tt3896198&apikey=b8977260&s=${searchTerm}`)
    .then(response => response.json())
    .then(moviesResults => {
      if(term && moviesResults.Response === 'True'){
        // React this.setState is not a function
        this.setState({ movieList: moviesResults.Search })
        // this.displayMovies(moviesResults.Search)
      }else {
        console.log("The Search returns no result")
      }
    })
  }


  updateNominationList = (newMovie) => {
    console.log(newMovie)
    let copyOfNominationList = [...this.state.nominationList, newMovie]
    this.setState({
      nominationList: copyOfNominationList
    })
    localStorage.setItem('nominations', JSON.stringify(
      [...this.state.nominationList, newMovie]
    ))
  }

  removeNominationList = (movieToRemove) => {
    let filterMovies = this.state.nominationList.filter(movie => movie.imdbID !== movieToRemove.imdbID )
    this.setState({ 
      nominationList: [...filterMovies]
    })
    localStorage.setItem('nominations', JSON.stringify(
      [...filterMovies]
    ))
  }


  componentDidMount = () => { 
    if(localStorage.getItem('nominations')){
      this.setState({
        nominationList: [...JSON.parse(localStorage.getItem('nominations'))]
      })
    }
  }

  // FUNCTION THAT WILL DISPLAY MESSAGE AND RUN A SET TIME OUT TO SET THE BOOLEAN BACK TO FALSE TO HIDE THE MESSAGE
  // {
    // SET BOOL TO TRUE
    // SETTIEMOUT => ({ SET BOOL TO FALSE }, 2000)
  // }

  componentDidUpdate = (prevState) => { 
    if(this.state.nominationList.length === 5 && this.state.disabledButton !== true){
      // SETUP A FUNCTION TO RUN A SETTIMEOUT TO DISPLAY A MESSAGE FOR n SECONDS - BOOLEAN VAR
      this.setState(prevState =>({ disabledButton: !prevState.disabledButton }))

    } else if (this.state.nominationList.length < 5 && this.state.disabledButton !== false) {
      this.setState(prevState => ({ disabledButton: !prevState.disabledButton }))
    }
  }


  render (){
    
    return (
      <div>
        {/* A DIV TO DISPLAY A MESSAGE - HIDE DIV AND SHOW BASED ON A BOOLEAN VARIABLE - TRUE/FALSE */}
        <h1> The Shoopies</h1>
          <Search 
            movieSearchResults = {this.searchingForMovies}
          />
          <SearchResult 
            disabledButton = {this.state.disabledButton}
            resultArray = {this.state.movieList}
            updateNominationList={this.updateNominationList}
          />
          <Nominations 
          removeNominationList = {this.removeNominationList}
            nominationList = {this.state.nominationList}
         />
      </div>
    )
  }

}

export default App;
