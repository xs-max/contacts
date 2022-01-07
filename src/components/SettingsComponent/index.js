import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import colors from '../../assets/themes/colors';
import Container from '../common/Container';
import AppModal from '../common/AppModal'
import Icon from '../common/Icon';

const SettingsComponent = ({setModalVisible, modalVisible,  settingsOptions, onPress, prefOptions}) => {
  return (
    <>
      <AppModal
        modalVisible={modalVisible}
        modalFooter={<></>}
        closeOnTouchOutside={false}
        modalBody={
          <View>
            {prefOptions.map(({name, selected, onPress}, index) => (
              <TouchableOpacity key={index} style={{flexDirection: 'row', paddingVertical: 5, alignItems: "center"}} onPress={onPress}>
                {selected && <Icon name="check" size={17} type="material" />}
                <Text style={{fontSize: 17, paddingLeft: selected ?  15 : 30, }}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
        title="Sort By"
        setModalVisible={setModalVisible}></AppModal>
      <ScrollView style={{backgroundColor: colors.white}}>
        {settingsOptions.map(({title, subTitle, onPress}, index) => (
          <TouchableOpacity key={index} onPress={onPress}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                paddingTop: 20,
              }}>
              <Text style={{fontSize: 17}}>{title}</Text>
              {subTitle && (
                <Text style={{fontSize: 14, opacity: 0.5, paddingTop: 5}}>
                  {subTitle}
                </Text>
              )}
            </View>
            <View style={{height: 0.5, backgroundColor: colors.grey}}></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default SettingsComponent;
