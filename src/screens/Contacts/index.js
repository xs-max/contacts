import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Container from '../../components/common/Container';
import Icon from '../../components/common/Icon'

const Contacts = () => {
    const {setOptions, toggleDrawer} = useNavigation();
    useEffect(() => {
        setOptions({headerLeft: () => (
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <Icon type="material" size={30} name="menu"></Icon>
            </TouchableOpacity>)})
    }, [])
    return (
        <Container>
            <Text>Hi from Contacts</Text>
        </Container>
    )
}

export default Contacts
