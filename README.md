# Stream React Components

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

## Table of contents

-   [Setup](#setup)
    -   [Creating a new React app](#creating-a-new-react-app)
    -   [Creating a new Stream app + feed group](#creating-a-new-stream-app--feed-group)
    -   [Returning a read-only feed token from the server](#returning-a-read-only-feed-token-from-the-server)
    -   [Creating the `Feed` component in your react app, and using the read-only feed token](#creating-the-feed-component-in-your-react-app-and-using-the-read-only-feed-token)
-   [Components](#components)

## Setup

**tl;dr:**

1.  Include `stream-react-components` in your React app
2.  Create a Stream app at <https://getstream.io/dashboard>, and create a feed group
3.  Create a read-only feed token server-side, pass it to the React app and include it in your `Feed` components

### Creating a new React app

The easiest way to create a new React app is with [`create-react-app`](https://github.com/facebook/create-react-app).

```txt
npx create-react-app my-stream-react-components-app
cd my-stream-react-components-app
npm start
```

Now you have a `create-react-app` app running at `http://localhost:3000`.

You don't have to use `create-react-app` to use Stream's React components - you can just integrate them in like you would any other component

### Creating a new Stream app + feed group

1.  Head on over to <https://getstream.io/dashboard>, and create an account if necessary
2.  Click the "Create App" button in the upper right, fill out and submit the form
    -   Name doesn't matter
    -   Select the server location closest to you
    -   Production vs development doesn't matter, but you'll only be able to delete data with a "development" app
3.  From within your app, click the "Add Feed Group" button in the middle, name your feed group "profile", and select a "Flat" feed
    -   Your feed group name doesn't actually matter - "profile" is just convenient, but you can name it whatever you'd like
    -   For now, only a flat feed is supported - notification and aggregated feeds will be supported soon!
    -   Realtime can be on or off
4.  At the bottom of the page, you'll see your Stream "Key" and "Secret" - you'll use those later

### Returning a read-only feed token from the server

To use Stream's React Components, you'll need to provide a server-side-generated read-only "feed token" to the Feed components via props.

Here's a tiny Node.js server that will do that for you:

```javascript
// server.js

// DO NOT USE THIS EXACT COPY-PASTED CODE IN PRODUCTION
// To run this locally, you'll first need to replace streamKey, streamSecret, and streamAppID with your own values.
// To run this in production, please don't check streamKey, streamSecret, and streamAppID into version control.
// Assigned reading can be found at https://12factor.net/config and https://www.npmjs.com/package/dotenv.
let streamKey = "sxummmsqa6vt"
let streamSecret = "3wmh6q8ezdutw5pxeh7rbkxenzxnct7dwy3a9gkgkrbg9m2dn56egpcvbme28v3j"
let streamAppID = "39366"

// dependencies
const express = require('express');
const stream = require('getstream');
const cors = require("cors");

// initialize Stream client server-side
const streamClient = stream.connect(streamKey, streamSecret, streamAppID)

let app = express();

// by default, this server runs on localhost:9999, so you'll need CORS support if you're serving your web app from another port.
app.use(cors())

app.get('/feeds/:feedID/token', (req, res) => {
    // req.params.feedID will usually look something like `profile:1234`
    let [slug, id] = req.params.feedID.split(":") // this splits the "profile" and "1234" into separate variables, using array destructuring, but is only available in ES6 (node.js 6+)
    let token = streamClient.feed(slug, id).getReadOnlyToken();
    res.send(token);
});

console.log('Server starting...');
app.listen(9999, () => {
    console.log('Listening on 9999');
});
```

To start this little server, run the following commands:

```txt
npm install express getstream cors
node server.js
```

Now, whenever you send an HTTP `GET` request to `http://localhost:9999/feeds/profile:1234/token`, you'll get a read-only token for the feed `profile:1234`.

### Creating the `Feed` component in your react app, and using the read-only feed token

If you're using `create-react-app`, the best place to put this is in your `src/App.js` file.

Replace the contents of that file with this (you'll also need to install the `axios` and the `stream-react-components` dependencies, and replace `yourStreamAppKey`):

```jsx
import React from 'react';
import StreamReactComponents from 'stream-react-components';
import axios from "axios";

let {Feed} = StreamReactComponents("yourStreamAppKey", "yourStreamAppID");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedToken: null
        }
    }
    componentDidMount() {
        axios.get("http://localhost:9999/feeds/profile:1234/token").then(response => {
            this.setState({feedToken: response.data});
        })
    }
    render() {
        if (this.state.feedToken) {
            return (<div>
                <h1>Stream React Component example</h1>
                <Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234}/>
            </div>)
        } else {
            return null
        }
    }
}

export default App;
```

Otherwise, just fetch the read-only feed token and include it in the `Feed` component.

## `StreamReactComponents` constructor

The `StreamReactComponents` constructor ensures that only one instance of the client-side Stream library is created for all the components on the page.

The only parameter is your Stream app key, which can be found in the "App Access Keys" section of your app on the Stream dashboard (<https://getstream.io/dashboard/>).

`StreamReactComponents` returns an object of all the React components specified in the [Components section](#components).

### Usage

```jsx
import StreamReactComponents from "stream-react-components";

let { Feed } = StreamReactComponents("yourStreamAppKey")
```

## Components

### Feed

#### Usage

All you need is a `feedToken`, `feedSlug`, and `feedID` to use the default version of the `Feed`:

```jsx
<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} />
```

##### Custom Activity Component

If you'd like to customize what activity component is displayed within the feed, you can use the `activityComponent` prop:

```jsx
const MyCustomActivity = (props) => {
    return (<div>my custom activity: {props.id}</div>);
}

<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} activityComponent={MyCustomActivity}/>
```

##### Custom renderer

If you'd like to do away with the default `Feed` subcomponents, you can pass in a function to the `render` prop that takes one `activities` argument:

```jsx
<Feed feedToken={this.state.feedToken} feedSlug={"profile"} feedID={1234} render={(activities) => {
        return (<React.Fragment>
            <h1>my custom renderer</h1>
            {
                activities.map((activity) => {
                    return (<div key={activity.id}>my custom activity: {activity.id}</div>)
                })
            }
            </React.Fragment>)
    }
}/>
```

#### Props

| Prop                | Description                                             | Required | Default  |
| ------------------- | ------------------------------------------------------- | :------: | -------- |
| `feedToken`         | the server-generated read-only token for this feed      |     ✓    |          |
| `feedSlug`          | the name of your feed group - e.g. `profile`            |     ✓    |          |
| `feedID`            | the ID of the feed you'd like to retrieve - e.g. `1234` |     ✓    |          |
| `activityComponent` | the custom activity that you'd like to render           |          | Activity |
| `render`            |                                                         |          |          |

##### Callback props
