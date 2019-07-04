import * as React from "react";
import Controls from "../index";
import {shallow} from "enzyme";

it('matches snapshot', () => {
    const run = jest.fn()
    const console = shallow(<Controls run={run} />);
    expect(console).toMatchSnapshot();
});
