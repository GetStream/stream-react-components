## Creating the `Feed` component in your react app, and using the read-only feed token

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
