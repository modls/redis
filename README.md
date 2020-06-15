![Node.js Package](https://github.com/DominicVonk/BaseWebComponent-Redux/workflows/Node.js%20Package/badge.svg)

# Base WebComponent Redux

## How To Use BaseWebComponent Redux

Install the module via `npm i base-webcomponent-redux` and consume it as such:

```js
import { connect } from "base-webcomponent-redux";
```

Alternatively you can use a CDN such as unpkg:

```js
import { connect } from "https://unpkg.com/base-webcomponent-redux";
```

## Example

```js
export default BWC(
  connect(store)(mapStateToProps, mapDispatchToProps)(Component)
);
```
