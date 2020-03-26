import React, {useEffect, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ShopNavigator from './ShopNavigator'
import { useSelector } from 'react-redux/lib/hooks/useSelector'
import {NavigationActions} from 'react-navigation'
const NavigationContainer = (props) => {
    const isAuth = useSelector(state => !!state.auth.token);
    const navRef = useRef();
    useEffect(() => {
      if(!isAuth){
        navRef.current.dispatch(
            NavigationActions.navigate({routeName: 'Auth'}));
      }
    }, [isAuth]);
    return (
        <ShopNavigator ref={navRef} />
    )
}

export default NavigationContainer

const styles = StyleSheet.create({})
