import React from 'react'
import { Image, StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import colors from '../../assets/themes/colors'
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input'
import {DEFAULT_IMAGE_URI} from '../../constants/general'
import ImagePicker from '../common/ImagePicker';

const CreateContactComponent = ({
  onChangeText,
  toggleValueChange,
  form,
  onSubmit,
  setForm,
  error,
  loading,
  sheetRef,
  openSheet,
  closeSheet,
  onFileSelected,
  localFile
}) => {
  return (
    <View style={styles.container}>
      <Container>
        <Image
          source={{uri: localFile?.path || DEFAULT_IMAGE_URI}}
          style={styles.imageView}
        />
        <TouchableOpacity onPress={openSheet}>
          <Text style={styles.pickText}>Pick Image</Text>
        </TouchableOpacity>
        <Input
          label="First Name"
          value={form.firstName || ''}
          placeholder="Enter First name"
          onChangeText={value =>
            onChangeText({name: 'firstName', value: value})
          }
          error={error?.first_name?.[0]}
        />
        <Input
          label="Last Name"
          placeholder="Enter Last name"
          onChangeText={value => onChangeText({name: 'lastName', value: value})}
          error={error?.last_name?.[0]}
          value={form.lastName || ''}
        />
        <Input
          icon={
            <CountryPicker
              withFilter
              withFlag
              withCountryNameButton={false}
              withCallingCodeButton
              withEmoji
              countryCode={form.countryCode || undefined}
              onSelect={v => {
                const phoneCode = v.callingCode[0];
                const cCode = v.cca2;
                setForm({...form, countryCode: cCode, phoneCode});
              }}
            />
          }
          style={{paddingLeft: 10}}
          label="Phone Number"
          placeholder="Enter phone number"
          iconPosition="left"
          onChangeText={value =>
            onChangeText({name: 'phoneNumber', value: value})
          }
          value={form.phoneNumber || ''}
          error={error?.phone_number?.[0]}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17}}>Add To Favorites</Text>
          <Switch
            trackColor={{false: 'blue', true: colors.primary}}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleValueChange}
            value={form.isFavorite}
          />
        </View>

        <CustomButton
          loading={loading}
          disabled={loading}
          onPress={onSubmit}
          primary
          title="Submit"
        />
      </Container>
      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageView: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },
  pickText: {
    color: colors.primary,
    textAlign: "center"
  }
});

export default CreateContactComponent