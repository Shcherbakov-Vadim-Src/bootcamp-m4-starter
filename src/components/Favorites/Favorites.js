import React, { Component } from 'react';
import './Favorites.css';
import Movies from '../Movies/Movies';

class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [
            { imdbID: 'tt0068646', Title: 'The Godfather', Year: 1972 }
        ]
    }

    handlerChange = (event) => {
        this.setState({title: event.target.value})
    }

    saveHandler = () => {
        let clone = [...this.props.movies];
        console.log(clone);
    }

    render() { 

        return (
            <div className="favorites">
                <input onChange={this.handlerChange} value={this.state.title} className="favorites__name" type="text" />
                <p>{this.state.title}</p>
                <ol className="favorites__list">
                    {this.props.movies.map((item) => {
                        return <li className="favorites__list_item" key={item.imdbID}>{item.title} ({item.year}) <button onClick={(imdbID) => this.props.itemDeleteHandler(item.imdbID)}>❌</button></li>;
                    })}
                </ol>
                <button onClick={this.saveHandler} type="button" className="favorites__save">Сохранить список</button>
            </div>
        );
    }
}
 
export default Favorites;