import React, { Component } from 'react';
import './Favorites.css';
import ListPage from '../../pages/ListPage/ListPage';
import { Link } from "react-router-dom";

class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [
            // { imdbID: 'tt0068646', Title: 'The Godfather', Year: 1972 }
        ],
        listID: '',
        data: []
    }

    handlerChange = (event) => {
        this.setState({ title: event.target.value })
    }

    saveHandler = () => {
        let clone = [...this.props.movies];
        // console.log(clone);
        let arrIDFilms = clone.map((item) => item.imdbID)
        // console.log(arrIDFilms);
        this.setState({ movies: arrIDFilms })
        // console.log(this.state.movies); 
        
        this.getData().then((data) => {
            console.log('data-data', data);
            this.setState({ 
                listID: data.id,
                data: clone
            })
        })

        let cloneData = [...this.state.data];  // нужно, чтобы список добавлялся еще один а не замещался
        cloneData.push(this.state.data);

        this.setState({ 
            data: cloneData
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
        console.log('updateFavorites', this.state);
    }

    // didUpdateData(){
    //     let url = `http://localhost:3000/${this.state.dataVelue.id}`;
    //     return url;
    // }

    render() {

        return (
            <>
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
                <Link className="listUrl" to={`/list/${this.state.listID}`}>{this.state.title}</Link>
                <ListPage listID={this.state.listID} movies={this.state.movies} data={this.state.data} />
            </>
        );
    }
}

export default Favorites;