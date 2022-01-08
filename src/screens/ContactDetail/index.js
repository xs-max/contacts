import { useRoute, useNavigation } from '@react-navigation/native'
import React, {useEffect, useContext} from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native'
import ContactDetailsComponent from '../../components/ContactDetailsComponent';
import Icon from '../../components/common/Icon';
import colors from '../../assets/themes/colors';
import deleteContact from '../../context/actions/contacts/deleteContact';
import { navigate } from '../../Navigations/RootNavigation';
import { CONTACT_LIST } from '../../constants/routNames';
import {GlobalContext} from '../../context/Provider';

const ContactDetail = () => {

    const {contactDispatch, contactState: {deleteContact: {data, loading, error}}} = useContext(GlobalContext);
    const {setOptions} = useNavigation();

    useEffect(() => {
        setOptions({
          title: item.first_name + ' ' + item.last_name,
          headerRight: () => (
            <View style={{flexDirection: 'row', paddingRight: 10}}>
              <TouchableOpacity onPress={() => {}}>
                
                <Icon
                  color={colors.grey}
                  size={21}
                  name={item.is_favorite ? 'star' : 'star-border'}
                  type="material"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() => {
                  Alert.alert(
                    'Delete Contact',
                    `Are you sure you want to Delete ${item.first_name}`,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                      },
                      {
                        text: 'Ok',
                        onPress: () => {
                          deleteContact(item.id)(contactDispatch)(() => {
                            navigate(CONTACT_LIST);
                          });
                        },
                      },
                    ],
                  );
                }}>
                {loading ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <Icon
                    color={colors.grey}
                    size={21}
                    name="delete"
                    type="material"
                  />
                )}
              </TouchableOpacity>
            </View>
          ),
        });
    }, [item, loading])

    const {params} = useRoute();
    if(params?.item) {
        var item = params.item;
    }else{
        item = {};
    }
    return (
        <ContactDetailsComponent contact={item} />
    )
}

export default ContactDetail