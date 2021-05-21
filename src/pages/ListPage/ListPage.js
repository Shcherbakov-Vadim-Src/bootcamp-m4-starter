import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [
            { title: 'The Godfather', year: 1972, imdbID: 'tt0068646' }
        ],
        dataVelue: {},
        flag: true,
        url: ''
    }


    componentDidMount(listID) {
        // listID = this.props.listID;

        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID       // 
            
    }

    componentDidUpdate(listID){
        // console.log('componentDidUpdate ----  listID', this.props.listID);
        if (this.state.flag){
            this.getData(this.props.listID).then((data) => {
                console.log('componentDidUpdate ----  data', data);
                this.setState({ 
                    dataVelue: data,
                    flag: false
              })                     
            })  
        }                           
    }  //  http://localhost:3000/<id>    this.state.dataVelue.id


    getData = (e) => {
        // console.log(e);
        return fetch(`https://acb-api.algoritmika.org/api/movies/list/${this.props.listID}`) // Для получения отдельного списка по идентификатору 
            .then((response) => {
                return response.json();
        })
    }


    render() { 

        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.dataVelue.title}</h1> 
                <ul>
                    {this.props.data.map((item) => {     // 
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;