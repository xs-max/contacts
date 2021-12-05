import React, {useState} from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import Container from '../../components/common/Container'
import CustomButton from '../../components/common/CustomButton'
import Input from '../../components/common/Input'
import { REGISTER } from '../../constants/routNames';
import Message from '../common/Message';
import colors from '../../assets/themes/colors';

const LoginComponent = ( {error,
    form,
    justSignedUp,
    onChange,
    loading,
    onSubmit,}) => {
    const {navigate} = useNavigation();
    const [isSecureEntry, setIsSecureEntry] = useState(true)

    return (
        <Container >
            <Image 
                height={70}
                width={70}
                source={require('../../assets/images/logo.png')} 
                style={styles.logoImage} 
            />
            <View>
                <Text style={styles.title}> Welcome To Max Contacts </Text>
                <Text style={styles.subTitle}> Please Login here </Text>
                
                
                <View style={styles.form}>
                    {justSignedUp && (
                    <Message
                    onDismiss={() => {}}
                    success
                    message="Account created successfully"
                    />
                    )}
                    {error?.error && <Message danger onDismiss message={error?.error} />}
                    {error && !error.error && (
                        <Message
                        onDismiss={() => {}}
                        danger
                        message="invalid credentials"
                        />
                    )}

                    
                    <Input 
                        // style={}
                        label="Username"
                        iconPosition="right"
                        placeholder="Enter Username"
                        value={form.userName || null}
                        onChangeText={(value) => {
                            onChange({name: 'userName', value})
                        }}
                    />
                    <Input 
                        // style={}
                        label="Password"
                        icon={  <TouchableOpacity onPress={() => setIsSecureEntry(!isSecureEntry)}>
                                    <Text>{isSecureEntry ? 'SHOW' : 'HIDE'} </Text>
                                </TouchableOpacity> }
                        iconPosition="right"
                        placeholder="Enter Password"
                        secureTextEntry={isSecureEntry}   
                        onChangeText={(value) => {
                            onChange({name: 'password', value});
                        }}
                        value={form.password || null}
                    />
                    <CustomButton 
                        disabled={loading}
                        title="Submit"
                        primary
                        onPress={onSubmit}
                        loading={loading}
                    />
                    <View style={styles.createSection}>
                        <Text style={styles.infoText}> Need a new Account?</Text>
                        <TouchableOpacity onPress={() => navigate(REGISTER)}>
                            <Text style={styles.linkBtn}> Register </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    logoImage: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: 50
    },
    title: {
        fontSize: 21,
        textAlign: 'center',
        paddingTop: 20,
        fontWeight: '500'
    },
    subTitle: {
        fontSize: 17,
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: '500'
    },
    form: {
        paddingTop: 20
    },
    createSection: {
        flexDirection: 'row',

    },
    infoText: {
        fontSize: 17
    },
    linkBtn: {
        paddingLeft: 17,
        color: colors.primary,
        fontSize: 16
    }
});


export default LoginComponent 