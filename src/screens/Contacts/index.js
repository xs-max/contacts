import { useNavigation } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Container from '../../components/common/Container';
import Icon from '../../components/common/Icon'
import ContactsComponent from '../../components/ContactsComponent/Index';
import getContacts from '../../context/actions/contacts/getContacts';
import {GlobalContext} from '../../context/Provider';

const Contacts = () => {
    const {setOptions, toggleDrawer} = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const {contactDispatch, contactState: {getContacts: {data, loading, error}}} = useContext(GlobalContext);
    useEffect(() => {
        getContacts()(contactDispatch);
    }, [])

    console.log(loading, data, error)
    useEffect(() => {
        setOptions({headerLeft: () => (
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <Icon type="material" size={30} name="menu"></Icon>
            </TouchableOpacity>)})
    }, [])
    return (
        <ContactsComponent data={data} modalVisible={modalVisible} setModalVisible={setModalVisible} loading={loading} data={data} />
    )
}

export default Contacts
