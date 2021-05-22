import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import Movies from '../../components/Movies/Movies';
// import Favorites from '../../components/Favorites/Favorites';
import '../../components/SearchBox/SearchBox.css';

class MainPage extends Component {
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
            // console.log(data);
            this.setState({ filmsArray: data.Search })
        })
    }

    getData = (e) => {
        return fetch(`http://www.omdbapi.com/?s=${e}&apikey=ce6c89d6`) // поиска фильма по названию, используется GET-запрос с параметром s.
            .then((response) => {
                return response.json();
        })
    }


    render() {
        const { searchLine } = this.state;
        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
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
                        </div>
                        <div className="main-page__movies">
                            <Movies filmsArray={this.state.filmsArray} />
                        </div>
                    </section>
                    {/* <aside className="main-page__favorites">
                        <Favorites />
                    </aside> */}
                </main>
            </div>
        );
    }
}



export default MainPage;