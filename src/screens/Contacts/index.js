import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {useFocusEffect} from '@react-navigation/native';
import Container from '../../components/common/Container';
import Icon from '../../components/common/Icon'
import ContactsComponent from '../../components/ContactsComponent/Index';
import getContacts from '../../context/actions/contacts/getContacts';
import {GlobalContext} from '../../context/Provider';

const Contacts = () => {

    const [sortBy, setSortBy] = useState(null);
    const {setOptions, toggleDrawer} = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const {contactDispatch, contactState: {getContacts: {data, loading, error}}} = useContext(GlobalContext);

    const getSettings = async () => {
      const sortPref = await AsyncStorage.getItem('sortBy');
      if (sortPref) {
        setSortBy(sortPref);
      }
    };

    useEffect(() => {
        getContacts()(contactDispatch);
    }, [])

    useFocusEffect(
        useCallback(() => {
            getSettings();

            return () => {}
        }, [])
    )

    useEffect(() => {
        setOptions({headerLeft: () => (
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <Icon type="material" size={30} name="menu"></Icon>
            </TouchableOpacity>)})
    }, [])

    return (
        <ContactsComponent sortBy={sortBy} data={data} modalVisible={modalVisible} setModalVisible={setModalVisible} loading={loading} data={data} />
    )
}

export default Contacts
