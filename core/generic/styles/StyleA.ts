import {StyleSheet} from 'react-native';

export const STYLING = StyleSheet.create({
    common: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    backgroundImage: {
        height: "100%",
        width: "100%",
        resizeMode:"cover"
    },
    mainTitle: {
        fontSize: 40,
        color: "green",
        alignSelf: "center",
        paddingTop: 10,
        fontWeight:"bold"
    },
    subTitle: {
        color: "white",
        fontSize: 20,
        marginBottom: 10,
        backgroundColor:"#FA8072",
        textAlign:"center"
    },
    inputBox: {
        borderBottomColor: "blue",
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderWidth: 2,
        height: 30,
        color: "black",
        marginBottom: 10,
        textAlign:"center"
    },
    hollowButton:{
        backgroundColor:"white",
        color:"blue"
    }
})