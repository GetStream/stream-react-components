import React from "react";
import PropTypes from "prop-types";

const Activity = props => {
    return (<div className="stream-react-components activity">
        <pre><code>
            {JSON.stringify(props.activity, null, "\t")}
        </code></pre>
    </div>);
};

Activity.propTypes = {
    activity: PropTypes.shape({actor: PropTypes.string.isRequired, object: PropTypes.string.isRequired, verb: PropTypes.string.isRequired}).isRequired
};

export default Activity;
