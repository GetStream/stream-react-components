import React from "react";

const Activity = props => {
    return (<div className="stream-react-components activity">
        <pre><code>
            {JSON.stringify(props.activity, null, "\t")}
        </code></pre>

    </div>);
};

export default Activity;
