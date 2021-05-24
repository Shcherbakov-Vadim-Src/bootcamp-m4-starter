import React, { Component } from 'react';
import './ListPage.css';
import {renderingList, getSelectMovieList} from '../../components/Fetch';
import { Link,} from 'react-router-dom';



class ListPage extends Component {
    state = {       
        movies: null
       }

       componentDidMount() {
        let params = this.props.match.params.id;
            getSelectMovieList(params).then((data) => {
                renderingList(data.movies).then(dates => this.setState({movies:dates}, console.log(dates)))
             })
        }
       

    render() { 
        let {movies} = this.state
        return (            
            <div className="list-page"> 
                <Link className="anchor" to = '/'>На главную страницу</Link>
                <h1 className="list-page__title">Мой новый список:</h1>
                <ul>
                    {movies&&movies.map((item) => {
                        return (
                            <li key={item.imdbID} className="liList">
                                <div className="movie-item">                                    
                                    <img className="movie-item__poster" src={item.Poster} alt={item.Title} />
                                    <div className="movie-item__info">
                                        <a href= {`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">
                                            <h3 className="movie-item__title">{item.Title}&nbsp;({item.Year})</h3> 
                                        </a>
                                        <p className="plot">{item.Plot}</p>
                                        <p className="plotMini">Year: {item.Year}, DVD: {item.DVD}</p>                                        
                                    </div>                                   
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;