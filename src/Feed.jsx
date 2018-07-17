import React from "react";
import Activity from "./Activity.jsx";

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
            } else if (this.props.activityComponent) {
                let CustomActivityComponent = this.props.activityComponent;
                return (<React.Fragment>
                    {
                        this.state.activities.map((activity) => {
                            return (<CustomActivityComponent {...activity} key={activity.id}></CustomActivityComponent>);
                        })
                    }
                </React.Fragment>);
            } else {
                return <div>{
                        this.state.activities.map((activity) => {
                            return (<Activity {...activity} key={activity.id}></Activity>);
                        })
                    }</div>;
            }
        }
    };
};
