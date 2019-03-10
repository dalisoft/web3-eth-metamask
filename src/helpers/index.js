/* eslint-disable no-nested-ternary */

const getScope = (typeof window !== 'undefined'
  ? window : typeof global !== 'undefined'
    ? global : this);

const getWindow = (fn, failVar) => ((typeof window !== 'undefined') ? fn(window) : failVar);

export {
  getScope,
  getWindow
};
