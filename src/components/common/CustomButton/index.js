import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from '../../../assets/themes/colors'

const CustomButton = ({title, primary, secondary, danger, disabled, loading, onPress, ...props}) => {

    const [] = useState()

    const getBgColor = () =>{
        if(disabled) {
            return colors.grey
        }
        if(primary) {
            return  colors.primary 
        }if (danger) {
            return  colors.danger 
        }if (secondary) {
            return  colors.secondary 
        }
    }  

    return (
        <TouchableOpacity 
            disabled={disabled}
            onPress={onPress}
            style={[styles.wrapper, {backgroundColor: getBgColor()}]}
        >
            <View style={styles.loaderSection}>
                {loading && <ActivityIndicator color={primary ?  colors.secondary : colors.primary} />}
                {title && <Text style={{color: disabled ? "black" : colors.white, paddingLeft: loading ? 5 : 0}}>{loading ? 'Please wait' : title}</Text>}
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  
    wrapper: {
        height: 42,
        borderRadius: 4,
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 5 
    },
    loaderSection: {
        flexDirection: "row",

    }
})

export default CustomButton
