import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas/index';
import reducers from '../reducers';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// DEVELOPMENT ONLY: ENABLES DISPLAY OF API REQUESTS LOGS
if (process.env.NODE_ENV === 'development') {
  // middleware.push(logger);
}

const store = createStore(reducers(), applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
