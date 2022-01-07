import React from 'react'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { CONTACT_DETAILS, CONTACT_LIST, CREATE_CONTACT, SETTINGS, LOGOUT } from '../constants/routNames';
import Contacts  from '../screens/Contacts/index';
import ContactDetail from '../screens/ContactDetail/index';
import CreateContact from '../screens/CreateContact/index';
import Settings from '../screens/Settings/index';
import Logout from '../screens/Logout';




const HomeNavigator = () => {

    const HomeStack = createNativeStackNavigator();

    return (
    <HomeStack.Navigator initialRouteName={CONTACT_LIST}>
        <HomeStack.Screen name={CONTACT_LIST} component={Contacts}></HomeStack.Screen>
        <HomeStack.Screen name={CONTACT_DETAILS} component={ContactDetail}></HomeStack.Screen>
        <HomeStack.Screen name={CREATE_CONTACT} component={CreateContact}></HomeStack.Screen>
        <HomeStack.Screen name={SETTINGS} component={Settings}></HomeStack.Screen>
        <HomeStack.Screen name={LOGOUT} component={Logout}></HomeStack.Screen>
    </HomeStack.Navigator>
    )
} 

export default HomeNavigator;