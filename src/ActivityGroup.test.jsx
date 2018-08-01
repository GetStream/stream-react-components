import React from "react";
import ActivityGroup from "./ActivityGroup.jsx";
import renderer from "react-test-renderer";

test("Activity renders correctly", () => {
    let sampleActivityGroup = {
        "activity_count": 3,
        "actor_count": 3,
        "created_at": "2018-07-26T21:42:17.305870",
        "group": "add-activity_2018-07-26-21-42",
        "id": "c57c7047-911c-11e8-8080-80015c4222d7",
        "updated_at": "2018-07-26T21:42:19.317869",
        "verb": "add-activity",
        activities: [
            {
                "actor": "balazs@getstream.io",
                "foreign_id": "",
                "id": "c57b8fa0-911c-11e8-8f9d-0a081e7097fe",
                "message": "Kinfolk banh mi salvia drinking vinegar.",
                "object": "some-object",
                "origin": "profile:1234",
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
                "origin": "profile:1234",
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
                "origin": "profile:1234",
                "target": "",
                "time": "2018-07-26T21:42:17.299407",
                "userEmail": "thierry@getstream.io",
                "userName": "Thierry Schellenbach",
                "verb": "add-activity"
            }
        ]
    };
    const component = renderer.create(<ActivityGroup activityGroup={sampleActivityGroup}></ActivityGroup>).toJSON();
    expect(component).toMatchSnapshot();
});
