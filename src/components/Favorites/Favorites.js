import React, { Component } from 'react';
import './Favorites.css';
import ListPage from '../../pages/ListPage/ListPage';
import { browserHistory, Route, Link } from "react-router-dom";


class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [
            // { imdbID: 'tt0068646', Title: 'The Godfather', Year: 1972 }
        ],
        listID: '',
        data: [],
        flag: true
    }

    handlerChange = (event) => {
        this.setState({ title: event.target.value })
    }

    saveHandler = () => {
        let clone = [...this.props.movies];
        // console.log(clone);
        let arrIDFilms = clone.map((item) => item.imdbID)
        // console.log(arrIDFilms);
        this.setState({ movies: arrIDFilms,
                        flag: false
                    })
        //  console.log(this.state.movies); 

        this.getData().then((data) => {
            // console.log('data-data', data);
            this.setState({ 
                listID: data.id,
                data: clone
            })
        })
    }

    getData = () => {
        return fetch('https://acb-api.algoritmika.org/api/movies/list', {   // Для сохранения списка используется POST запрос к API
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })                          
        .then((response) => {
                return response.json();
        })
    }

    componentDidUpdate() {
        // console.log('updateFavorites', this.state);
    }



    render() {


        return (
            <>
                <div className="favorites">
                    <input onChange={this.handlerChange} value={this.state.title} className="favorites__name" type="text" />
                    {/* <p>{this.state.title}</p> */}
                    <ol className="favorites__list">
                        {this.props.movies.map((item) => {
                            return <li className="favorites__list_item" key={item.imdbID}>{item.title} ({item.year}) <button onClick={(imdbID) => this.props.itemDeleteHandler(item.imdbID)}>❌</button></li>;
                        })}
                    </ol>
                    {this.state.flag ? <button onClick={this.saveHandler} type="button" className="favorites__save">Сохранить список</button> : <Link className="listUrl" to={`/list/${this.state.listID}`}>{this.state.title}</Link>}
                </div>
                <Route path="/" exact component={ListPage}>
                    <ListPage listID={this.state.listID} movies={this.state.movies} data={this.state.data} />
                </Route>
            </>
        );
    }
}

export default Favorites;