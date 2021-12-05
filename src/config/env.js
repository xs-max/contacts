import {DEV_BACKEND_URL,}  from '@env';

const  devEnvironmevtVariables = {
    BACKEND_URL: DEV_BACKEND_URL
}

const prodEnvironmevtVariables = { 

}

// console.log(devEnvironmevtVariables.BACKEND_URL)
export default __DEV__ ? devEnvironmevtVariables : prodEnvironmevtVariables;