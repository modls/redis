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
  const instances = [];
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
  className.addHook((instance) => {
    console.log(instance);
    instance._setProps(_props);
    if (typeof mapStateToProps === "function") {
      const state = store.getState();
      instance._setProps(deepCopy(mapStateToProps(state)));
      instances.push(instance);
    }
  });
  if (typeof mapStateToProps === "function") {
    store.subscribe(() => {
      const state = store.getState();
      instances.forEach((instance) => {
        instance._setProps(deepCopy(mapStateToProps(state)));
      });
    });
  }
  return className;
};
