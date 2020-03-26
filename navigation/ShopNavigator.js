import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import React from 'react'; 
import {createStackNavigator} from 'react-navigation-stack'
import {Platform, SafeAreaView, Button, View} from 'react-native'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer'
import {Ionicons} from '@expo/vector-icons'
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import * as AuthActions from '../store/actions/auth'
const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary

}

const productNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailsScreen,
    Cart: CartScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => 
        <Ionicons 
            name={Platform.OS==='android'? 'md-cart': 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
        /> 
    } ,
    defaultNavigationOptions: defaultNavOptions
})

const ordersNavigator = createStackNavigator({
    Orders: OrdersScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => 
        <Ionicons 
            name={Platform.OS==='android'? 'md-list': 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
        /> 
    } ,
    defaultNavigationOptions: defaultNavOptions
});
const AdminNavigator = createStackNavigator({
    UserProduct: UserProductsScreen,
    EditProduct: EditProductsScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => 
        <Ionicons 
            name={Platform.OS==='android'? 'md-create': 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
        /> 
    } ,
    defaultNavigationOptions: defaultNavOptions
});
const ShopNavigator = createDrawerNavigator({
    Products: productNavigator,
    Orders: ordersNavigator,
    Admin: AdminNavigator
},{
    ContentOptions:{
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style={{flex:1, paddingTop: 20,}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}} >
                    <DrawerNavigatorItems {...props} />
                    <Button 
                        title="Logout"
                        color={Colors.primary}
                        onPress={() => {
                            dispatch(AuthActions.logout());
                            //props.navigation.navigate('Auth');
                        }}
                    />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
},{
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator ,
    Shop: ShopNavigator,

})

export default createAppContainer(MainNavigator)