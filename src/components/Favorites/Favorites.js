import React, { Component } from 'react';
import './Favorites.css';


class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [
            { imdbID: 'tt0068646', title: 'The Godfather', year: 1972 }
        ]
    }

    render() { 
        return (
            <div className="favorites">
                <input value= {this.props.titleNewList} className="favorites__name" onChange = {(e) => this.props.getTatle(e)}/>
                <ul className="favorites__list">                
                    {this.props.selectedListMovis.map((item) => {
                        return <li key={item.imdbID}>{item.Title} ({item.Year})<button onClick = {() => this.props.del(item.imdbID)}>❌</button></li>;
                    })}
                </ul>
                <button type="button" className="favorites__save" onClick = {this.props.requestGeneration}>Сохранить список</button>
            </div>
        );
    }
}
 
export default Favorites;