import React from "react";

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

export default ActivityGroup;
