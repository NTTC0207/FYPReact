import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer';
// WHITELIST: 白名单
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'] // 需要缓存的白名单,不设置则全部缓存
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;