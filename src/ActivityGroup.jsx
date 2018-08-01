import React from "react";
import PropTypes from "prop-types";

const ActivityGroup = props => {
    let {
        activities,
        ...rest
    } = props.activityGroup;
    return (<div className="stream-react-components activity">
        <h1>activity group {props.activityGroup.id}</h1>
        <p>metadata:</p>
        <pre><code>
            {JSON.stringify(rest, null, "\t")}
        </code></pre>
        <p>activities:</p>
        <pre><code>
            {JSON.stringify(activities, null, "\t")}
        </code></pre>

    </div>);
};

ActivityGroup.propTypes = {
    activityGroup: PropTypes.shape({id: PropTypes.string.isRequired, activities: PropTypes.array.isRequired, activity_count: PropTypes.number.isRequired, actor_count: PropTypes.number.isRequired}).isRequired
};

export default ActivityGroup;
