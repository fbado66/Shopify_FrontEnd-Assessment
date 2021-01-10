import React from 'react';
import Search from './Search'
import SearchResult from './SearchResult'
import Nominations from './Nominations'
import 'semantic-ui-css/semantic.min.css'
import './App.css';


class App extends React.Component {

  state = {
    movieList: [],
    nominationList: [],
    disabledButton: false,
    loading: '',
    NominationMessage: '',
  }


  searchingForMovies = (term) => {
    console.log(term)
    let searchTerm = term.split(' ').join('%20')
    fetch(`http://omdbapi.com/?i=tt3896198&apikey=b8977260&s=${searchTerm}`)
    .then(response => response.json())
    .then(moviesResults => {
      if(term && moviesResults.Response === 'True'){
        // React this.setState is not a function
        this.setState({ movieList: moviesResults.Search, loading: false })
        // this.displayMovies(moviesResults.Search)
      }else if (!term) {
        this.setState({loading: false})
      }else {
        this.setState({movieList: [], loading: true})
      }
    })
  }

  updateMovieSearch = (searchTerm) => {
    this.setState({
      movieSearch: searchTerm
    })
  }

  updateNominationList = (newMovie) => {
    console.log(newMovie)
    let copyOfNominationList = [...this.state.nominationList, newMovie]
    this.setState({
      nominationList: copyOfNominationList,
      NominationMessage: `You have ${this.state.nominationList.length + 1} movies`
    })
    localStorage.setItem('nominations', JSON.stringify(
      [...this.state.nominationList, newMovie]
    ))
  }

  removeNominationList = (movieToRemove) => {
    let filterMovies = this.state.nominationList.filter(movie => movie.imdbID !== movieToRemove.imdbID )
    this.setState({ 
      nominationList: [...filterMovies],
      NominationMessage: `You have ${this.state.nominationList.length - 1} movies`
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

  updateNominationMessage = () => {
      this.setState({
        NominationMessage: 'You have 5 movies in total'
      })
    
  }

  message = () => {
    'This is a test'

  }
  // FUNCTION THAT WILL DISPLAY MESSAGE AND RUN A SET TIME OUT TO SET THE BOOLEAN BACK TO FALSE TO HIDE THE MESSAGE
  // {
    // SET BOOL TO TRUE
    // SETTIEMOUT => ({ SET BOOL TO FALSE }, 2000)
  // }

  componentDidUpdate = (prevState) => { 
    if(this.state.nominationList.length === 5 && this.state.disabledButton !== true){
      setTimeout(() => this.setState({ message: true}), 3000)
      // this.updateNominationMessage(setTimeout(1000))
      // SETUP A FUNCTION TO RUN A SETTIMEOUT TO DISPLAY A MESSAGE FOR n SECONDS - BOOLEAN VAR
      this.setState(prevState =>({ disabledButton: !prevState.disabledButton }))

    } else if (this.state.nominationList.length < 5 && this.state.disabledButton !== false) {
      // this.updateNominationMessage(setTimeout(1000))


      this.setState(prevState => ({ disabledButton: !prevState.disabledButton }))
    }
  }


  render (){
    
    
    return (
      <div>
        <p>{this.state.NominationMessage}</p>
        {/* A DIV TO DISPLAY A MESSAGE - HIDE DIV AND SHOW BASED ON A BOOLEAN VARIABLE - TRUE/FALSE */}
        <h1> The Shoopies Movie Awards</h1>
        <Nominations 
          removeNominationList = {this.removeNominationList}
            nominationList = {this.state.nominationList}
         />
          <Search 
            movieSearchResults = {this.searchingForMovies}
          />
          
          <SearchResult 
          loading = {this.state.loading}
            nominationList = {this.state.nominationList}
            disabledButton = {this.state.disabledButton}
            resultArray = {this.state.movieList}
            updateNominationList={this.updateNominationList}
          />
          
      </div>
    )
  }

}

export default App;
