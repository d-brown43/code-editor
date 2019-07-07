import defaultProgram from "../defaultProgram";

it('returns the default program', () => {
    expect(defaultProgram()).toEqual(`console.log('Hello World');


`);
});
