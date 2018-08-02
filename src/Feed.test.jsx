import StreamReactComponents from "./index.jsx";
import renderer from "react-test-renderer";
import React from "react";
import stream from "getstream";

jest.mock("getstream");

let dummyData = {
    "results": [
        {
            "actor": "balazs@getstream.io",
            "foreign_id": "",
            "id": "c57b8fa0-911c-11e8-8f9d-0a081e7097fe",
            "message": "Kinfolk banh mi salvia drinking vinegar.",
            "object": "some-object",
            "origin": null,
            "target": "",
            "time": "2018-07-26T21:42:19.312119",
            "userEmail": "balazs@getstream.io",
            "userName": "Balazs Horanyi",
            "verb": "add-activity"
        }, {
            "actor": "ken@getstream.io",
            "foreign_id": "",
            "id": "c4e6cb40-911c-11e8-8db5-12cb9e7b86a4",
            "message": "Kinfolk activated charcoal taiyaki, aesthetic tacos wolf farm-to-table enamel pin fixie slow-carb post-ironic.",
            "object": "some-object",
            "origin": null,
            "target": "",
            "time": "2018-07-26T21:42:18.337159",
            "userEmail": "ken@getstream.io",
            "userName": "Ken Hoff",
            "verb": "add-activity"
        }, {
            "actor": "thierry@getstream.io",
            "foreign_id": "",
            "id": "c448720b-911c-11e8-8db4-12cb9e7b86a4",
            "message": "Poke slow-carb letterpress knausgaard seitan.",
            "object": "some-object",
            "origin": null,
            "target": "",
            "time": "2018-07-26T21:42:17.299407",
            "userEmail": "thierry@getstream.io",
            "userName": "Thierry Schellenbach",
            "verb": "add-activity"
        }
    ],
    "next": "/api/v1.0/feed/profile/1234/?api_key=sxummmsqa6vt\u0026id_lt=03e6d67d-905a-11e8-935c-0a081e7097fe\u0026limit=25",
    "duration": "13.20ms"
};

stream.connect.mockReturnValue({
    feed: () => {
        return {
            get: () => {
                return new Promise((resolve) => {
                    resolve(dummyData);
                });
            },
            subscribe: () => {},
            cancel: () => {}
        };
    }
});

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
