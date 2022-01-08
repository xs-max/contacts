import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import colors from '../../assets/themes/colors';
import Container from '../common/Container';
import ImageComponent from './imageComponent';
import Icon from '../common/Icon';
import CustomButton from '../common/CustomButton';
import ImagePicker from '../common/ImagePicker';
import { navigate } from '../../Navigations/RootNavigation';
import { CREATE_CONTACT } from '../../constants/routNames';

const ContactDetailsComponent = ({
  contact,
  openSheet,
  sheetRef,
  onFileSelected,
  updatingImage,
  localFile,
  uploadSucceeded,
}) => {
  const {contact_picture, first_name, last_name, country_code, phone_number} =
    contact;
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        {contact_picture && <ImageComponent src={contact_picture} />}
        <View style={styles.content}>
          <Text style={styles.names}>{`${first_name} ${last_name}`}</Text>
        </View>
        <View style={styles.hrLine} />

        <View style={styles.topCallOptions}>
          <TouchableOpacity style={styles.topCallOption}>
            <Icon
              type="ionicon"
              name="call-outline"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <Icon
              type="materialCommunity"
              name="message-text"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <Icon
              type="materialCommunity"
              name="video"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Video</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.middleCallOptions}>
          <Icon
            type="ionicon"
            name="call-outline"
            color={colors.grey}
            size={27}
          />
          <View style={styles.phoneMobile}>
            <Text>{phone_number}</Text>
            <Text>Mobile</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              type="materialCommunity"
              name="video"
              color={colors.primary}
              size={27}
            />
            <Icon
              type="materialCommunity"
              name="message-text"
              color={colors.primary}
              size={27}
              style={[styles.msgIcon]}
            />
          </View>
        </View>
        <CustomButton
          style={{alignSelf: 'flex-end', marginRight: 20, width: 200}}
          primary
          title="Edit Contact"
          onPress={() => {
            navigate(CREATE_CONTACT, {contact, editing: true});
          }}
        />
      </View>

      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: colors.white,
    },
        container: {
        flex: 1,
    },
    names: {
        fontSize: 23,
    },
    content: {
        padding: 20
    },

    hrLine: {
        height: 10,
        borderColor: colors.grey,
        borderBottomWidth: 0.4,
    },

    topCallOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    topCallOption: {
        alignItems: 'center',
    },

    middleText: {
        fontSize: 14,
        color: colors.primary,
        paddingVertical: 5,
    },

    middleCallOptions: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },

    phoneMobile: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },

    imageView: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center',
    },
});


export default ContactDetailsComponent;
