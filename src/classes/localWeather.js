import React from 'react'
import LocalCity from "./localCity";

class LocalWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lon: 0
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation() {
        this.props.navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this));
    }

    error(){
        this.setState({lat: 66.6, lon: 66.6});
    }

    success(position){

        this.setState({lat: position.coords.latitude, lon: position.coords.longitude});
    }

    render() {
        return (
                <div className="local_weather">
                    <div className="header">
                        <div className="part">Ваша погода</div>
                        <button className="button" onClick={this.getLocation.bind(this)}>Обновить геолокацию</button>
                    </div>
                    <LocalCity lat={this.state.lat} lon={this.state.lon}/>
                </div>
        );
    }
}

export default LocalWeather;

