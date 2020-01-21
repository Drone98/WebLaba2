import React from 'react'
import renderer from 'react-test-renderer'
import SelectedCityList from '../classes/selectedCityList'
import '@babel/polyfill'
import {applyMiddleware, createStore} from "redux";
import reducer from "../storage/reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const {act} = renderer;

const get = (url, params) => {
    if (params.params.q === "Error") {
        return Promise.reject({
                response: {
                    status: 404
                }
            }
        )
    }
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

it('Rendered selected city', async () => {
    let axios = {
        get: get
    };

    let component = renderer.create(
        <div/>
    );

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <SelectedCityList axios={axios}/>
            </Provider>
        );
    });


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});

it('Add city in selected city list',async () => {
    let axios = {
        get: get
    };

    let component = renderer.create(
        <div/>
    );

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <SelectedCityList axios={axios}/>
            </Provider>
        );
    });

    await act(() => {
            let input = component.root.findByType('input');
            input.value = "new";
            let form = component.root.findByType('form');

            form.props.onSubmit({
                target: {
                    "city": input
                },
                preventDefault: () => {
                }
            });
        }
    );


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


});

it('Add city with not found error in selected city list',async () => {
    let axios = {
        get: get
    };

    let component = renderer.create(
        <div/>
    );

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <SelectedCityList axios={axios}/>
            </Provider>
        );
    });

    await act(() => {
            let input = component.root.findByType('input');
            input.value = "error";

            let form = component.root.findByType('form');

            form.props.onSubmit({
                target: {
                    "city": input
                },
                preventDefault: () => {
                }
            });
        }
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


});