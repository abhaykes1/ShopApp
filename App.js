import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {enableScreens} from 'react-native-screens'
import productReducer from "./store/reducers/products";
import ShopNavigator from './navigation/ShopNavigator';
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import { composeWithDevTools } from 'redux-devtools-extension'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
import ReduxThunk from 'redux-thunk'
import NavigationContainer from './navigation/NavigationContainer';

enableScreens();

const rootReducer =  combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer 
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => {
        setFontLoaded(true)
      }} />
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
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
