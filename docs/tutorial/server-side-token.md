# Generating Stream client-side tokens

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

```txt
npm install express getstream cors
node server.js
```

Now, whenever you send an HTTP `GET` request to `http://localhost:9999/feeds/profile:1234/token`, you'll get a read-only token for the feed `profile:1234`.
