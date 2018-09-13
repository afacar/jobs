import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers, autoRehydrate } from 'redux-persist';
import{ AsyncStorage } from 'react-native';

import reducers from '../reducers';

/* const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk),
        // autoRehydrate() is responsible for pulling all data out and send them to reducers
        autoRehydrate()
    )
); */

const config = {
    key: 'root',
    // 'likedJobs' is defined in combineReducers at reducers/index.js
    storage: AsyncStorage, 
    whitelist: ['likedJobs']
};

const reducer = persistCombineReducers(config, reducers);

export default function configurationStore(initialState={}) {
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(thunk),
    );
    const persistor = persistStore(store);
    return {persistor, store};
}
// persistStore().purge() can used to clear persistent data phone 
// Big GOTCHA with redux-persist. When the state changes it can crash
// So use redux-persist-migrate module
/* persistStore(store, persistorOptions); */

/* export default store; */