import React from 'react'
import renderer from 'react-test-renderer'
import Loader from '../classes/loader'

it('Loader rendering', () => {
    let component = renderer.create(
        <Loader />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});