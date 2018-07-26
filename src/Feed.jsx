import React from "react";
import Activity from "./Activity.jsx";
import ActivityGroup from "./ActivityGroup.jsx";
import PropTypes from "prop-types";
import Waypoint from "react-waypoint";

export default(streamClient) => {
    return class Feed extends React.Component {
        static propTypes = {
            feedToken: PropTypes.string.isRequired,
            feedSlug: PropTypes.string.isRequired,
            feedID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            render: PropTypes.func,
            activityComponent: PropTypes.element,
            activityGroupComponent: PropTypes.element
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
                activityGroups: [],
                lastActivityID: null,
                lastActivityGroupID: null,
                isAggregated: false
            };
        }
        componentDidMount() {

            this.setState({loading: true});
            // make call to stream API, load activities into state
            this.feed.get().then(response => {
                // check to see if it's an aggregated feed
                if (response.results.length > 0 && response.results[0].activity_count !== undefined) {
                    this.setState({
                        loading: false,
                        activityGroups: response.results,
                        lastActivityGroupID: response.results[response.results.length - 1].id,
                        isAggregated: true
                    });
                } else {
                    this.setState({
                        loading: false,
                        activities: response.results,
                        lastActivityID: response.results[response.results.length - 1].id
                    });
                }
            });

            // connect realtime feed
            this.feed.subscribe((data) => {
                // todo - tweak this a little bit, as data might returned changed or removed activities
                // more todo - "verb" on aggregated feeds might be a little different, depending on the aggregation format. investigate how activity group metadata changes with aggregation format changes.
                // if this is an aggregated feed with 0 activity groups, (e.g., the isAggregated flag isn't set) just pretend it's a normal feed, as behavior won't change.

                if (this.state.isAggregated) {
                    let newActivityGroups = data.new.map((activity) => {
                        return {
                            activity_count: 1,
                            actor_count: 1,
                            created_at: activity.time,
                            group: activity.id,
                            id: activity.id,
                            updated_at: activity.time,
                            activities: [activity]
                        };
                    });
                    this.setState({
                        activityGroups: [
                            ...newActivityGroups,
                            ...this.state.activityGroups
                        ]
                    });
                } else {
                    this.setState({
                        activities: [
                            ...data.new,
                            ...this.state.activities
                        ]
                    });
                }
            });
        }
        componentWillUnmount() {
            this.feed.cancel();
        }
        handleScrolledToBottom = () => {
            this.setState({loading: true});
            // make call to stream API, load activities into state
            // todo - clean this up a little bit, DRY
            if (this.state.isAggregated) {
                this.feed.get({id_lt: this.state.lastActivityGroupID}).then(response => {
                    if (response.results.length == 0) {
                        return this.setState({loading: false, reachedEndOfFeed: true});
                    }
                    this.setState({
                        activityGroups: [
                            ...this.state.activityGroups,
                            ...response.results
                        ],
                        lastActivityGroupID: response.results[response.results.length - 1].id,
                        loading: false
                    });
                });
            } else {
                this.feed.get({id_lt: this.state.lastActivityID}).then(response => {
                    if (response.results.length == 0) {
                        return this.setState({loading: false, reachedEndOfFeed: true});
                    }
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
        }
        render() {
            let waypoint = !this.state.loading && !this.state.reachedEndOfFeed
                ? (<Waypoint onEnter={this.handleScrolledToBottom}></Waypoint>)
                : null;

            // basically splitting into two types of feeds - flat and aggregated
            if (this.state.isAggregated) {
                // custom renderer
                if (this.props.render) {
                    return this.props.render(this.state.activityGroups);
                } else if (this.props.activityGroupComponent) {
                    let CustomActivityGroupComponent = this.props.activityGroupComponent;
                    return (<div className="stream-react-components feed">
                        {
                            this.state.activityGroups.map((activityGroup) => {
                                return (<CustomActivityGroupComponent activityGroup={activityGroup} key={activityGroup.id}></CustomActivityGroupComponent>);
                            })
                        }{waypoint}
                    </div>);
                } else {
                    return <div className="stream-react-components feed">{
                            this.state.activityGroups.map((activityGroup) => {
                                return (<ActivityGroup activityGroup={activityGroup} key={activityGroup.id}></ActivityGroup>);
                            })
                        }
                        {waypoint}
                    </div>;
                }
            } else {
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
        }
    };
};
