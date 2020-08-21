![Node.js Package](https://github.com/modls/redux/workflows/Node.js%20Package/badge.svg)

# modls Redux

## How To Use modls Redux

Install the module via `npm i @modls/redux` and consume it as such:

```js
import { connect } from "@modls/redux";
```

Alternatively you can use a CDN such as unpkg:

```js
import { connect } from "https://unpkg.com/@modls/redux";
```

## Example

```js
export default registerComponent(
  connect(store)(mapStateToProps, mapDispatchToProps)(Component)
);
```
