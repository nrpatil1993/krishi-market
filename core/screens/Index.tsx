import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { UserInfo } from '../store/userInfo';
import { ScreenConstants } from '../constants/ScreenConstants';
import { Text } from 'react-native';

const Index = (props:any) =>{
    useEffect(()=>{
        bootstrapAsync();
    })

    const bootstrapAsync = async () =>{
        props.navigation.navigate(UserInfo.userInfo.isLoggedIn?
            ScreenConstants.MenuOptions:ScreenConstants.AUTHNavigator)
    }

    return(
        <Text>Loading...</Text>
    )
}

export default observer(Index)