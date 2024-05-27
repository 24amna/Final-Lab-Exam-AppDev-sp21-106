import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged } from "firebase/auth";


const SignUp = ({navigation}) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [name, setName] = useState('');  
  const [lastName, setlastName] = useState('');  
  const [Cpassword, setCPassword] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);


const handleHaveAccount=()=>{
  navigation.navigate("Login");
} 

const handleSignUp = async () => {
  // Trim email input
  const trimmedEmail = email.trim();
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    setError('Invalid email format');
    return;
  }

  try {
    setIsLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
    console.log("Successful", userCredential);
    navigation.navigate('Login');
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};


  return (
   
    <ScrollView>   

    <View style={styles.container}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          margin: 10,
          marginTop:80,
          padding: 10,
        }}>
        <Text style={styles.firstText}>Sign Up</Text>
        <Text style={styles.secondText}>
          Fill in the form to continue
        </Text>
       
      </View>
      <View style={{flex: 0.4, justifyContent: 'center', margin: 10, marginTop:70}}>
      <View style={styles.inputContainer}>
        
        <TextInput placeholder="First Name" onChangeText={(text) => setName(text)} 
        value={name}/>
      </View>
      <View style={styles.inputContainer}>
        
        <TextInput placeholder="Last Name" onChangeText={(text) => setlastName(text)} 
        value={lastName}/>
      </View>
        <View style={styles.inputContainer}>
        
          <TextInput placeholder="Enter Email" onChangeText={(text) => setEmail(text)} 
          value={email}/>
        </View>
        <View style={styles.inputContainer}>          
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)} 
            value={password}
          />
          
        </View>
        <View style={styles.inputContainer}>
        
          <TextInput placeholder="Confirm Password" 
          onChangeText={(text) => setCPassword(text)} 
          value={Cpassword}
          />
        </View>
       
      </View>
      <View
        style={{flex: 0.2, alignItems: 'center', justifyContent: 'flex-end', marginTop:120}}>
        <TouchableOpacity style={styles.pressable} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
      <View style={styles.wrap}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleHaveAccount}>
          <Text style={styles.loginText}> Login</Text>
        </TouchableOpacity>
      </View>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle={'dark-content'}/>
    </View>
    </ScrollView>
   
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'mintcream',
    height: '100%',
    width: '100%',
  },
  firstText: {
    color: 'darkblue',
    
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  secondText: {
    fontFamily: 'Roboto',
    color:'darkblue',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 14,
    padding: 13,
    margin: 5,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
    margin: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  pressable: {
    width: 380,
    height: 56,
    borderRadius: 52,
    backgroundColor: 'cornflowerblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  wrap: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    marginBottom:40
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'cornflowerblue',
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'darkblue',
  },
});