import React from "react";

const ActivityContainer = props => {
    return (<div className="stream-react-components activity" key={props.id}>
        <pre><code>
            {JSON.stringify(props.activity, null, "\t")}
        </code></pre>

    </div>);
};

export default ActivityContainer;
