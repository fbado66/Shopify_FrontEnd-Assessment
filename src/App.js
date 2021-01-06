import React from 'react';
import Search from './Search'
import SearchResult from './SearchResult'
import Nominations from './Nominations'
import './App.css';

class App extends React.Component {

  state = {
    movieArray: [],
    nominationList: []
  }


  updateNominationList = (newMovie) => {
    let copyOfNominationList = [...this.state.nominationList, newMovie]
    this.setState({
      nominationList: copyOfNominationList
    })
  }
    // create another function to map a list of the movies
  //   displayMovies = (movies) => {
  //   movies.map(mv => {
  //     console.log(mv)
  //   })
  // }

  finder = (term) => {
    console.log(term)
    let searchTerm = term.split(' ').join('%20')
    fetch(`http://omdbapi.com/?i=tt3896198&apikey=b8977260&s=${searchTerm}`)
    .then(response => response.json())
    .then(moviesResults => {
      // console.log(moviesResults)
      if(term && moviesResults.Response === 'True'){
        // React this.setState is not a function
        this.setState({ movieArray: moviesResults.Search })
        // this.displayMovies(moviesResults.Search)
      }else {
        console.log("The Search returns no result")
      }
    })
  }

  render (){

    console.log(this.state.nominationList)
    
    return (
      <div>
        <h1> The Shoopies</h1>
          <Search 
            finder = {this.finder}
          />
          <SearchResult 
            resultArray = {this.state.movieArray}
            updateNominationList={this.updateNominationList}
          />
          <Nominations 
            nominationList = {this.state.nominationList}
         />
      </div>
    )
  }

}

export default App;
