import {NavigationContainer} from '@react-navigation/native';
import React ,{ Component, useEffect }from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
const Stack = createNativeStackNavigator();
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import ProgressBar from './ProgressBar';
import { useNavigation } from '@react-navigation/native';


const LoadingScreen = () => {
 const navigation= useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Home');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <View>
      <ImageBackground
        source={require('../Components/Images/Pet.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1}}>
          <View
            style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../Components/Images/Logo.png')}
              style={{height: 120, width: 120}}
            />
            <Text style={styles.text}>Shelter the Pet</Text>
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom:5
            }}>
              <ProgressBar/>
            </View>
        </View>
      </ImageBackground>

      <StatusBar translucent={true} backgroundColor="transparent" />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: 40,
    height: 40,
    position: 'absolute',
    justifyContent: 'center',
    marginTop: 120,
    marginLeft: 150,
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    fontFamily: 'Roboto',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
});

export default LoadingScreen;
