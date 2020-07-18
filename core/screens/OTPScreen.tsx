import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import {UserInfo} from '../store/userInfo';
import { ScreenConstants } from '../constants/ScreenConstants';
import {NavigationInjectedProps} from 'react-navigation';

interface IParams{
    contact:string;
}

const OTPScreen = (props: NavigationInjectedProps<IParams>) => {
    const [isLoading, setLoading] = useState(true);
    const [serverOtp, setServerOtp] = useState("");
    const [isDisabled, setDisability] = useState(true);
    const [otpValue, setOtp] = useState("");
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        const contact = props.navigation.getParam('contact');
        // TODO call API with mobile number, to get otp
        const temporaryOtp = "1234";
        setServerOtp(temporaryOtp);
        setLoading(false);
    })

    const updateOtpValue = (event: any) => {
        if (!isNaN(event.nativeEvent.text)) {
            setErrorText("");
            setOtp(event.nativeEvent.text);
            setLoading(false);
            if ((event.nativeEvent.text as string).length === 4) {
                setDisability(false);
            }
            else {
                setDisability(true);
            }
        }
    }

    const onDone = () => {
        if (otpValue === serverOtp) {
            // CallAPI
            setErrorText("");
            UserInfo.userInfo.isLoggedIn = true;
            props.navigation.navigate(ScreenConstants.MenuOptions);            
        }
        else {
            setErrorText("Incorrect OTP");
        }
    }
    return (
        <View style={stylings.common}>
            {
                isLoading ?
                    <View>
                        <Text style={stylings.loader}>Loading......</Text>
                    </View> :
                    <View>
                        <TextInput keyboardType="numeric" style={stylings.otpField} onChange={updateOtpValue} value={otpValue} placeholder="Enter 4 digit OTP" />
                        <Button disabled={isDisabled} onPress={onDone} title="Next" />
                        {errorText.length > 0 ?
                            <Text style={stylings.error}>{errorText}</Text> : null}
                    </View>
            }
        </View>
    )
}

const stylings = StyleSheet.create({
    common: {
        paddingTop: 100,
        paddingLeft: 50,
        paddingRight: 50
    },
    error: {
        color: "white",
        margin: 10,
        padding: 10,
        backgroundColor: "red",
        textAlign: "center"
    },
    otpField: {
        borderBottomColor: "blue",
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderWidth: 1,
        height: 30,
        color: "black",
        margin: 20,
        textAlign:"center"
    },
    loader: {
        color: "white",
        margin: 50,
        fontWeight: "bold"
    }
})

export default OTPScreen;