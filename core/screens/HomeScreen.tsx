import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Clipboard, TouchableOpacity } from 'react-native';
import { Crops } from '../api/Crops';
import { ICrop } from '../api/interfaces/APIData';
import Divider from '../generic/components/Divider';
import { filter, isEmpty } from 'lodash';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Items } from '../store/Items';

const HomeScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [crops, setCrops] = useState<ICrop[]>([]);
    const [filteredCrops, setFilteredCrops] = useState<ICrop[]>([]);
    const [filtervalue, setFilterValue] = useState("");

    useEffect(() => {
        loadCrops();
    }, [])

    const loadCrops = async () => {
        try {
            await Items.foodItems.fetchItems();
            setCrops(Items.foodItems.itemList);
            setFilteredCrops(Items.foodItems.itemList);
            setLoading(false);
        }
        catch{
            // Ignore
        }
    }

    const updateFilterValue = (event: any) => {
        setFilterValue(event.nativeEvent.text);
        if (isEmpty(event.nativeEvent.text)) {
            setFilteredCrops(crops);
        }
        else {
            const filteredData = filter(crops, crop =>
                crop.crop.toLowerCase().includes(event.nativeEvent.text.toLowerCase())
            );
            setFilteredCrops(filteredData);
        }
    }

    return (
        <View style={stylings.container}>
            {
                isLoading ?
                    <View>
                        <Text style={stylings.loader}>Loading......</Text>
                    </View> :
                    <View style={stylings.boxWrapper}>
                        <View style={stylings.searchBoxContainer}>
                            <TextInput value={filtervalue} onChange={updateFilterValue} style={stylings.searchBox} placeholder="Search Food Item" />
                        </View>
                        <FlatList data={filteredCrops} style={stylings.subContainer}
                            keyExtractor={(crop, index) => crop._id}
                            renderItem={crop => (
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
                                        <Text style={stylings.subHeader}>Available Quantity</Text>
                                        <Text style={stylings.valueField}>:   {crop.item.quantity}</Text>
                                    </View>
                                    <View style={stylings.subHeaderWrapper}>
                                        <Text style={stylings.subHeader}>Ready for sale</Text>
                                        <Text style={stylings.valueField}>:   {crop.item.sellStatus ? "YES" : "NO"}</Text>
                                    </View>
                                    <View style={stylings.subHeaderWrapper}>
                                        <Text style={stylings.subHeader}>Farmer contact</Text>
                                        <TouchableOpacity onPress={() => { Clipboard.setString(crop.item.contact); Alert.alert("Copied", 'Contact is copied') }}>
                                            <Text style={stylings.valueField}>
                                                :   {crop.item.contact} <Text style={stylings.note}>(Click to copy)</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Divider dividerColor="white" />
                                </View>
                            )}
                        />
                    </View>
            }
        </View>
    )
}

const stylings = StyleSheet.create({
    container: {
        width: "100%"
    },
    subContainer: {
        width: "100%",
        height:"90%"
    },
    searchBox: {
        backgroundColor: "white",
        color: "black",
        width: "100%",
        marginBottom: 20,
        borderBottomColor:"grey",
        borderBottomWidth:1
    },
    searchBoxContainer: {
        top: 0,
        width: "100%",
        padding: 10
    },
    boxWrapper: {
        width: "100%",
        padding: 10
    },
    loader: {
        color: "white",
        margin: 50,
        fontWeight: "bold"
    },
    subHeaderWrapper: {
        flexDirection: "row"
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
    note: {
        fontSize: 12,
        color: "grey"
    }
})

export default HomeScreen;