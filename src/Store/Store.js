import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { persistStore , persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'main-root',
  storage
}
const persistedReducer=persistReducer(persistConfig , authSlice);

const rootReducer = combineReducers({
  auth : persistedReducer
});
const middleware = [];

const store = configureStore({
  reducer: rootReducer,
  middleware : (getDefaultMiddleware) =>[...middleware,...getDefaultMiddleware(),

]
});

const Persistor = persistStore(store);

export{Persistor};

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";

// const store = configureStore({
//   reducer : {
//     auth : authSlice
//   }
// })
// export default store


// import { applyMiddleware, combineReducers, createStore } from "redux";
// import authSlice from "./authSlice";

// const rootReducer = combineReducers({
//   auth: authSlice,
// });

// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("reduxState");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return undefined;
//   }
// };

// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("reduxState", serializedState);
//   } catch (err) {
//     // Handle errors here
//   }
// };

// const persistedState = loadState();

// const store = createStore(
//   rootReducer,
//   persistedState,
//   applyMiddleware() // Add middleware if needed
// );

// store.subscribe(() => {
//   saveState(store.getState());
// });

// export default store;