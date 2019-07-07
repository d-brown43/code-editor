import StopButton from "../StopButton";
import * as React from "react";
import {shallow} from "enzyme";

it('matches snapshot', () => {
    const stopButton = shallow(
        <StopButton stop={jest.fn()} />
    );
    expect(stopButton).toMatchSnapshot();
});
