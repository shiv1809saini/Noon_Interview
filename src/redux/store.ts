import {combineReducers, legacy_createStore as createStore} from 'redux';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart'] as Array<keyof RootState>,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
