import * as React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';

import UserInfo from "./Components/UserInfo";
import Cocktails from "./Components/Cocktails";
import Details from "./Components/Details";
import Home from "./Components/Home";
import {FontAwesome5} from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeScreen = () => {
    return (
      <Home styles={styles}/>
    );
}
const UserScreen = () => {
    return (
        <UserInfo styles={styles}/>
    );
}
const CocktailsScreen = () => {
    return (
        <Cocktails styles={styles}/>
    );
}
const DetailScreen = () => {
    return (
        <Details styles={styles} homeTabs={HomeTabs} userScreen={UserScreen} cocktailsScreen={CocktailsScreen}/>
    );
}

const HomeTabs = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailScreen} />
            </Stack.Navigator>
    );
}
const App = () => {

    return (
        <>
            <StatusBar style="auto"/>
        <NavigationContainer>
        <Tab.Navigator
            screenOptions={({route}) =>({
                tabBarIcon: ({focused, color, size}) => {
                let iconName;
                    if(route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Cocktails'){
                        iconName = focused ? 'cocktail' : 'cocktail';
            } else if (route.name === 'User'){
                        iconName = focused ? 'user-alt' : 'user-alt';
            }
                    return <FontAwesome5 name={iconName} size={size} color={color}/>
                },
                headerShown: false
            })
            }
            tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: 'gray'
            }}
        >
            <Tab.Screen name="Home" component={HomeTabs} />
            <Tab.Screen name="Cocktails" component={CocktailsScreen} />
            <Tab.Screen name="User" component={UserScreen} />
        </Tab.Navigator>
        </NavigationContainer>
            </>
    );
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width:'100%'
    },
    listContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        width:'100%'
    }
})

