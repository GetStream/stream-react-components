let stream = jest.genMockFromModule("getstream");

import {flatFeedSampleResponse, aggregatedFeedSampleResponse} from "../test-data";

stream.connect.mockReturnValue({
    feed: (feedSlug) => {
        return {
            get: () => {
                return new Promise((resolve) => {
                    if (feedSlug === "timeline") {
                        resolve(aggregatedFeedSampleResponse);
                    } else {
                        resolve(flatFeedSampleResponse);
                    }
                });
            },
            subscribe: () => {},
            cancel: () => {}
        };
    }
});

export default stream;
