import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../../../assets/themes/colors'

const Input = ({error, onChangeText, placeholder, iconPosition, icon, style, value, label, ...props}) => {

    const [focused, setFocused] = useState(false);
    const [] = useState()
    const getFlexDirection = () => icon && iconPosition == "left" ? {flexDirection: "row"} : {flexDirection: "row-reverse"};
    const getborderColor = () =>{
        if (error) {
            return {borderColor: colors.danger} 
        }if(focused) {
            return {borderColor: colors.primary} 
        }else{
            {borderColor: colors.grey} 
        }
    }  

    return (
        <View style={styles.inputContainer}>
            {label && <Text>{label}</Text>}
            <View style={[styles.wrapper, getFlexDirection(), getborderColor(), {alignItems: icon ? "center" : "baseline",}]}>
                <View>{icon && icon}</View>
                <TextInput
                    style={[styles.textInput]}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...props}
                />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        flex: 1
    },
    inputContainer: {
        paddingVertical: 12
    },
    wrapper: {
        height: 42,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        
        marginTop: 5
    },
    error: {
        color: colors.danger,
        paddingTop: 4,
        fontSize: 12,
    }
})

export default Input
