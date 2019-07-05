import LineNumbers from "../LineNumbers";
import {shallow} from "enzyme";
import * as React from "react";

it('matches snapshot', () => {
    const lineNumbers = shallow(
        <LineNumbers
            program={`
            HelloWorld
            `}
        />
    );
    expect(lineNumbers).toMatchSnapshot();
});
