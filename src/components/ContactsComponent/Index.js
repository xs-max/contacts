import React from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import colors from '../../assets/themes/colors'
import AppModal from '../common/AppModal'
import CustomButton from '../common/CustomButton'
import Message from '../common/Message'

const ContactsComponent = ({modalVisible, loading, data, setModalVisible}) => {
    const ListEmptyComponent = () => {
        return (
            <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
                <Message info message="No Contacts To Show" />
            </View>
        )
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity>
                <Text>Contact 1</Text>
            </TouchableOpacity>
        )
    }
    return (
      <SafeAreaView>
        <View>
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
          {
            loading && 
            <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
            }
          {!loading && <FlatList data={data} ListEmptyComponent={ListEmptyComponent} renderItem={renderItem} keyExtractor={(item) => String(item.id)}/>}
          
        </View>
      </SafeAreaView>
    );
}

export default ContactsComponent
