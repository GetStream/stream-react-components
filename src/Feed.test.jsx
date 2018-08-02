import StreamReactComponents from "./index.jsx";
import renderer from "react-test-renderer";
import React from "react";
jest.mock("getstream");

let {Feed} = StreamReactComponents("sxummmsqa6vt", "39366");

test("Feed renders stream flat feed correctly", (done) => {
    const component = renderer.create(<Feed feedSlug="profile" feedToken={"asdfasdfasdf"} feedID={1234}></Feed>);
    // need to let component mount, and for promises to resolve
    process.nextTick(() => {
        let output = component.toJSON();
        expect(output).toMatchSnapshot();
        done();
    });
});

test("Feed renders stream aggregated feed correctly", (done) => {
    const component = renderer.create(<Feed feedSlug="timeline" feedToken={"asdfasdfasdf"} feedID={1234}></Feed>);
    // need to let component mount, and for promises to resolve
    process.nextTick(() => {
        let output = component.toJSON();
        expect(output).toMatchSnapshot();
        done();
    });
});
