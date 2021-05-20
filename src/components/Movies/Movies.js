import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import Favorites from '../Favorites/Favorites';
import './Movies.css';
import '../../pages/MainPage/MainPage.css';


class Movies extends Component {
    state = { 
        movies: [
            // {
            //     imdbID: 'tt3896198',
            //     title: "Guardians of the Galaxy Vol. 2",
            //     year: 2017,
            //     poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
            // }
        ]
    }

    componentDidMount(){
        // console.log(this.props.filmsArray);
        // console.log(this.state.movies);
    }

    componentDidUpdate(){
        console.log('update', this.state.movies);
    }

    clickListHandler = (imdbID, Title, Year, Poster) => {
        
        let object = {
            imdbID: imdbID,
            title: Title,
            year: Year,
            poster: Poster
        };

        let arrnew = [...this.state.movies]
        
        arrnew.push(object)

        this.setState({
            movies: arrnew
        })
    }

    itemDeleteHandler = (imdbID) => {  

        // console.log(this.state.movies);

        let clone = [...this.state.movies];

        let arrnew = clone.filter((item) => {
            return item.imdbID !== imdbID;
        })

        // console.log(imdbID);               

        this.setState({
            movies: arrnew
        })
    }


    render() { 

        if (this.props.filmsArray === {}){
            return null;
        }

        return ( 
            <>
                <ul className="movies">      
                    {this.props.filmsArray.map((movie) => {               
                    return <li className="movies__item" key={movie.imdbID}>
                            <MovieItem {...movie} clickListHandler={this.clickListHandler} />
                        </li>
                    })}
                </ul>
                <aside className="main-page__favorites">
                        <Favorites movies={this.state.movies} itemDeleteHandler={this.itemDeleteHandler} />
                </aside>
            </>
        );
    }
}
 
export default Movies;