import stream from "getstream";
import Feed from "./Feed.jsx";

let streamClient;

export default(streamKey) => {
    // singletonning stream client with JS closure
    if (!streamClient) {
        streamClient = stream.connect(streamKey);
    }
    return {Feed: Feed(streamClient)};
};
