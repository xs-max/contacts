import React, {useContext, useState, useEffect} from 'react'; 
import {NavigationContainer} from '@react-navigation/native'
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { GlobalContext } from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

const AppNavContainer = () => {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [authLoaded, setAuthLoaded] = useState(false);
    const {authState: {isLoggedIn}} = useContext(GlobalContext);

    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if(user) {
                setAuthLoaded(true)
                setisAuthenticated(true)
            }else {
                setAuthLoaded(true)
                setisAuthenticated(false)
            }
        }catch(error) {

        }
    }

    useEffect(() => {
        getUser();
    }, [isLoggedIn])

    return (
        <>
            {authLoaded ? (
            <NavigationContainer>
                {isAuthenticated ? <DrawerNavigator/> : <AuthNavigator/>}
            </NavigationContainer>) :
            (<ActivityIndicator />)}

        </>
    )
} 

export default AppNavContainer;