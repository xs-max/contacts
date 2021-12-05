import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import RegisterComponent from '../../components/SignUp'
import { LOGIN } from '../../constants/routNames';
import register, {clearAuthState} from '../../context/actions/auth/register';
import {GlobalContext} from '../../context/Provider'

const Register = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const {authDispatch, authState: {error, loading, data}} = useContext(GlobalContext);
    const {navigate} = useNavigation();



    useFocusEffect(
        React.useCallback(() => {
          return () => {
            if (data || error) {
              clearAuthState()(authDispatch);
            }
          };
        }, [data, error]),
    );
    

    const onChange = ({name, value}) => {
        setForm({...form, [name]: value});
        if(value !== '') {
            if(name === 'password') {
                if(value.length < 6) {
                    setErrors((prevState) => {
                        return {...prevState, [name]: 'Password must be more than 5 characters'}
                    })
                }else {
                    setErrors((prevState) => {
                        return {...prevState, [name]: null}
                    })
                }
            }else {
                setErrors((prevState) => {
                    return {...prevState, [name]: null}
                })
            }
        }else{
            setErrors((prevState) => {
                return {...prevState, [name]: 'This field is required'}
            })
        }
    }

    const onSubmit = () => {
        // validations
        if(!form.userName) {
            setErrors((prevState) => {
                return {...prevState, userName: 'Please add a UserName'}
            })
        }
        if(!form.firstName) {
            setErrors((prevState) => {
                return {...prevState, firstName: 'Please add a firstName'}
            })
        }
        if(!form.lastName) {
            setErrors((prevState) => {
                return {...prevState, lastName: 'Please add a lastName'}
            })
        }
        if(!form.email) {
            setErrors((prevState) => {
                return {...prevState, email: 'Please add a email'}
            })
        }
        if(!form.password) {
            setErrors((prevState) => {
                return {...prevState, password: 'Please add a password'}
            })
        }

        if(Object.values(form).length === 5 && Object.values(form).every(item => item.trim().length > 0) && Object.values(errors).every(item => !item)) {
            register(form)(authDispatch)((response) => {
                navigate(LOGIN, {data: response});
            });
        }
    }
    return (
        <RegisterComponent 
            onSubmit={onSubmit} 
            onChange={onChange} 
            form={form}  
            errors={errors}
            error={error}
            loading={loading}
        />
    )
}

export default Register