import React from "react";
import styled from "styled-components";

const ActivityComponent = styled.div `
    background-color: white;
    padding: 1em;
    margin: 1em auto;
    border-radius: 1em;
    box-shadow: 0.1em 0.1em 1em 0.1em #cccccc;
    transition: transform 0.5s;
    cursor: pointer;
    max-width: 30em;

    &:hover {
        transform: scale(1.1);
    }
`;

const ActivityContainer = props => {
    return (<ActivityComponent key={props.id}>
        {props.userEmail}: {props.message}
    </ActivityComponent>);
};

export default ActivityContainer;
