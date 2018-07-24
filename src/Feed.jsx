import React from "react";
import Activity from "./Activity.jsx";
import PropTypes from "prop-types";
import Waypoint from "react-waypoint";

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
                activities: [],
                lastActivityID: null
            };
        }
        componentDidMount() {

            this.setState({loading: true});
            // make call to stream API, load activities into state
            this.feed.get().then(response => {
                this.setState({
                    loading: false,
                    activities: response.results,
                    lastActivityID: response.results[response.results.length - 1].id
                });
            });

            // connect realtime feed
            this.feed.subscribe((data) => {
                // todo - tweak this a little bit, as data might returned changed or removed activities
                this.setState({
                    activities: [...data.new.concat(this.state.activities)]
                });
            });
        }
        componentWillUnmount() {
            this.feed.cancel();
        }
        handleScrolledToBottom = () => {
            this.setState({loading: true});
            // make call to stream API, load activities into state
            this.feed.get({id_lt: this.state.lastActivityID}).then(response => {
                this.setState({
                    activities: [
                        ...this.state.activities,
                        ...response.results
                    ],
                    lastActivityID: response.results[response.results.length - 1].id,
                    loading: false
                });
            });
        }
        render() {
            let waypoint = this.state.loading
                ? null
                : (<Waypoint onEnter={this.handleScrolledToBottom}></Waypoint>);
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
                    }{waypoint}
                </div>);
            } else {
                return <div className="stream-react-components feed">{
                        this.state.activities.map((activity) => {
                            return (<Activity activity={activity} key={activity.id}></Activity>);
                        })
                    }
                    {waypoint}
                </div>;
            }
        }
    };
};
