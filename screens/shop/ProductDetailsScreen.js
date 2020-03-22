import React from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'
import { useSelector } from 'react-redux/lib/hooks/useSelector';

const ProductDetailsScreen = (props) => {
    const ProductId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === ProductId))
    return (
        <View>
            <Text>{selectedProduct.title}</Text>
        </View>
    )
}
ProductDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}
export default ProductDetailsScreen

const styles = StyleSheet.create({})
