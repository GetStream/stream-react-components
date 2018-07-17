import React from "react";
const Activity = (props) => {
    return (<div key={props.id}>
        {props.userEmail}: {props.message}
    </div>);
};

export default Activity;
