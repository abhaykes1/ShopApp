import React from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'
import { useSelector,useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailsScreen = (props) => {
    const dispatch = useDispatch();
    const ProductId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === ProductId))
    return (
        <ScrollView>
            <View style={styles.container} >
                <Image style={styles.image} source={{uri : selectedProduct.imageUrl}} resizeMode="contain" />
            </View>
            <View style={styles.action} >
                <Button 
                    color={Colors.primary} 
                    title="Add to Cart" 
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct))
                    }} 
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}
ProductDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}
export default ProductDetailsScreen

const styles = StyleSheet.create({
    container:{
        margin: 10,
        flex: 1,
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 10,
        shadowOpacity:0.26,
        shadowRadius:30
    },
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description:{
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    },
    action: {
        marginVertical: 10,
        alignItems: 'center'
    }
})
