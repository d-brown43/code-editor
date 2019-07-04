import ConsoleLog from "../index";
import {shallow} from "enzyme";
import * as React from "react";
import {render, cleanup} from "@testing-library/react";

it('matches snapshots', () => {
    const consoleLog = shallow(
        <ConsoleLog logMessages={['Hello World']} />
    );
    expect(consoleLog).toMatchSnapshot();
});

describe('behaviour', () => {
    afterEach(cleanup);

    it('renders given content', () => {
        const {getByText} = render(
            <ConsoleLog
                logMessages={[
                    'Hello World',
                    'Hello 2'
                ]}
            />
        );
        expect(() => getByText('Hello World')).not.toThrow();
        expect(() => getByText('Hello 2')).not.toThrow();
    });
});
