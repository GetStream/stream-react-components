import React from "react";
import stream from "getstream";
let streamClient;

class Feed extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.feedToken) {
            throw new Error("`feedToken` prop is required.");
        }
        if (!this.props.feedSlug) {
            throw new Error("`feedSlug` prop is required.");
        }
        if (!this.props.feedID) {
            throw new Error("`feedID` prop is required.");
        }
        this.feed = streamClient.feed(this.props.feedSlug, this.props.feedID, this.props.feedToken);
        this.state = {
            activities: []
        };
    }
    componentDidMount() {
        // make call to stream API, load activities into state
        this
            .feed
            .get()
            .then(response => {
                this.setState({activities: response.results});
            });
    }
    render() {
        return <div>{
                this
                    .state
                    .activities
                    .map((activity) => {
                        return (<div key={activity.id}>{activity.id}</div>);
                    })
            }</div>;
    }
}

export default streamKey => {
    // singletonning stream client with JS closure
    if (!streamClient) {
        streamClient = stream.connect(streamKey);
    }
    return {Feed};
};
