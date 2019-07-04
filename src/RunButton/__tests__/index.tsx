import RunButton from "../index";
import * as React from "react";
import {shallow} from "enzyme";
import {render, cleanup, fireEvent} from '@testing-library/react'

it('matches snapshot', () => {
    const runButton = shallow(<RunButton run={jest.fn()} />);
    expect(runButton).toMatchSnapshot();
});

describe('functionality', () => {
    afterEach(cleanup);

    it('calls run on click', () => {
        const run = jest.fn();
        const {getByText} = render(<RunButton run={run} />);
        const button = getByText('Run');
        fireEvent.click(button);
        expect(run).toHaveBeenCalled();
    });
});
