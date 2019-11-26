import React from 'react'
import '../styles/style.css'
import LocalWeather from "./localWeather";
import SelectedCityList from "./selectedCityList";

class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <LocalWeather />
                <SelectedCityList />
            </div>
        );
    }
}

export default MainLayout;

