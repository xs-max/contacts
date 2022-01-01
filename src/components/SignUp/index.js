import React, {useState} from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import Container from '../../components/common/Container'
import CustomButton from '../../components/common/CustomButton'
import Input from '../../components/common/Input'
import { LOGIN } from '../../constants/routNames';
import colors from '../../assets/themes/colors';
import Message from '../common/Message';
import envs from '../../config/env';
import Icon from '../common/Icon';

const RegisterComponent = ({onSubmit, onChange, form, loading, error, errors}) => {
    const {navigate} = useNavigation();
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    // console.log(envs)
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
                <Text style={styles.subTitle}> Create A free Account </Text>
                {error?.error && (
                    <Message retry danger retryFn={onSubmit} message={error?.error} />
                )}
                <View style={styles.form}>
                    <Input 
                        // style={}
                        label="Username"
                        iconPosition="right"
                        placeholder="Enter Username"
                        onChangeText={(value) => {
                            onChange({name: 'userName', value})
                        }}
                        error={errors.userName || error?.username?.[0]}
                    />
                    <Input 
                        // style={}
                        label="FirstNane"
                        iconPosition="right"
                        placeholder="Enter FirstName"
                        onChangeText={(value) => {
                            onChange({name: 'firstName', value})
                        }} 
                        error={errors.firstName || error?.first_name?.[0]}
                    />
                    <Input 
                        // style={}
                        label="LastName"
                        iconPosition="right"
                        placeholder="Enter LastName"
                        onChangeText={(value) => {
                            onChange({name: 'lastName', value})
                        }}
                        error={errors.lastName || error?.last_name?.[0]}
                    />
                    <Input 
                        // style={}
                        label="Email"
                        iconPosition="right"
                        placeholder="Enter Email"
                        onChangeText={(value) => {
                            onChange({name: 'email', value})
                        }}
                        error={errors.email || error?.email?.[0]}
                    />
                    <Input 
                        // style={}
                        label="Password"
                        icon={  <TouchableOpacity onPress={() => setIsSecureEntry(!isSecureEntry)}>
                                    <Text>{isSecureEntry ? <Icon type="awesome" name="eye" size={20}  /> : <Icon type="awesome" name="eye-slash" size={20} /> } </Text>
                                </TouchableOpacity> }
                        iconPosition="right"
                        placeholder="Enter Password"
                        secureTextEntry={isSecureEntry}   
                        onChangeText={(value) => {
                            onChange({name: 'password', value});
                        }}
                        error={errors.password || error?.password?.[0]}
                        
                    />
                    <CustomButton 
                        title="Register"
                        primary
                        onPress={onSubmit}
                        loading={loading}
                        disabled={loading}
                    />
                    <View style={styles.createSection}>
                        <Text style={styles.infoText}> Already  have an Account?</Text>
                        <TouchableOpacity onPress={() => navigate(LOGIN)}>
                            <Text style={styles.linkBtn}> Login </Text>
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


export default RegisterComponent 