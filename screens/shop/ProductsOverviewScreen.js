import React,{useEffect, useState, useCallback} from 'react'
import { StyleSheet, Text, View, FlatList, Platform,Button, ActivityIndicator } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import ProductDetailsScreen from './ProductDetailsScreen'
import * as cartActions from '../../store/actions/cart'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const ProductsOverviewScreen = (props) => {


    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail',{
            productId: id,
            productTitle: title
        })
    }
    const products = useSelector( state => state.products.availableProducts) 
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const loadProducts = useCallback( async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (error) {
            setError(err.message)
        }
        setIsRefreshing(false);
    },[dispatch, setIsLoading, setError])
    
    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
          'willFocus',
          loadProducts
        );
    
        return () => {
          willFocusSub.remove();
        };
      }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true)  
        loadProducts()
        .then(() => {setIsLoading(false);
            });
    },[dispatch, loadProducts]);

    if(error){
        <View style={styles.centered}>
            <Text>An error occurred!</Text>
            <Button 
                title="Retry"
                onPress={loadProducts} 
                color={Colors.primary}
            />
        </View>  
    }

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}  
                />
            </View>
        )
    }

    if(!isLoading && products.length === 0 ){
        return(
            <View style={styles.centered}>
                <Text>No Products found. Maybe start adding some!</Text>
            </View>
        )
    }

    return (
        <FlatList 
            onRefresh={loadProducts}
            refreshing={isRefreshing} 
            data={products} 
            keyExtractor={item => item.id}  
            renderItem={itemData =>(   
                    <ProductItem 
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <Button 
                            color={Colors.primary} 
                            title='View Details' 
                            onPress={() => {
                                selectItemHandler(itemData.item.id, itemData.item.title)
                            }}
                        />
                        <Button 
                            color={Colors.primary} 
                            title='To Cart' 
                            onPress={() => {
                                dispatch(cartActions.addToCart(itemData.item))
                            }} 
                        />
                    </ProductItem> 
                )} 
            />
    )
}

ProductsOverviewScreen.navigationOptions = navData => {
    return{
         headerTitle: 'All Products',
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
                title='Cart' 
                iconName={Platform.OS==='android'?'md-cart':'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('Cart')
                }}     
            />
         </HeaderButtons>
    }
   
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({
    centered:{
        flex:1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})
