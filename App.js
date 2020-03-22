import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {enableScreens} from 'react-native-screens'
import productReducer from "./store/reducers/products";
import ShopNavigator from './navigation/ShopNavigator';

enableScreens();

const rootReducer =  combineReducers({
  products: productReducer 
});

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
