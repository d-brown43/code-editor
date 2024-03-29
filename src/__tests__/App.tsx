import * as ReactDOM from "react-dom";
import App from "../App";
import * as React from "react";
import {shallow} from "enzyme";
import {cleanup} from "@testing-library/react";

afterEach(() => {
    cleanup();
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('matches snapshot', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
});

