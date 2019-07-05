import ConsoleLog from "../index";
import {shallow} from "enzyme";
import * as React from "react";
import {render, cleanup} from "@testing-library/react";

it('matches snapshots', () => {
    const consoleLog = shallow(
        <ConsoleLog
            logMessages={[{
                message: 'Hello World',
                type: "log"
            }]}
        />
    );
    expect(consoleLog).toMatchSnapshot();
});

describe('behaviour', () => {
    afterEach(cleanup);

    it('renders given content', () => {
        const {getByText} = render(
            <ConsoleLog
                logMessages={[
                    {
                        message: 'Hello World',
                        type: "log",
                    },
                    {
                        message: 'Hello 2',
                        type: "log",
                    }
                ]}
            />
        );
        expect(() => getByText(/Hello World/)).not.toThrow();
        expect(() => getByText(/Hello 2/)).not.toThrow();
    });
});
