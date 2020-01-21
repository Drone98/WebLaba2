import renderer from "react-test-renderer";
import LocalWeather from "../classes/localWeather";
import React from "react";
import reducer from "../storage/reducer";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import '@babel/polyfill'
const {act} = renderer;

const data = (url, params) => {
    return Promise.resolve({
            "data": {
                "coord": {
                    "lon": params.params.lon,
                    "lat": params.params.lat
                },
                "weather": [
                    {
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "main": {
                    "temp": 0,
                    "pressure": 1000,
                    "humidity": 80
                },
                "wind": {
                    "speed": 5
                }
            }
        }
    );
};

let store;

beforeEach( ()=> {
    let persistedState = [{ name: "murmansk"}, {name: "moscow"}];
    store = createStore(reducer, persistedState, applyMiddleware(thunk));
});

it('Rendered data', () => {
    let axios = {
        get: data
    };

    let navigator = {
        geolocation: {
            getCurrentPosition: (success, error) => {
                let position = {
                    coords: {
                        latitude: 100,
                        longitude: 100
                    }
                };

                success(position)
            }
        }
    };

    let component = renderer.create(
        <div/>
    );

    act(() => {
        component = renderer.create(
            <LocalWeather axios={axios} navigator={navigator}/>
        );
    });
    let cur = component.toJSON();
    expect(cur).toMatchSnapshot();
});

it('Rendered error', () => {
    let axios = {
        get: data
    };

    let navigator = {
        geolocation: {
            getCurrentPosition: (success, error) => {
                error()
            }
        }
    };

    let component = renderer.create(
        <div/>
    );

    act(() => {
        component = renderer.create(
            <LocalWeather axios={axios} navigator={navigator}/>
        );
    });
    let cur = component.toJSON();
    expect(cur).toMatchSnapshot();
});
