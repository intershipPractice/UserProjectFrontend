import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // 세션 스토리지 사용
import authReducer from './authSlice'; // auth 리듀서 가져오기
import { combineReducers } from 'redux';

// Redux-persist 설정
const persistConfig = {
  key: 'root', // 루트 키로 상태 저장
  storage: storageSession, // 세션 스토리지 사용
};

// 리듀서를 하나로 결합
const rootReducer = combineReducers({
  auth: authReducer, // auth 리듀서를 결합
});

// persistReducer로 rootReducer를 래핑
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 생성
const store = configureStore({
  reducer: persistedReducer, // persistedReducer 사용
});

// Redux-persist 저장소 생성
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
