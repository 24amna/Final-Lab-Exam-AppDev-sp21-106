import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { ImagePicker} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import {app} from '../firebase';
import { getDatabase, ref, push, get, child } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';


const AddPet = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [details, setDetails] = useState('');
  const [age, setAge]= useState('');
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const handleAddPet = async () => {
    try {
      const database = getDatabase();
      const petsRef = ref(database, 'pets');

      const petSnapshot = await get(child(petsRef));
      const petCount = petSnapshot.numChildren();

      const newId = petCount + 1;

      const newPetData = {
        id: newId,
        name: name,
        categoryId: 2, 
        image: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*', 
        location: location,
        age: age,
        gender: gender,
        details: details
      };

      await push(petsRef, newPetData);

      alert("Successfully added pet data");
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };
 

  return (
    <KeyboardAvoidingView>
      <ScrollView>
    <View style={styles.container}>
      <View style={styles.bar}>
        <TouchableOpacity onPress={() => {
              navigation.toggleDrawer();
            }}>
          <Image source={require('./Images/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.profileText}>Add Pet</Text>
        
      </View>
      <View style={{flex: 0.2, alignItems:'center', justifyContent:'center',marginTop:20}}>
      <TouchableOpacity style={styles.addImage} >
        {image ? (
          <Image source={{ uri: image }} style={styles.addImageIcon} resizeMode="contain" />
        ) : (
          <Image source={require('./Images/camera2.png')} style={styles.addImageIcon} resizeMode="contain" />
        )}
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '700',
            color: '#150C1A',
            margin: 5,
          }}>
          Upload Image
        </Text>
      </TouchableOpacity>
      </View>
      <View style={{flex:0.6,alignItems:'center', justifyContent:'center',marginTop:20,  marginBottom:20,}}>
      <View style={styles.inputContainer}>
        <Image source={require('./Images/Cat-Icon.png')}  style={styles.icon} />
          <TextInput placeholder="Pet Name" onChangeText={(text)=>setName(text)}/>
      </View>
        <View style={styles.inputContainer}>
        <Image source={require('./Images/location2.png')}  style={styles.icon} />
          <TextInput placeholder="Location" onChangeText={(text)=>setLocation(text)}/>
        </View>
        <View style={styles.inputContainer}>
        <Image source={require('./Images/alarm.png')}  style={styles.icon} />
          <TextInput placeholder="Age" onChangeText={(text)=>setAge(text)} />
        </View>
        <View style={styles.inputContainer}>
        <Image source={require('./Images/gender.png')}  style={styles.icon} />
          <TextInput placeholder="Gender" onChangeText={(text)=>setGender(text)}/>
        </View>
        <View style={styles.detail}>
        <Image source={require('./Images/clipboard.png')}  style={styles.icon} />
          <TextInput placeholder="Details" 
          multiline
          maxLength={80}
          onChangeText={(text)=>setDetails(text)}
          />
        </View>

      </View>
      
      <View style={{flex: 0.2, alignItems:'center',justifyContent:'center',marginTop:40, marginBottom:10, }}>
        <TouchableOpacity onPress={handleAddPet} style={styles.pressable}>
          <Text style={styles.buttonText}>Add Pet</Text>
        </TouchableOpacity>
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

export default AddPet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e1c1',
    height: '100%',
    width: '100%',
  },
  bar: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  profileText: {
    fontFamily: 'Roboto',
    color: '#150C1A',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 10,
  marginLeft: 110,
  
  },
  catImage: {
    height: 50,
    width: 50,
    borderRadius:25,
    //alignSelf: 'center',
   // justifyContent: 'center',
  
    //marginRight: 10,
    marginTop: 5,
    //marginLeft:100
  },
  addImage: {
    width: 380,
    height: 210,
    backgroundColor: '#E9D886',
    borderRadius: 24,
    marginTop: 10,
    marginBottom:10,
    marginLeft:25,
    marginRight:25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageIcon: {
    height: 70,
    width: 70,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    width:380,
    height:50,
    marginLeft: 25,
    marginRight:25,
    marginTop:10,

    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
    margin: 10,
  },
  detail:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    width:380,
    height:90,
    marginLeft: 25,
    marginRight:25,
    marginTop:10,
    marginBottom:10,
    backgroundColor: 'white',
  },
  pressable: {
    width: 380,
    height: 56,
    borderRadius: 52,
    backgroundColor: ' rgba(106, 93, 123, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    marginBottom:10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
