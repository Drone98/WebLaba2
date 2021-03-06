import React from 'react'
import SelectedCity from './selectedCity'
import {addCity} from '../storage/actionCreator'
import {connect} from "react-redux";

class SelectedCityList extends React.Component {
    addItem(event) {
        let name = event.target['city'].value;
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        if (this.props.items.filter(item => {return item.name === name}).length === 0 && name !== '') {
            this.props.addCity(name);
            this.props.items.push(name);
        }

        event.preventDefault();
    }

    getItems() {
        let items = [];
        this.props.items.forEach(item => {
            items.push(<SelectedCity key={item.name} name={item.name} axios={this.props.axios}/>);
        });
        return items;
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="part">Избранное</div>

                    <form onSubmit={this.addItem.bind(this)}>
                        <input name="city" type="text" placeholder="Введите название города..."/>
                        <button className="itemsButton" type="submit">+</button>
                    </form>
                </div>

                <div className="items">{this.getItems()}</div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        items: state
    }
}, {addCity})(SelectedCityList);