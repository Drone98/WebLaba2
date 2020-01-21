import React from 'react'
import '../styles/style.css'
import LocalWeather from "./localWeather";
import SelectedCityList from "./selectedCityList";
import axios from 'axios'

class MainLayout extends React.Component {
    render() {
        return (
            <div  id="main_layout">
                <LocalWeather axios={axios} navigator={navigator}/>
                <SelectedCityList axios={axios}/>
            </div>
        );
    }
}

export default MainLayout;

