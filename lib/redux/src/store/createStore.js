const createStore = (reducer) => {
    let state;
    let listeners = [];

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.map(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => {
                return l !== listener;
            })
        }
    
    };

    const getState = () => state;

    dispatch({});   // 初始化 state

    return { getState, dispatch, subscribe };
}

export default createStore;