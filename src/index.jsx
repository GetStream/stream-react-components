import stream from "getstream";
import Feed from "./Feed.jsx";

let streamClient;

export default(streamKey, streamAppID) => {
    // singletonning stream client with JS closure
    if (!streamClient) {
        streamClient = stream.connect(streamKey, null, streamAppID);
    }
    return {Feed: Feed(streamClient)};
};
