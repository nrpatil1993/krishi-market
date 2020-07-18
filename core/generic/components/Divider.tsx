import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Divider(props: { dividerColor: string }) {
    return (
        <View style={[styling.divider, { borderBottomColor: props.dividerColor }]} />
    )
}

const styling = StyleSheet.create({
    divider: {
        borderBottomWidth: 1,
        width: "100%",
        marginTop: 20,
        marginBottom: 20
    }
})