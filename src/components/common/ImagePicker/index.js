import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePickerCropper from 'react-native-image-crop-picker';

import colors from '../../../assets/themes/colors';
import Icon from '../Icon';

const ImagePicker = React.forwardRef(({onFileSelected}, ref) => {
  const options = [
    {
      name: 'Take From Camera',
      icon: <Icon color={colors.grey} size={21} name="camera" />,
      onPress: () => {
          ImagePickerCropper.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            freeStyleCropEnabled: true,
          })
            .then(images => {
              onFileSelected(images);
            })
            .catch(error => {
              console.log('error', error);
            });
      },
    },
    {
      name: 'Choose From Gallery',
      icon: <Icon color={colors.grey} size={21} name="image" />,
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
              onFileSelected(images);
          })
          .catch(error => {
            console.log('error', error);
          });
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={300}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}>
      <View style={styles.wrapper}>
        {options.map(({name, icon, onPress}) => (
          <TouchableOpacity
            onPress={onPress}
            style={styles.pickerOption}
            key={name}>
            {icon}
            <Text style={styles.text}> {name} </Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20
    },
    pickerOption: {
        flexDirection: "row",
        paddingTop: 20,
        alignItems: "center"
    },
    text: {
        fontSize: 17,
        paddingLeft: 17,
    },
});

export default ImagePicker;


