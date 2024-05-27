import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoadingScreen from './Components/LoadingScreen';
import Home from './Components/Home';
import LoginScreen from './Components/LoginScreen';
import AddPet from './Components/AddPet';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import Donation from './Components/Donation';
import Details from './Components/Details';
import Favourites from './Components/Favourites';
import DrawerNavigator from './Components/DrawerNavigator';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AddPet"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
