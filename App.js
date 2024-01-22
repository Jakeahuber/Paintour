import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './components/home'
import Profile from './components/profile'
import Search from './components/search'


const homeName = 'Home';
const profileName = 'Profile';
const searchName = 'Search';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
        <NavigationContainer theme={{colors: {background: 'black'}}}>
            <Tab.Navigator initialRouteName={homeName} screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    }
                    else if (route.name === profileName) {
                        iconName = focused ? 'person' : 'person-outline'
                    }
                    else if (route.name === searchName) {
                        iconName = focused ? 'search' : 'search-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: 'black',
                },
                headerTitle: 'Daily Sketch',
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 28
                },
                headerTitleAlign: 'left',
            })}
            >
                <Tab.Screen name={homeName} component={Home}/>
                <Tab.Screen name={profileName} component={Profile} options={{ headerShown: false}}/>
                <Tab.Screen name={searchName} component={Search} />
            </Tab.Navigator>
        </NavigationContainer>
    </>
  );
}
