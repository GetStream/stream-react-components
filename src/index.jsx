import stream from "getstream";
import Feed from "./Feed.jsx";

let streamClient;

export default streamKey => {
    // singletonning stream client with JS closure
    if (!streamClient) {
        streamClient = stream.connect(streamKey);
        this.streamClient = streamClient;
    }
    return {Feed: Feed(streamClient)};
};
