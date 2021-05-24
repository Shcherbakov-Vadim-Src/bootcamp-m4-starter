import React, { Component } from 'react';
import './MainPage.css';
import { Link} from 'react-router-dom'
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';
import {GetListMovies, creatingMovieList} from '../../components/Fetch';

class MainPage extends Component {
    state = {
        searchMovies: '',
        listMove: [],
        selectedListMovies: [],
        titleNewList: 'Новый список',
        dataSaveList: []
    }
    changeMovies = (e) => {             
        this.setState({searchMovies:e.target.value})
    }

    movieRequest = (e) => {        
        e.preventDefault()        
        GetListMovies(this.state.searchMovies).then((data) => {                
            if (Array.isArray(data.Search)) {        
                let fix = '';
                let fdate = data.Search.filter((item) => {
                    if (item.imdbID !== fix) {
                        fix = item.imdbID 
                        return item
                    }                               
                })
                this.setState({listMove:fdate})
            } else {
                alert('Такого фильма не существует')
            }
        })
    }

    addToList = (id) => {
        let Movies = this.state.listMove.find((item) => {
            return  item.imdbID === id            
        })
        let newListMovies = [...this.state.selectedListMovies, Movies]       
        let flag = newListMovies.filter((item) => { return item.imdbID === Movies.imdbID})

        if (flag.length === 1) {                
        this.setState({selectedListMovies:newListMovies})
        }        
    }

    deleteFilms = (id) =>{
        let newArr = this.state.selectedListMovies.filter((item) => { return item.imdbID !== id})
        this.setState({selectedListMovies: newArr})
    }

    requestGeneration = () => {
        let arr = this.state.selectedListMovies.map((item) => item.imdbID)
        creatingMovieList(arr, this.state.titleNewList).then((data) => {
            let arrSelectMuv = [...this.state.dataSaveList, data]
            this.setState({dataSaveList:arrSelectMuv})
        })        
        let emptyArray = []
        this.setState({selectedListMovies:emptyArray})
    }

    getTitle = (e) => {
        this.setState({titleNewList: e.target.value})
    }

    render() { 
        return (
            
            <div className="main-page">                                
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox searchMovies = {this.state.searchMovies} changeMovies = {this.changeMovies} movieRequest = {this.movieRequest}/>
                        </div>
                        <div className="main-page__movies">
                            <Movies listMove = {this.state.listMove} addToList = {this.addToList}/>
                        </div>
                    </section>
                    <aside className="main-page__favorites">
                        <Favorites selectedListMovies = {this.state.selectedListMovies}
                         getTitle = {this.getTitle} titleNewList = {this.state.titleNewList}
                         requestGeneration = {this.requestGeneration}
                         deleteFilms = {this.deleteFilms}
                         />  
                        <div className = 'divSaveList'>
                            <p className="listmain">Мои списки:{this.state.dataSaveList.length === 0 ? ' ожидают создания' : null}</p>
                            {this.state.dataSaveList.map(item =>   <Link className = "Linkbr"  key={item.id} to = {`/list/${item.id}`}>{item.title}</Link>)} 
                        </div>                  
                    </aside>
                
                </main>
            </div>
        );
    }
}
 
export default MainPage;