import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react'
import { Text, View } from 'react-native'
import SettingsComponent from '../../components/SettingsComponent'

const Settings = () => {

    const [email, setEmail] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [sortBy, setSortBy] = useState(null);

    const saveSetting = (key, value) => {
      AsyncStorage.setItem(key, value);
    };

    const settingsOptions = [
      {title: 'My Info', subTitle: 'Setup your profile', onPress: () => {}},
      {title: 'Accounts', subTitle: null, onPress: () => {}},
      {
        title: 'Default account for new contacts',
        subTitle: email,
        onPress: () => {},
      },
      {
        title: 'Contacts to display',
        subTitle: 'All contacts',
        onPress: () => {},
      },
      {
        title: 'Sort by',
        subTitle: sortBy,
        onPress: () => {
          setModalVisible(true);
        },
      },
      {title: 'Name format', subTitle: 'First name first', onPress: () => {}},
      {title: 'Import', subTitle: null, onPress: () => {}},
      {title: 'Export', subTitle: null, onPress: () => {}},
      {title: 'Blocked numbers', subTitle: null, onPress: () => {}},
      {title: 'About RNContacts', subTitle: null, onPress: () => {}},
    ];

    const prefArray = [
      {
        name: 'First Name',
        selected: sortBy === 'First Name',
        onPress: () => {
          saveSetting('sortBy', 'First Name');
          setSortBy('First Name');
          setModalVisible(false);
        },
      },
      {
        name: 'Last Name',
        selected: sortBy === 'Last Name',
        onPress: () => {
          saveSetting('sortBy', 'Last Name');
          setSortBy('Last Name');
          setModalVisible(false);
        },
      },
    ];

    const getSettings = async () => {
      const user = await AsyncStorage.getItem('user');
      setEmail(JSON.parse(user).email);

      const sortPref = await AsyncStorage.getItem('sortBy');
      if (sortPref) {
        setSortBy(sortPref);
      }
    };

    useEffect(() => {
        getSettings();
    }, [])

    return (
      <SettingsComponent
        prefOptions={prefArray}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        settingsOptions={settingsOptions}
      />
    );
}

export default Settings