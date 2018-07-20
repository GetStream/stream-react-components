import React from "react";
import Activity from "./Activity.jsx";
import PropTypes from "prop-types";

export default(streamClient) => {
    return class Feed extends React.Component {
        static propTypes = {
            feedToken: PropTypes.string.isRequired,
            feedSlug: PropTypes.string.isRequired,
            feedID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            render: PropTypes.func,
            activityComponent: PropTypes.element
        }

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

            // connect realtime feed
            this.feed.subscribe((data) => {
                this.setState({
                    activities: [...data.new.concat(this.state.activities)]
                });
            });
        }
        componentWillUnmount() {
            this.feed.cancel();
        }
        render() {
            // custom renderer
            if (this.props.render) {
                return this.props.render(this.state.activities);
            } else if (this.props.activityComponent) {
                let CustomActivityComponent = this.props.activityComponent;
                return (<div className="stream-react-components feed">
                    {
                        this.state.activities.map((activity) => {
                            return (<CustomActivityComponent activity={activity} key={activity.id}></CustomActivityComponent>);
                        })
                    }
                </div>);
            } else {
                return <div className="stream-react-components feed">{
                        this.state.activities.map((activity) => {
                            return (<Activity activity={activity} key={activity.id}></Activity>);
                        })
                    }</div>;
            }
        }
    };
};
