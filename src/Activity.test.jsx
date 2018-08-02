import React from "react";
import Activity from "./Activity.jsx";
import renderer from "react-test-renderer";

test("Activity renders correctly", () => {
    let sampleActivity = {
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
    };
    const component = renderer.create(<Activity activity={sampleActivity}></Activity>).toJSON();
    expect(component).toMatchSnapshot();
});
