import React, { useContext } from 'react'; 
import {createDrawerNavigator} from '@react-navigation/drawer'
import HomeNavigator from './HomeNavigator';
import { HOMENAVIGATOR } from '../constants/routNames';
import { Image, StyleSheet, View } from 'react-native';
import Container from '../components/common/Container';
import SideMenu from './SideMenu';
import { GlobalContext } from '../context/Provider';

const getDrawerContent = (navigation, authDispatch) => {
    return (<SideMenu  navigation={navigation} authDispatch={authDispatch}/>)
}


const DrawerNavigator = () => {


    const {authDispatch} = useContext(GlobalContext);

    const Drawer = createDrawerNavigator();

    return (
    <Drawer.Navigator drawerContent={({navigation}) => getDrawerContent(navigation, authDispatch)} screenOptions={{
        drawerType: "slide",
        headerShown: false 
    }}>
        <Drawer.Screen name={HOMENAVIGATOR} component={HomeNavigator}></Drawer.Screen>
    </Drawer.Navigator>
    )
} 



export default DrawerNavigator;