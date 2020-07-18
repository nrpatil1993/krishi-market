import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { ScreenConstants } from '../constants/ScreenConstants';

export const SortByScreen = (props:NavigationInjectedProps) => {
    return (
        <View>
            <Text>Sort by availability, Assending, Descending</Text>
            <Button title="GOTO Home" onPress={()=>{props.navigation.navigate(ScreenConstants.HomeScreen)}}/>
        </View>
    )
}