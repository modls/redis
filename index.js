import { WrapComponent } from "@modls/core";
const deepCopy = (inObject) => {
  let outObject, value, key;
  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }
  outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    value = inObject[key];
    outObject[key] = deepCopy(value);
  }
  return outObject;
};

export const connect = (store) => (mapStateToProps, mapDispatchToProps) => (
  className
) => {
  const _props = {};
  if (typeof mapDispatchToProps === "function") {
    let _mapProps = mapDispatchToProps(store.dispatch, store.getState);
    Object.keys(_mapProps).forEach((func) => {
      _props[func] = _mapProps[func];
    });
  } else if (typeof mapDispatchToProps === "object") {
    Object.keys(mapDispatchToProps).forEach((func) => {
      _props[func] = (...args) =>
        mapDispatchToProps[func](...args)(store.dispatch, store.getState);
    });
  }
  let hook = (component) => {
    component._setProps(_props);
    store.subscribe(() => {
      const state = store.getState();
      if (typeof mapStateToProps === "function") {
        component._setProps(deepCopy(mapStateToProps(state)));
      }
    });
  }
  const state = store.getState();
  return WrapComponent(className, deepCopy(mapStateToProps(state)), hook);
};
