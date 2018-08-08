# `StreamReactComponents` constructor

The `StreamReactComponents` constructor ensures that only one instance of the client-side Stream library is created for all the components on the page.

The only parameter is your Stream app key, which can be found in the "App Access Keys" section of your app on the Stream dashboard (<https://getstream.io/dashboard/>).

`StreamReactComponents` returns an object of all the React components specified in the [Components section](#components).

### Usage

```jsx
import StreamReactComponents from "stream-react-components";

let { Feed } = StreamReactComponents("yourStreamAppKey")
```
