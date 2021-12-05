import React, {createContext, useReducer} from 'react';
import authReducer from './reducers/authReducer';
import authInitialState  from './initialStates/authInitialState';
import contactReducer from './reducers/contactReducer';
import contactInitialState from './initialStates/contactInitialState';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {

    const [authState, authDispatch] = useReducer(authReducer, authInitialState);
    const [contactState, contactDispatch] = useReducer(contactReducer, contactInitialState);

    return (
        <GlobalContext.Provider value={{authState, contactState, authDispatch, contactDispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;