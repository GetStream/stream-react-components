# Generating Stream client-side tokens

## Returning a read-only feed token from the server

To use Stream's React Components, you'll need to provide a server-side-generated read-only "feed token" to the Feed components via props.

Here's a tiny Node.js server that will do that for you:

```javascript
// server.js

// DO NOT USE THIS EXACT COPY-PASTED CODE IN PRODUCTION
// To run this locally, you'll first need to replace streamKey, streamSecret, and streamAppID with your own values.
// To run this in production, please don't check streamKey, streamSecret, and streamAppID into version control.
// Assigned reading can be found at https://12factor.net/config and https://www.npmjs.com/package/dotenv.
let streamKey = "yourStreamAppKey"
let streamSecret = "yourStreamSecretKey"
let streamAppID = "yourStreamAppID"

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

```text
npm install express getstream cors
node server.js
```

Now, whenever you send an HTTP `GET` request to `http://localhost:9999/feeds/profile:1234/token`, you'll get a read-only token for the feed `profile:1234`.

## Creating a new React app

The easiest way to create a new React app is with [`create-react-app`](https://github.com/facebook/create-react-app).

```text
npx create-react-app my-stream-react-components-app
cd my-stream-react-components-app
npm start
```

Now you have a `create-react-app` app running at `http://localhost:3000`.

You don't have to use `create-react-app` to use Stream's React components - you can just integrate them in like you would any other component.

## Creating the `Feed` component in your react app, and using the read-only feed token

If you're using `create-react-app`, the best place to put this is in your `src/App.js` file.

Replace the contents of that file with this \(you'll also need to install the `axios` and the `stream-react-components` dependencies, and replace `yourStreamAppKey`\):

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

