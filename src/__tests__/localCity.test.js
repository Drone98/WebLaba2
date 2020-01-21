import LocalCity from '../classes/localCity'
import React from 'react';
import renderer from 'react-test-renderer'
import '@babel/polyfill'
import SelectedCity from "./selectedCity.test";

it('Rendered local city', async () => {
    let component = await renderer.create(
        <LocalCity lat={66.66} lon={66.66}/>
    );
    let cur = component.toJSON();
    expect(cur).toMatchSnapshot();
});

it('Loading', () => {
    let component = renderer.create(
        <LocalCity lat={66.66} lon={66.66} loadState={true}/>
    );
    let cur = component.toJSON();
    expect(cur).toMatchSnapshot();
});

it('Server error', async () => {
    let axios = {
        get: () =>{
            return Promise.reject({
                response: {
                    status: 400
                }
            })
        }
    };
    let component = renderer.create(
        <div></div>
    );
    await renderer.act(() => {
        component = renderer.create(
            <LocalCity axios={axios} lat={66.66} lon={66.66}/>
        );
    });

    let cur = component.toJSON();
    expect(cur).toMatchSnapshot();
});

it('City not found', async () => {
    let axios = {
        get: () =>{
            return Promise.reject({
                response: {
                    status: 404
                }
            })
        }
    };
    let component = renderer.create(
        <div></div>
    );

    await renderer.act(() => {
        component = renderer.create(
            <LocalCity axios={axios} lat={66.66} lon={66.66}/>
        );
    });

    let cur = component.toJSON();
    expect(cur).toMatchSnapshot();
});

it('Network error', async () => {
    let axios = {
        get: () =>{
            return Promise.reject({
                response: null
            })
        }
    };
    let component = renderer.create(
        <div></div>
    );

    await renderer.act(() => {
        component = renderer.create(
            <LocalCity axios={axios} lat={66.66} lon={66.66}/>
        );
    });

    let cur = component.toJSON();
    expect(cur).toMatchSnapshot();
});
