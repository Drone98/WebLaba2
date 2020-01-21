import React from 'react'
import renderer from 'react-test-renderer'
import SelectedCity from '../classes/selectedCity'
import '@babel/polyfill'
import {applyMiddleware, createStore} from "redux";
import reducer from "../storage/reducer"
import thunk from "redux-thunk";
import {Provider} from "react-redux";

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

beforeEach(() => {
        let persistedState = [{name: "murmansk"}, {name: "moscow"}];
        store = createStore(reducer, persistedState, applyMiddleware(thunk));
    }
);

it('Rendered selected city',async () => {
    let axios = {
        get: data
    };
    let component = await renderer.create(
        <Provider store={store}>
            <SelectedCity axios={axios} name={"murmansk"}/>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});

it('Loading', () => {
    let axios = {
        get: data
    };
    let component = renderer.create(
        <Provider store={store}>
            <SelectedCity axios={axios} name={"murmansk"} loadState={true}/>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});

it('Server error', async () => {
    let axios = {
        get: () => {
            return Promise.reject({
                response: {
                    status: 400
                }
            })
        }
    };
    let component = renderer.create(<div/>);
    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <SelectedCity axios={axios} name={"murmansk"}/>
            </Provider>
        );
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()

});

it('Network error', async () => {
    let axios = {
        get: () => {
            return Promise.reject({
                response: null
            })
        }
    };

    let component = renderer.create(<div/>);

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <SelectedCity axios={axios} name={"murmansk"}/>
            </Provider>
        );
    });
});