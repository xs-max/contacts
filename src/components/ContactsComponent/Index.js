import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from 'react-native'
import colors from '../../assets/themes/colors'
import AppModal from '../common/AppModal'
import CustomButton from '../common/CustomButton'
import Icon from '../common/Icon'
import Message from '../common/Message'
import { CREATE_CONTACT } from '../../constants/routNames'

const ContactsComponent = ({modalVisible, loading, data, setModalVisible}) => {

    const {navigate} = useNavigation();
    const ListEmptyComponent = () => {
        return (
            <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
                <Message info message="No Contacts To Show" />
            </View>
        )
    }

    const renderItem = ({item}) => {
      const {contact_picture, first_name, last_name, phone_number, country_code} = item;
        return (
          <TouchableOpacity style={styles.itemContainer}>
            <View style={styles.item}>
              {contact_picture ? (
                <Image
                  style={{width: 45, height: 45, borderRadius: 100}}
                  source={{uri: contact_picture}}
                />
              ) : (
                <View
                  style={{
                    width: 45,
                    height: 45,
                    backgroundColor: colors.grey,
                    borderRadius: 100,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.names, {color: colors.white}]}>{first_name[0]}</Text>
                  <Text style={[styles.names, {color: colors.white}]}>{last_name[0]}</Text>
                </View>
              )}
              <View style={{paddingLeft: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.names}>{first_name}</Text>
                  <Text style={styles.names}> {last_name}</Text>
                </View>
                <Text style={styles.phone_number}> {`${country_code} ${phone_number}`}</Text>
              </View>
            </View>
            <Icon name="right" type="ant" size={17} color={colors.grey} />
          </TouchableOpacity>
        );
    }
    return (
      <>
        <View style={{backgroundColor: colors.white, height: "100%"}}>
          <AppModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            modalFooter={<></>}
            modalBody={
              <View>
                <Text>Hello from the Modal</Text>
              </View>
            }
            title="My Profile"
          />
          {loading && (
            <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
          {!loading && (
            <View style={{paddingVertical: 20}}>
              <FlatList
                data={data}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                ItemSeparatorComponent={() => (
                  <View style={styles.separator}></View>
                )}
                ListFooterComponent={() => <View style={{height: 120}}></View>}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.floating}
          onPress={() => navigate(CREATE_CONTACT)}>
          <Icon name="plus" size={21} color={colors.white} />
        </TouchableOpacity>
      </>
    );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    alignItems: "center"
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  names: {fontSize: 17},
  phone_number: {
    opacity: 0.6,
    fontSize: 14,
    paddingVertical: 5

  },
  separator: {
    height: .5,
    backgroundColor: colors.grey
  },
  floating: {
    backgroundColor: colors.danger,
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 45,
    right: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ContactsComponent
