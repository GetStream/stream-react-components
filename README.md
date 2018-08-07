# Stream React Components

Stream React Components provide a couple of features out of the box:

-   **Retrieval of feeds, client-side** - no server-side integration needed (besides initial token generation)
-   **Completely customizable activity components and render methods**
-   **[Automatic pagination](#pagination)** for long feeds
-   **[Realtime websocket connections](#realtime)** to Stream for newly added activities
-   **[Clean, minimalistic styling](#styling)** (that's also completely customizable and removable)

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import StreamReactComponents from 'stream-react-components';

let {Feed} = StreamReactComponents(yourStreamAppKey, yourStreamAppID);

ReactDOM.render(
    <Feed feedToken={someFeedTokenYouGotAsynchronously} feedSlug={"profile"} feedID={1234}/>,
    document.getElementById('app')
);
```

## Setup

**tl;dr:**

1.  Include `stream-react-components` in your React app
2.  Create a Stream app at <https://getstream.io/dashboard>, and create a feed group
    -   Check out [Creating a new Stream app](/docs/create-stream-app.md)
3.  Create a read-only feed token server-side, pass it to the React app and include it in your `Feed` components
    -   Check out [Generating Stream client-side tokens](/docs/server-side-token.md).

## `StreamReactComponents` constructor

The `StreamReactComponents` constructor ensures that only one instance of the client-side Stream library is created for all the components on the page.

The only parameter is your Stream app key, which can be found in the "App Access Keys" section of your app on the Stream dashboard (<https://getstream.io/dashboard/>).

`StreamReactComponents` returns an object of all the React components specified in the [Components section](#components).

### Usage

```jsx
import StreamReactComponents from "stream-react-components";

let { Feed } = StreamReactComponents("yourStreamAppKey")
```

## Styling

The base stylesheet is located at [`/css/index.css`](/css/index.css).

If you'd like to customize the styling, you can override the styles on the `feed` and `activity` classes, or remove the stylesheet altogether!

## Components

### Feed

#### Props

| Prop                                                        | Type      | Description                                                                            | Required |
| ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------- | :------: |
| `feedToken`                                                 | String    | the server-generated read-only token for this feed                                     |     ✓    |
| `feedSlug`                                                  | String    | the name of your feed group - e.g. `profile`                                           |     ✓    |
| `feedID`                                                    | String    | the ID of the feed you'd like to retrieve - e.g. `1234`                                |     ✓    |
| [`activityComponent`](#custom-activity-component)           | Component | the activity component you'd like to render for each activity in the feed              |          |
| [`activityGroupComponent`](#custom-activitygroup-component) | Component | the custom activity that you'd like to render                                          |          |
| [`render`](#custom-renderer)                                | Function  | a function called with an `activities` argument, that will render in place of the feed |          |

#### Usage

All you need is a `feedToken`, `feedSlug`, and `feedID` to use the default version of the `Feed`:

```jsx
<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} />
```

##### Custom Activity Component

If you'd like to customize what component is displayed for each activity, you can use the `activityComponent` prop.

`activityComponent` should be a React component that can accept an `activity` prop.

```jsx
const MyCustomActivity = (props) => {
    return (<div>my custom activity: {props.activity.id}, {props.activity.actor}, {props.activity.verb}, {props.activity.object}</div>);
}

<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} activityComponent={MyCustomActivity}/>
```

##### Custom ActivityGroup Component

If you're retrieving an **aggregated feed** and you'd like to customize what component is displayed for each activity group, you can use the `activityGroupComponent` prop.

`activityGroupComponent` should be a React component that can accept an `activityGroup` prop.

```jsx
const MyCustomActivityGroup = (props) => {
    return (<div>my custom activity group: {props.activityGroup.id}, {props.activityGroup.group}, {props.activityGroup.verb}, {props.activityGroup.activity_count}</div>);
}

<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} activityComponent={MyCustomActivityGroup}/>
```

##### Custom renderer

If you'd like to do away with the default `Feed` subcomponents, you can pass in a function to the `render` prop that takes one `activities` argument (or `activityGroups` argument, if it's an aggregated feed):

```jsx
<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} render={(activities) => {
        return (<React.Fragment>
            <h1>my custom renderer</h1>
            {
                activities.map((activity) => {
                    return (<div key={activity.id}>my custom activity: {activity.id}, {activity.actor}, {activity.verb}, {activity.object}</div>)
                })
            }
            </React.Fragment>)
    }
}/>
```

##### Pagination

By default, each feed will load new activities when the bottom of the feed scrolls into the viewport, using `react-waypoint`.

##### Realtime

By default, new activities will be added instantly to the feed when Stream pushes them down the websocket.
