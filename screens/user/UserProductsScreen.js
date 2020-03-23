import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform, Button, Alert } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as ProductAction from '../../store/actions/products'

const UserProductsScreen = (props) => {
    const dispatch = useDispatch()
    const userProduct = useSelector(state => state.products.userProducts)
    const editProduct = (id) => {
        props.navigation.navigate('EditProduct',{productId: id})
    }
const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?',[
        {text: 'NO', style: 'default'},
        {
            text:'YES', 
            style:'destructive', 
            onPress: () => {
                dispatch(ProductAction.deleteProduct(id))
            }
        }
    ])
}
    return (
        <FlatList 
            data={userProduct}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {

                    }}
                >
                <Button 
                    color={Colors.primary} 
                    title='Edit' 
                    onPress={() => {
                        editProduct(itemData.item.id)
                    }}
                />
                <Button 
                    color={Colors.primary} 
                    title='Delete' 
                    onPress={() => {deleteHandler(itemData.item.id)}} 
                />
                </ProductItem>
            )}     
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Your Products',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item 
             title='Menu' 
             iconName={Platform.OS==='android'?'md-menu':'ios-menu'}
             onPress={() => {
                 navData.navigation.toggleDrawer();
             }}     
         />
         </HeaderButtons> ,
         headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item 
             title='Menu' 
             iconName={Platform.OS==='android'?'md-create':'ios-create'}
             onPress={() => {
                 navData.navigation.navigate('EditProduct');
             }}     
         />
         </HeaderButtons> ,
 
    }
   
}

export default UserProductsScreen

const styles = StyleSheet.create({})
