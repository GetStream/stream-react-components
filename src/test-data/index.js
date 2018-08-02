const flatFeedSampleResponse = {
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
}

const aggregatedFeedSampleResponse = {
    "results": [
        {
            "activities": [
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
            ],
            "activity_count": 3,
            "actor_count": 3,
            "created_at": "2018-07-26T21:42:17.305870",
            "group": "add-activity_2018-07-26-21-42",
            "id": "c57c7047-911c-11e8-8080-80015c4222d7",
            "updated_at": "2018-07-26T21:42:19.317869",
            "verb": "add-activity"
        }, {
            "activities": [
                {
                    "actor": "jeremy@getstream.io",
                    "foreign_id": "",
                    "id": "b3fcad9a-911c-11e8-8d99-12cb9e7b86a4",
                    "message": "Craft beer sriracha plaid YOLO hexagon cloud bread.",
                    "object": "some-object",
                    "origin": "profile:1234",
                    "target": "",
                    "time": "2018-07-26T21:41:49.959311",
                    "userEmail": "jeremy@getstream.io",
                    "userName": "Jeremy Magean",
                    "verb": "add-activity"
                }
            ],
            "activity_count": 1,
            "actor_count": 1,
            "created_at": "2018-07-26T21:41:49.965442",
            "group": "add-activity_2018-07-26-21-41",
            "id": "b3fd9d19-911c-11e8-8080-800104ee9e36",
            "updated_at": "2018-07-26T21:41:49.965442",
            "verb": "add-activity"
        }
    ],
    "next": "",
    "duration": "19.34ms"
}

export {
    flatFeedSampleResponse,
    aggregatedFeedSampleResponse
}
