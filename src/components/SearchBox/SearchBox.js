import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: '',
        filmsArray: []
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        this.getData(this.state.searchLine).then((data) => {
            console.log(data);
            this.setState({ filmsArray: data })
        })
    }

    getData = (e) => {
        return fetch(`http://www.omdbapi.com/?s=${e}&apikey=ce6c89d6`) // поиска фильма по названию, используется GET-запрос с параметром s.
        .then ((response) => {
        return response.json();
    })
    }

    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;