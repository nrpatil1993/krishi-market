import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, ImageBackground } from 'react-native';
import { STYLING } from '../generic/styles/StyleA';
import { ScreenConstants } from '../constants/ScreenConstants';

export const RegisterScreen = (props: any) => {
    const [isRegisterDisabled, setRegisterDisability] = useState(true);
    const [registerMobileNumber, setRegisterContact] = useState("");
    const [name, setName] = useState("");

    const updateregisterContact = (event: any) => {
        if (!isNaN(event.nativeEvent.text)) {
            setRegisterContact(event.nativeEvent.text);
            if (((event.nativeEvent.text as string).length === 10) && name.length > 0) {
                setRegisterDisability(false);
            }
            else {
                setRegisterDisability(true);
            }
        }
    }

    const updateName = (event: any) => {
        setName(event.nativeEvent.text);
        if ((event.nativeEvent.text.length > 0) && (registerMobileNumber.length === 10)) {
            setRegisterDisability(false);
        }
        else {
            setRegisterDisability(true);
        }
    }
    const onRegister = () => {
        // TODO: call apiand wait for successful response. Then set otpRequest
        props.navigation.navigate(ScreenConstants.OTPScreen, { contact: registerMobileNumber });
    }

    return (
        <ImageBackground blurRadius={0.1} source={require('../../assets/ploughing.png')} style={STYLING.backgroundImage}>
            <View>
                <View style={STYLING.common}>
                    <TextInput value={name} onChange={updateName} style={STYLING.inputBox} placeholder={"Enter your name"} />
                    <TextInput keyboardType="numeric" value={registerMobileNumber} onChange={updateregisterContact} style={STYLING.inputBox} placeholder={"Enter your 10 digit mobile number"} />
                    <Button disabled={isRegisterDisabled} title="Register" onPress={onRegister} />
                </View>
            </View>
        </ImageBackground>
    )
}