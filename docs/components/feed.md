# Feed component

## Props

| Prop                                                        | Type      | Description                                                                            | Required |
| ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------- | :------: |
| `feedToken`                                                 | String    | the server-generated read-only token for this feed                                     |     ✓    |
| `feedSlug`                                                  | String    | the name of your feed group - e.g. `profile`                                           |     ✓    |
| `feedID`                                                    | String    | the ID of the feed you'd like to retrieve - e.g. `1234`                                |     ✓    |
| [`activityComponent`](#custom-activity-component)           | Component | the activity component you'd like to render for each activity in the feed              |          |
| [`activityGroupComponent`](#custom-activitygroup-component) | Component | the custom activity that you'd like to render                                          |          |
| [`render`](#custom-renderer)                                | Function  | a function called with an `activities` argument, that will render in place of the feed |          |

## Usage

All you need is a `feedToken`, `feedSlug`, and `feedID` to use the default version of the `Feed`:

```jsx
<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} />
```

### Custom Activity Component

If you'd like to customize what component is displayed for each activity, you can use the `activityComponent` prop.

`activityComponent` should be a React component that can accept an `activity` prop.

```jsx
const MyCustomActivity = (props) => {
    return (<div>my custom activity: {props.activity.id}, {props.activity.actor}, {props.activity.verb}, {props.activity.object}</div>);
}

<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} activityComponent={MyCustomActivity}/>
```

### Custom ActivityGroup Component

If you're retrieving an **aggregated feed** and you'd like to customize what component is displayed for each activity group, you can use the `activityGroupComponent` prop.

`activityGroupComponent` should be a React component that can accept an `activityGroup` prop.

```jsx
const MyCustomActivityGroup = (props) => {
    return (<div>my custom activity group: {props.activityGroup.id}, {props.activityGroup.group}, {props.activityGroup.verb}, {props.activityGroup.activity_count}</div>);
}

<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} activityComponent={MyCustomActivityGroup}/>
```

### Custom renderer

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
