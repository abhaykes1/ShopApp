import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Card from '../UI/Card';

const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS ==='android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <Card style={styles.product }>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer} >
                            <Image style={styles.image} source={{uri: props.image}} />
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.title} >{props.title}</Text>
                            <Text style={styles.price} >${props.price.toFixed(2)}</Text>
                        </View>
                        
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchableCmp>
            </View>            
         </Card>

    )
}

export default ProductItem

const styles = StyleSheet.create({
    product:{
        height: 300,
        margin: 20,
    },
    touchable:{
        overflow: 'hidden',
        borderRadius: 10
    },
    image:{
        width: '100%',
        height: '100%'
    },
    title:{
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans-bold'

    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    },
    detail:{
        alignItems: 'center',
        height: '17%',
        padding: 10,
    },
    imageContainer:{
        width: '100%',
        height: '60%',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    }
})
