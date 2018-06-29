function noop() {
    return {};
}

let CURRENT_STORE = { getState: noop, dispatch: noop };

let AFTER_SET_STORE = [];
export function runAfterSet(func) {
    AFTER_SET_STORE.push(func);
}

export function setStore(store) {
    CURRENT_STORE = store;

    AFTER_SET_STORE.map(func => func());
    AFTER_SET_STORE = [];
}

export function getStore() {
    return CURRENT_STORE;
}

export function getState() {
    return getStore().getState();
}

export function getDispatch() {
    return getStore().dispatch;
}

export function dispatch(...args) {
    return getStore().dispatch(...args);
}

export default { noop, getStore, getState, getDispatch, dispatch, setStore, runAfterSet };
