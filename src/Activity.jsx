import React from "react";

const ActivityContainer = props => {
    return (<div className="activity" key={props.id}>
        {props.userEmail}: {props.message}
    </div>);
};

export default ActivityContainer;
