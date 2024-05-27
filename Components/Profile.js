import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';

const Profile = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [imageUri, setImageUri] = useState();
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the user token from AsyncStorage
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
          // Include the token in the API request headers
          const headers = {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          };

          const response = await fetch(
            'https://petstore.codingsolution24.com/api/auth/profile',
            {
              method: 'GET',
              headers: headers,
            },
          );
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setName(data.name);
            setEmail(data.email);
          } else {
            console.error('Error fetching user data:', response.statusText);
          }
        } else {
          // Handle the case where the token is not found in AsyncStorage
          console.error('Token not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateProfile = async () => {
   
  };

  const handleImagePicker = async () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageURI = response.uri || response.assets[0].uri;
        setImageUri(imageURI);
        saveImageUriToAsyncStorage(imageURI);
      }
    }).catch(error => {
      console.error('Handled Promise Rejection:', error);
    });
    // try {
    //   console.log("i am in doc picker");
    //   const result = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.images],
    //   });
    //   console.log(result.uri);
    //   setImageUri(result.uri);

    // } catch (error) {
    //   if (DocumentPicker.isCancel(error)) {
    //     console.log('Document picker was canceled');
    //   } else {
    //     console.log('Error picking a document:', error);
    //     // Handle other errors as needed
    //   }
    // }
  };

  const saveImageUriToAsyncStorage = async imageURI => {
    try {
      await AsyncStorage.setItem('userImageURI', imageURI);
      console.log('Image URI saved to AsyncStorage:', imageURI);
    } catch (error) {
      console.error('Error saving image URI to AsyncStorage:', error);
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View>
          <View style={styles.container}>
            <View style={styles.bar}>
              <TouchableOpacity onPress={() => {
              navigation.toggleDrawer();
            }}>
                <Image source={require('./Images/menu.png')} />
              </TouchableOpacity>
              <Text style={styles.profileText}>Profile</Text>
              <TouchableOpacity>
                <Image
                  source={require('../Components/Images/edit.png')}
                  style={{marginLeft: 110, marginBottom:10, width:30, height:30 }}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('./Images/Ellipse.png')}
                resizeMode="contain"
                style={{width: 115, height: 126}}>
                {imageUri ? (
                  <Image source={{uri: imageUri}} style={styles.profileImage} />
                ) : (
                  <Image
                    source={require('./Images/cat.png')}
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}></Image>
                )}
              </ImageBackground>
              <TouchableOpacity onPress={handleImagePicker}>
                <ImageBackground
                  source={require('./Images/circle.png')}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: -10,
                    width: 30,
                    height: 30,
                  }}>
                  <Image
                    source={require('./Images/camera.png')}
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginTop: -5,
                      width: 20,
                      height: 20,
                    }}></Image>
                </ImageBackground>
              </TouchableOpacity>
              <Text></Text>
              <Text style={styles.user}>Fatima</Text>
              <Text style={styles.joinTime}>Joined 1hour ago</Text>
            </View>
            <View style={styles.center}>
              <View style={styles.inputContainer}>
                <Image
                  source={require('./Images/user.png')}
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={text => {
                    setName(text);
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Image
                  source={require('./Images/mail-icon.png')}
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Email or Phone numbers"
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Image
                  source={require('./Images/lock-icon.png')}
                  style={styles.icon}
                />
                <TextInput
                  secureTextEntry={true}
                  placeholder="Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={{right: 20, position: 'absolute'}}>
                  {showPassword ? (
                    <Image
                      source={require('./Images/eye.png')}
                      style={{marginLeft: 15}}
                    />
                  ) : (
                    <Image
                      source={require('./Images/eye-disable.png')}
                      style={{marginLeft: 15}}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.last}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdateProfile}>
                <Text style={styles.updateText}> Update</Text>
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle={'dark-content'}></StatusBar>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e1c1',
    height: '100%',
    width: '100%',
  },
  bar: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 50,
    margin: 10,
  },
  profileText: {
    fontFamily: 'Roboto',
    color: '#150C1A',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 120,
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  user: {
    marginTop: 40,
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
    lineHeight: 28,
  },
  joinTime: {
    color: '#aeb3ad',
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  center: {
    flex: 0.6,
    //backgroundColor: 'red',
    marginTop: 40,
  },
  last: {
    flex: 0.1,
    //backgroundColor: 'purple',
    marginTop: 170,
    //marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 2,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
    margin: 10,
  },
  updateButton: {
    width: 380,
    height: 56,
    borderRadius: 52,
    backgroundColor: ' rgba(106, 93, 123, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
  },
  updateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 115 / 2,
    alignSelf: 'center',
    marginTop: 30,
  },
});
