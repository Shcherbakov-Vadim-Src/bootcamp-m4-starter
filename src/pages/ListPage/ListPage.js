import React, { Component } from 'react';
import './ListPage.css';
import {renderingList} from '../../components/Fetch';
import { Link,} from 'react-router-dom';
import {getSelectMovieList} from '../../components/Fetch'


class ListPage extends Component {
    state = {       
        movies: null
       }

       componentDidMount() {
        let params = this.props.match.params.id;
        console.log(params)
            getSelectMovieList(params).then((data) => {
                renderingList(data.movies).then(dates => this.setState({movies:dates}))
             })
        }
       

    render() { 
        let {movies} = this.state
        return (            
            <div className="list-page"> 
                <Link to = '/'>Вернутся на главную</Link>
                <h1 className="list-page__title">Мой список</h1>
                {/* {console.log(movies)} */}
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