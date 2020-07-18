import React, { useState } from 'react';
import { View, TextInput, Switch, StyleSheet, Text, Button, Alert } from 'react-native';
import { ICrop } from '../api/interfaces/APIData';
import { observer } from 'mobx-react';
import { Divider, RadioButton } from 'react-native-paper';
import { isEmpty } from 'lodash';
import { UserInfo } from '../store/userInfo';

const AddNewItemScreen = () => {
    const [cropItem, setCropItem] = useState<ICrop>({
        _id: (Math.random() + UserInfo.userInfo.myFoodItems.length).toString(), // Should be added by backend
        crop: "",
        cropType: "",
        sellStatus: true,
        contact: "",
        stockStatus: "In Stock",
        quantity: ""
    });

    const [inStock, setInStock] = useState<boolean>(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [quantityUnit, setQuantityUnit] = useState<"Kilogram" | "Litres">("Kilogram");

    const toggleStatus = () => {
        const item = { ...cropItem };
        item.sellStatus = !item.sellStatus;
        setCropItem(item);
    }

    const toggleStock = () => {
        const item = { ...cropItem };
        item.stockStatus = !inStock ? "In Stock" : "Out of Stock";
        setCropItem(item);
        setInStock(!inStock);
    }

    const updateCropName = (value: string) => {
        const item = { ...cropItem };
        item.crop = value;
        setCropItem(item);
        if ((!isEmpty(value)) && (!isEmpty(cropItem.cropType)) && (cropItem.contact.length === 10) && (!isEmpty(cropItem.quantity))) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }

    const updateCropType = (value: string) => {
        const item = { ...cropItem };
        item.cropType = value;
        setCropItem(item);
        if ((!isEmpty(cropItem.crop)) && (!isEmpty(value)) && (cropItem.contact.length === 10) && (!isEmpty(cropItem.quantity))) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }

    const updateContact = (value: string) => {
        if (!isNaN(parseInt(value))) {
            const item = { ...cropItem };
            item.contact = value;
            setCropItem(item);
        }
        else if (isEmpty(value)) {
            const item = { ...cropItem };
            item.contact = value;
            setCropItem(item);
        }
        if ((!isEmpty(cropItem.crop)) && (!isEmpty(cropItem.cropType)) && (value.length === 10) && (!isEmpty(cropItem.quantity))) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }

    const updateQuantity = (value: string) => {
        if (!isNaN(parseInt(value))) {
            const item = { ...cropItem };
            item.quantity = value;
            setCropItem(item);
        }
        else if (isEmpty(value)) {
            const item = { ...cropItem };
            item.quantity = value;
            setCropItem(item);
        }
        if ((!isEmpty(cropItem.crop)) && (!isEmpty(cropItem.cropType)) && (!isEmpty(value)) && (cropItem.contact.length === 10)) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }

    const addItem = () => {
        const item = { ...cropItem };
        item.quantity = `${item.quantity} ${quantityUnit}`;
        UserInfo.userInfo.addNewFoodItem(item);
        alert(`Food Item ${cropItem.crop} added successfully`);
        item.crop = "";
        item.cropType = "";
        item.contact = "";
        item.sellStatus = true;
        item.stockStatus = "In Stock";
        item.quantity = "";
        setCropItem(item);
    }

    return (
        <View style={styling.container}>
            <View style={styling.rowWrapper}>
                <Text style={styling.subHeader}>Contact</Text>
                <TextInput keyboardType="numeric" style={styling.inputBox} value={cropItem.contact} onChangeText={updateContact} placeholder="contact" />
            </View>
            <View style={styling.rowWrapper}>
                <Text style={styling.subHeader}>Crop Name</Text>
                <TextInput style={styling.inputBox} value={cropItem.crop} onChangeText={updateCropName} placeholder="Crop Name" />
            </View>
            <View style={styling.rowWrapper}>
                <Text style={styling.subHeader}>Crop Type</Text>
                <TextInput style={styling.inputBox} value={cropItem.cropType} onChangeText={updateCropType} placeholder="Crop Type" />
            </View>
            <View style={styling.rowWrapper}>
                <Text style={styling.subHeader}>Quantity</Text>
                <TextInput keyboardType="numeric" style={styling.inputBox} value={cropItem.quantity} onChangeText={updateQuantity} placeholder="Quantity" />

            </View>
            <View style={styling.rowWrapper}>
                <Text style={styling.subHeader}>Quantity Unit</Text>
                <RadioButton
                    value="Kilogram"
                    status={quantityUnit === "Kilogram" ? 'checked' : 'unchecked'}
                    onPress={() => setQuantityUnit("Kilogram")}
                />
                <RadioButton
                    value="Litres"
                    status={quantityUnit === "Litres" ? 'checked' : 'unchecked'}
                    onPress={() => setQuantityUnit("Litres")}
                />
                <Text style={styling.infoText}>{quantityUnit}</Text>
            </View>
            <View style={styling.rowWrapper}>
                <Text style={styling.subHeader}>Ready To sell</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={cropItem.sellStatus ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleStatus}
                    value={cropItem.sellStatus}

                />
                <Text style={styling.infoText}>{cropItem.sellStatus ? "YES" : "NO"}</Text>
            </View>
            <View style={styling.rowWrapper}>
                <Text style={styling.subHeader}>In Stock</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={inStock ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleStock}
                    value={inStock}
                />
                <Text>{inStock ? "YES" : "NO"}</Text>
            </View>
            <Divider />
            <Button disabled={isDisabled} title="ADD" onPress={addItem} />
        </View>
    )
}

const styling = StyleSheet.create({
    container: {
        padding: 10
    },
    inputBox: {
        borderBottomColor: "blue",
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderWidth: 1,
        height: 30,
        color: "black",
        textAlign: "center",
        width: "70%"
    },
    rowWrapper: {
        flexDirection: "row",
        margin: 10
    },
    subHeader: {
        width: "30%",
        borderRightColor: "grey",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        marginRight: 5,
        borderWidth: 1,
        paddingTop: 5
    },
    infoText: {
        paddingTop: 5
    }
})

export default observer(AddNewItemScreen);