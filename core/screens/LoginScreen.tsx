import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, ImageBackground } from 'react-native';
import Divider from '../generic/components/Divider';
import { STYLING } from '../generic/styles/StyleA';
import { ScreenConstants } from '../constants/ScreenConstants';

export const LoginScreen = (props: any) => {
    const [loginMobileNumber, setLoginContact] = useState("");

    const [isLoginDisabled, setLoginDisability] = useState(true);

    const updateLoginContact = (event: any) => {
        if (!isNaN(event.nativeEvent.text)) {
            setLoginContact(event.nativeEvent.text);
            if ((event.nativeEvent.text as string).length === 10) {
                setLoginDisability(false);
            }
            else {
                setLoginDisability(true);
            }
        }
    }

    const onLogin = () => {
        // TODO: call apiand wait for successful response. Then set otpRequest
        props.navigation.navigate(ScreenConstants.OTPScreen, { contact: loginMobileNumber });
    }

    return (
        <ImageBackground blurRadius={0.1} source={require('../../assets/ploughing.png')} style={STYLING.backgroundImage}>
            <View style={{ width: "100%" }}><Text style={STYLING.mainTitle}>Krishi Market</Text></View>
            <View style={STYLING.common}>
                <Text style={STYLING.subTitle}>User Login</Text>
                <TextInput keyboardType="numeric" value={loginMobileNumber} onChange={updateLoginContact} style={STYLING.inputBox} placeholder={"Enter your 10 digit mobile number"} />
                <Button disabled={isLoginDisabled} title="Login" onPress={onLogin} />
            </View>
            <Divider dividerColor="#FF8333" />
            <Text style={STYLING.subTitle}>Not Registered?</Text><Button title="SignUp" onPress={() => props.navigation.navigate(ScreenConstants.RegisterScreen)} />
        </ImageBackground>
    )
}