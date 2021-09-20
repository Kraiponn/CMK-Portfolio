import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import uiReducer from '@src/features/store/slices/ui';
import authReducer from '@src/features/store/slices/auth';

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        /* ignore persistance actions */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const makeStore = () => {
  return store;
};

const persistor = persistStore(store);
const storeWrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { storeWrapper, persistor };
