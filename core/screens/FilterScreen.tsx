import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { observer } from 'mobx-react';
import { Items } from '../store/Items';
import { isEmpty } from 'lodash';
import { STYLING } from '../generic/styles/StyleA';

const FilterScreen = () => {

    const onDistanceChange = (val: string) => {
        if (!isNaN(parseInt(val))) {
            Items.foodItems.filter.distance = parseInt(val);
        }
        if (isEmpty(val)) {
            Items.foodItems.filter.distance = undefined;
        }
    }

    return (
        <View style={styling.container}>
            <View style={styling.rowWrapper1}>
                <Text style={styling.subheader}>Filter by Distance (in Km) : </Text>
                <TextInput style={styling.inputBox}
                    keyboardType="numeric"
                    placeholder="Enter max distance"
                    value={Items.foodItems.filter.distance ? Items.foodItems.filter.distance.toString() : ""}
                    onChangeText={onDistanceChange} />
            </View>
            <View style={styling.rowWrapper2}>
                <Button title="Apply" onPress={() => { Items.foodItems.fetchItems() }} />
            </View>
            <View style={styling.rowWrapper2}>
                <Button title="Clear all Filters" onPress={() => {
                    Items.foodItems.filter.distance = undefined;
                    Items.foodItems.fetchItems()
                }} />
            </View>
        </View>
    )
}

const styling = StyleSheet.create({
    container: {
        height: "100%"
    },
    subheader: {
        backgroundColor: "#CCCCCC",
        marginRight: 10,
        paddingRight: 5,
        paddingLeft: 5
    },
    inputBox: {
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        textAlign: "center"
    },
    rowWrapper1: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop: 10,
        alignSelf: "center"
    },
    rowWrapper2: {
        width: '50%',
        height: '10%',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})

export default observer(FilterScreen);