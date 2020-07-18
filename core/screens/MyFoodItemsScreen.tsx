import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { UserInfo } from '../store/userInfo';
// import { Divider } from 'react-native-paper';
import { NavigationInjectedProps } from 'react-navigation';
import { ScreenConstants } from '../constants/ScreenConstants';
import { observer } from 'mobx-react';
import Divider from '../generic/components/Divider';

const MyFoodItemsScreen = (props: NavigationInjectedProps) => {
    return (
        <View>
            <FlatList style={stylings.list} data={UserInfo.userInfo.myFoodItems}
                keyExtractor={(crop, index) => crop._id}
                renderItem={
                    crop => (
                        <View key={crop.index}>
                            <View style={stylings.subHeaderWrapper}>
                                <Text style={stylings.subHeader}>Food Item</Text>
                                <Text style={stylings.valueField}>:   {crop.item.crop}</Text>
                            </View>
                            <View style={stylings.subHeaderWrapper}>
                                <Text style={stylings.subHeader}>Food Item Type</Text>
                                <Text style={stylings.valueField}>:   {crop.item.cropType}</Text>
                            </View>
                            <View style={stylings.subHeaderWrapper}>
                                <Text style={stylings.subHeader}>Availability</Text>
                                <Text style={stylings.valueField}>:   {crop.item.stockStatus}</Text>
                            </View>
                            <View style={stylings.subHeaderWrapper}>
                                <Text style={stylings.subHeader}>Quantity</Text>
                                <Text style={stylings.valueField}>:   {crop.item.quantity}</Text>
                            </View>
                            <View style={stylings.subHeaderWrapper}>
                                <Text style={stylings.subHeader}>Ready for sale</Text>
                                <Text style={stylings.valueField}>:   {crop.item.sellStatus ? "YES" : "NO"}</Text>
                            </View>
                            <View style={stylings.subHeaderWrapper}>
                                <Text style={stylings.subHeader}>Farmer contact</Text>
                                <Text style={stylings.valueField}>
                                    :   {crop.item.contact}
                                </Text>
                            </View>
                            <Divider dividerColor="#D7D7D7"/>
                        </View>
                    )
                } />
            <View style={stylings.buttonWrapper}>
                <Button title="Add Food Item" onPress={() => { props.navigation.navigate(ScreenConstants.AddItemScreen) }} />
            </View>
        </View>
    )
}

const stylings = StyleSheet.create({
    subHeaderWrapper: {
        flexDirection: "row",
        marginBottom:10
    },
    subHeader: {
        color: "#435E50",
        fontWeight: "bold",
        width: 150,
        paddingLeft: 10,
        fontSize: 16
    },
    valueField: {
        color: "black"
    },
    buttonWrapper: {
        paddingBottom: 30
    },
    list:{
        height:"94.5%"
    }
})

export default observer(MyFoodItemsScreen);