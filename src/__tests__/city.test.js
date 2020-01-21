import renderer from "react-test-renderer";
import City from '../classes/city'
import React from "react";

const data = {
            "data": {
                "coord": {
                    "lon": 66.66,
                    "lat": 66.66
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
};

it('Rendered', () => {
    let component = renderer.create(
        <City data={data.data}/>
    );
    let cur = component.toJSON();
    expect(cur).toMatchSnapshot();
});
