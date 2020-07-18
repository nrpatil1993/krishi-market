import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator, NavigationScreenConfigProps, NavigationRoute, NavigationParams } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator, NavigationDrawerProp } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MyFoodItemsScreen from '../screens/MyFoodItemsScreen';
import FilterScreen from '../screens/FilterScreen';
import { LoginScreen } from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import { ScreenConstants } from '../constants/ScreenConstants';
import Index from '../screens/Index';
import { RegisterScreen } from '../screens/RegisterScreen';
import Colors from '../constants/Colors';
import { SortByScreen } from '../screens/SortByScreen';
import CustomHeaderButton from '../generic/components/HeaderButton';
import AddNewItem from '../screens/AddNewItem';

const AuthNavigator = createStackNavigator({
    [ScreenConstants.LoginScreen]: {
        screen: LoginScreen,
        navigationOptions: {
            headerTitle: "Login or Register"
        }
    },
    [ScreenConstants.RegisterScreen]: {
        screen: RegisterScreen,
        navigationOptions: {
            headerTitle: 'Register'
        }
    },
    [ScreenConstants.OTPScreen]: {
        screen: OTPScreen,
        navigationOptions: {
            headerTitle: 'OTP'
        }
    }
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === "android" ? Colors.purpleBasic : "white"
            },
            headerTintColor: Platform.OS === "android" ? "white" : Colors.purpleBasic
        }
    }
)

const AppNavigator = createStackNavigator({
    [ScreenConstants.HomeScreen]: {
        screen: HomeScreen,
        navigationOptions: (navData:any) => ({
            headerTitle: 'Check Food Items',
            headerStyle: {
                backgroundColor: Colors.purpleBasic
            },
            headerTintColor: "white",
            headerLeft: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName="ios-menu" onPress={() => {
                        navData.navigation.toggleDrawer() // This toggleDrawer is coming from props of createDrawerNavigator
                    }} />
                </HeaderButtons>
            }
        })
    }
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === "android" ? Colors.purpleBasic : "white"
            },
            headerTintColor: Platform.OS === "android" ? "white" : Colors.purpleBasic
        }
    }
)

const MyItemsNavigator = createStackNavigator({
    [ScreenConstants.MyItemsScreen]: {
        screen: MyFoodItemsScreen,
        navigationOptions: (navData:any) => ({
            headerTitle: 'My Food Items',
            headerStyle: {
                backgroundColor: Colors.purpleBasic
            },
            headerTintColor: "white",
            headerLeft: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName="ios-menu" onPress={() => {
                        navData.navigation.toggleDrawer() // This toggleDrawer is coming from props of createDrawerNavigator
                    }} />
                </HeaderButtons>
            }
        })
    },
    [ScreenConstants.AddItemScreen]:{
        screen:AddNewItem,
        navigationOptions: {
            headerTitle: 'Add Food Item to Sell'
        }
    }
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === "android" ? Colors.purpleBasic : "white"
            },
            headerTintColor: Platform.OS === "android" ? "white" : Colors.purpleBasic
        }
    })

const FiltersNavigator = createStackNavigator({
    [ScreenConstants.FilterScreen]: {
        screen: FilterScreen,
        navigationOptions: () => ({
            headerTitle: 'Filter food items',
            headerStyle: {
                backgroundColor: Colors.purpleBasic
            },
            headerTintColor: "white"
        })
    }
})

const SortingNavigator = createStackNavigator({
    [ScreenConstants.SortByScreen]: {
        screen: SortByScreen,
        navigationOptions: () => ({
            headerTitle: 'Sort food items',
            headerStyle: {
                backgroundColor: Colors.purpleBasic
            },
            headerTintColor: "white"
        })
    }
})

const tabConfig = {
    Home: {
        screen: AppNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo: any) => {
                return <Ionicons name="ios-home" size={24} color={tabInfo.tintColor} />
            },
            tabBarColor: "orange"
        }
    },
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo: any) => {
                return <AntDesign name="filter" size={24} color={tabInfo.tintColor} />
            },
            tabBarColor: "orange"
        }
    },
    SortBy: {
        screen: SortingNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo: any) => {
                return <FontAwesome name="unsorted" size={24} color={tabInfo.tintColor} />
            },
            tabBarColor: "orange"
        }
    }
}

const BottomTabNavigator = Platform.OS === "android" ? createMaterialBottomTabNavigator(tabConfig,
    {
        activeColor: "white",
        shifting: true
    }) :
    createBottomTabNavigator(tabConfig,
        {
            tabBarOptions: {
                activeBackgroundColor: "orange",
                activeTintColor: "white"
            }
        }
    )

const MenuNavigator = createDrawerNavigator({
    Home: BottomTabNavigator,
    MyFoodItems: {
        screen:MyItemsNavigator,
        navigationOptions:{
            drawerLabel:"My Food Items"
        }
    }
})

export default createAppContainer(createSwitchNavigator({
    [ScreenConstants.IndexNavigator]: Index,
    [ScreenConstants.AUTHNavigator]: AuthNavigator,
    [ScreenConstants.MenuOptions]: MenuNavigator
}));