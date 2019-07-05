import ConsoleMessage from "../ConsoleMessage";
import {shallow} from "enzyme";
import * as React from "react";

it('matches snapshot', () => {
    const consoleMessage = shallow(
        <ConsoleMessage message={'Hello World'} />
    );
    expect(consoleMessage).toMatchSnapshot();
});

it('matches snapshot', () => {
    const consoleMessage = shallow(
        <ConsoleMessage message={{a: 1, b: 2}} />
    );
    expect(consoleMessage).toMatchSnapshot();
});

it('matches snapshot', () => {
    const consoleMessage = shallow(
        <ConsoleMessage message={[1, 2, 3]} />
    );
    expect(consoleMessage).toMatchSnapshot();
});

it('matches snapshot', () => {
    const consoleMessage = shallow(
        <ConsoleMessage message={undefined} />
    );
    expect(consoleMessage).toMatchSnapshot();
});

it('matches snapshot', () => {
    const consoleMessage = shallow(
        <ConsoleMessage message={null} />
    );
    expect(consoleMessage).toMatchSnapshot();
});
