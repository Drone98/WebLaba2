import React from 'react'
import {deleteCity, getByName} from '../storage/actionCreator'
import {connect} from 'react-redux';
import axios from 'axios/index';
import Loader from './loader';
import Error from "./error";
import City from "./city";

class SelectedCity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        getByName(this.props.name,
            this.ifSuccess.bind(this),
            this.ifError.bind(this));
    }

    ifSuccess(response){
        this.setState({
            data: response.data,
            loading: false,
        })
    }

    ifError(error){
        let msg = "Проблемы с интернет соединением";
        if (error.response) {
            if (error.response.status === 404) {
                msg = "Город не найден";
                setTimeout(() => this.props.deleteCity(this.props.name), 5000);
            } else {
                msg = "Проблемы с сервером"
            }
        }

        this.setState({
            data: msg,
            loading: false,
            error: true
        })
    }

    delete() {
        this.props.deleteCity(this.props.name);
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader/>
            )
        }
        else {
            if (this.state.error) {
                return (
                    <Error message={this.state.data} delete={this.delete.bind(this)} name={this.props.name}/>
                )
            }
            return(
                <div className="loader" >
                    <div className="header">
                        <b>{this.state.data.name}</b>
                        <span className="item-temp">{this.state.data.main.temp + " \u2103"}</span>
                        <img className="item-icon" src={'//openweathermap.org/img/wn/' + this.state.data.weather[0].icon + '@2x.png'}
                             alt="img"/>
                        <button className="itemsButton" id="delete" onClick={this.delete.bind(this)}>x</button>
                    </div>
                    <div className="item-entry">
                        <City data={this.state.data}/>
                    </div>
                </div>
            );
        }

    }
}

export default connect(null, {deleteCity})(SelectedCity);