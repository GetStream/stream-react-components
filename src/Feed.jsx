import React from "react";

export default(streamClient) => {
    return class Feed extends React.Component {
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
            this.feed.get().then(response => {
                this.setState({activities: response.results});
            });
        }
        render() {
            // custom renderer
            if (this.props.render) {
                return this.props.render(this.state.activities);
            } else {
                return <div>{
                        this.state.activities.map((activity) => {
                            return (<div key={activity.id}>
                                {activity.userEmail}: {activity.message}
                            </div>);
                        })
                    }</div>;
            }
        }
    };
};
