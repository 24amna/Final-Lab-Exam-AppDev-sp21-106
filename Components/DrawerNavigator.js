import React, { useState, useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Image, Text } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import Profile from './Profile';
import Favourites from './Favourites';
import AddPet from './AddPet';
import Donation from './Donation';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props ) => {
  const { navigation } = props;

  const handleLogout = () => {
    alert('User Logged Out Successfully');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <DrawerContentScrollView style={{ backgroundColor: '#e8e1c1' }}>
      <View style={{ padding: 20 }}>
        <Image source={require('./Images/cat.png')} style={{ height: 70, width: 70, borderRadius: 20 }} />
        <Text style={{ color: 'black',  fontSize: 16, marginTop: 10 }}>
          Fatima Tae
        </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ color, size }) => <Icon name="exit-to-app" color={color} size={size} />}
        label="Sign Out"
        labelStyle={{ color: 'black', fontWeight: 'bold', marginLeft: -15 }}
        onPress={() => {
          handleLogout();
        }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props}  />}
      drawerStyle={{
        width: 200,
        backgroundColor: '#e8e1c1',
      }}
      screenOptions={{headerShown:false}}
      drawerContentOptions={{
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
      
        activeTintColor: 'white',
        inactiveTintColor: 'brown',
        itemStyle: { backgroundColor: null },
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'ADOPTION',
          drawerIcon: ({ color, size }) => <Icon name="paw" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="DONATION"
        component={Donation}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="gift" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="ADD PET"
        component={AddPet}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="plus-box" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="FAVOURITES"
        component={Favourites}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="heart" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="PROFILE"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="account" color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
