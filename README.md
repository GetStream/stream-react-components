> **`stream-react-components` is no longer maintained and is archived.** It was the Feeds v2 React components. New projects should use Feeds v3 with [`stream-feeds-js`](https://github.com/GetStream/stream-feeds-js). See https://getstream.io/activity-feeds/sdk/react/

# Stream React Components

Docs and tutorials are located at <https://stream.gitbook.io/stream-react-components/>

Stream React Components provide a couple of features out of the box:

-   **Retrieval of feeds, client-side** - no server-side integration needed (besides initial token generation)
-   **Completely customizable activity components and render methods**
-   **[Automatic pagination](https://stream.gitbook.io/stream-react-components/pagination)** for long feeds
-   **[Realtime websocket connections](https://stream.gitbook.io/stream-react-components/realtime)** to Stream for newly added activities
-   **[Clean, minimalistic styling](https://stream.gitbook.io/stream-react-components/styling)** (that's also completely customizable and removable)

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

To get started, check out the step-by-step tutorial located at <https://stream.gitbook.io/stream-react-components/step-by-step-setup>.
