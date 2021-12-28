import { useRoute } from '@react-navigation/core'
import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '../../components/common/Container'
import CustomButton from '../../components/common/CustomButton'
import Input from '../../components/common/Input'
import LoginComponent from '../../components/Login'
import loginUser from '../../context/actions/auth/loginUser'
import { GlobalContext } from '../../context/Provider'


const Login = () => {
    const [form, setForm] = useState({});
    const {params} = useRoute();
    const [justSignedUp, setJustSignedUp] = useState(false);
    const {authDispatch, authState: {loading, error, data}} = useContext(GlobalContext);
    
    useEffect(() => {
      if(params?.data) { 
        setJustSignedUp(true);
        setForm({...form, userName: params.data.username});
      }
    }, [params]);

    const onSubmit = () => {
        if (form.userName && form.password) {
          loginUser(form)(authDispatch);
        }
      };
    
      const onChange = ({name, value}) => {
        setJustSignedUp(false);
        setForm({...form, [name]: value});
      };
    


    return (
        <LoginComponent
        onSubmit={onSubmit}
        onChange={onChange}
        form={form}
        error={error}
        loading={loading}
        justSignedUp={justSignedUp} 
        />
    )
}


export default Login 