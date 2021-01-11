import React from 'react';
import Search from './Search'
import SearchResult from './SearchResult'
import Nominations from './Nominations'
import Header from './Header'
import 'semantic-ui-css/semantic.min.css'
import './App.css';


class App extends React.Component {

  state = {
    movieList: [],
    nominationList: [],
    disabledButton: false,
    loading: '',
    totalNominationMessage: '',
    reachLimitMessage: ""
  }

  searchingForMovies = (term) => {
    let searchTerm = term.split(' ').join('%20')
    fetch(`http://omdbapi.com/?i=tt3896198&apikey=b8977260&s=${searchTerm}`)
    .then(response => response.json())
    .then(moviesResults => {
      if(term && moviesResults.Response === 'True'){
        this.setState({ movieList: moviesResults.Search, loading: false })
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
    let copyOfNominationList = [...this.state.nominationList, newMovie]
    this.setState({
      nominationList: copyOfNominationList,
      totalNominationMessage: `Your nomination list has ${this.state.nominationList.length + 1} movies`
    })
    localStorage.setItem('nominations', JSON.stringify(
      [...this.state.nominationList, newMovie]
    ))
  }

  removeNominationList = (movieToRemove) => {
    let filterMovies = this.state.nominationList.filter(movie => movie.imdbID !== movieToRemove.imdbID )
    this.setState({ 
      nominationList: [...filterMovies],
      totalNominationMessage: `Your nomination list has ${this.state.nominationList.length - 1} movies`
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

  componentDidUpdate = (prevState) => { 
    if(this.state.nominationList.length === 5 && this.state.disabledButton !== true){
        this.setState(prevState =>({ 
          disabledButton: !prevState.disabledButton,
          reachLimitMessage: 'You have reached the limit in nominations, but you can always update your list'
          })
        )

      setTimeout(() => {this.setState({reachLimitMessage: ''})}, 6000)  
    } else if (this.state.nominationList.length < 5 && this.state.disabledButton !== false) {
      this.setState(prevState => ({ disabledButton: !prevState.disabledButton }))
    }
  }


  render (){
    return (
      <div>
        <Header />
          <p className='bannerLimit'>{this.state.reachLimitMessage}</p>
          <Nominations 
          removeNominationList = {this.removeNominationList}
            nominationList = {this.state.nominationList}
          />
          <p className='totalNomMoviesMsg'>{this.state.totalNominationMessage}</p>
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
