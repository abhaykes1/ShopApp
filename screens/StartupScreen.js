import React,{useEffect} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    ActivityIndicator,
    AsyncStorage 
} from 'react-native'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux/lib/hooks/useDispatch'
import * as AuthActions from '../store/actions/auth'
const StartupScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData)
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth');
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Shop');
            dispatch(AuthActions.authenticate(userId, token, expirationTime));
        };
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen} >
            <ActivityIndicator 
                size='large'
                color={Colors.primary}
            />
        </View>
    )
}

export default StartupScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
