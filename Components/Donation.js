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
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Donation = ({navigation}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [isPressed3, setIsPressed3] = useState(false);
  const [isPressed4, setIsPressed4] = useState(false);
  const [isPressed5, setIsPressed5] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAmounts, setSelectedAmounts] = useState([]);
  const [imageUri, setImageUri] = useState(null);

  const handlePress = () => {
    setIsPressed(!isPressed);
    Alert.alert('Thank You for Donating');
  };
  const handlePress2 = () => {
    setIsPressed2(!isPressed2);
    Alert.alert('Thank You for Donating');
  };
  const handlePress3 = () => {
    setIsPressed3(!isPressed3);
    Alert.alert('Thank You for Donating');
  };

  const handlePress4 = () => {
    setIsPressed4(!isPressed4);
    Alert.alert('Thank You for Donating');
  };
  const handlePress5 = () => {
    setIsPressed5(!isPressed5);
    Alert.alert('Thank You for Donating');
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddCustomAmount = () => {
    if (customAmount) {
      setSelectedAmounts([...selectedAmounts, customAmount]);

      setCustomAmount('');

      toggleModal();
    }
  };
  useEffect(() => {
    // Retrieve the image URI from AsyncStorage
    const retrieveImageUri = async () => {
      try {
        const uri = await AsyncStorage.getItem('userImageURI');
        if (uri) {
          setImageUri(uri);
        }
      } catch (error) {
        console.error('Error retrieving image URI from AsyncStorage:', error);
      }
    };

    retrieveImageUri();
  }, []);

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
            <Text style={styles.profileText}>Donation</Text>
            <TouchableOpacity>
              <ImageBackground
                source={require('./Images/Ellipse2.png')}
                style={styles.ellipseBar}
                resizeMode="contain">
                <Image
                  source={{uri:imageUri}}
                  style={styles.catImage}></Image>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.3}}>
            <Image
              source={require('./Images/donate.png')}
              style={styles.main}></Image>
          </View>
          <View style={{margin: 10}}>
            <Text style={styles.text}>Save a life. Donate today.</Text>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              margin: 10,
              marginLeft: 10,
              marginRight: 10,
            }}>
            <View>
              <TouchableOpacity
                style={[styles.amount, isPressed && styles.buttonPressed]}
                onPress={handlePress}>
                <Text
                  style={{fontFamily: 'Roboto', fontSize: 16, color: 'black'}}>
                  $25
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.amount, isPressed2 && styles.buttonPressed]}
                onPress={handlePress2}>
                <Text
                  style={{fontFamily: 'Roboto', fontSize: 16, color: 'black'}}>
                  $50
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.amount, isPressed3 && styles.buttonPressed]}
                onPress={handlePress3}>
                <Text
                  style={{fontFamily: 'Roboto', fontSize: 16, color: 'black'}}>
                  $100
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginLeft: 10, flexDirection: 'row'}}>
            {selectedAmounts.map((amount, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.amount, isPressed4 && styles.buttonPressed]}
                onPress={handlePress4}>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 16,
                    color: 'black',
                  }}>
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={toggleModal} style={styles.pressable}>
              <Text style={styles.buttonText}>Add other amount</Text>
            </TouchableOpacity>
          </View>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />
        </View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Custom Amount</Text>
              <TextInput
                style={styles.customAmountInput}
                placeholder="$ Enter Amount"
                onChangeText={text => setCustomAmount(text)}
                value={customAmount}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.customAmountButton}
                onPress={handleAddCustomAmount}>
                <Text style={styles.customAmountButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Donation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e1c1',
    height: '100%',
    width: '100%',
  },
  bar: {
   flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    marginTop: 45,
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10,
    marginTop: 5,
  
  },
  ellipseBar: {
    width: 40,
    height: 40,
    marginLeft: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    height: 255,
    width: 385,
    margin: 15,
    alignSelf: 'center',
    borderRadius: 30,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginLeft: 20,
    color: 'black',
  },
  amount: {
    width: 116,
    height: 48,
    backgroundColor: '#E9D886',
    borderRadius: 52,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonPressed: {
    backgroundColor: '#5D4A66',
  },
  pressable: {
    width: 380,
    height: 56,
    borderRadius: 52,
    marginTop:20,
    borderWidth: 2,
    borderColor: ' rgba(106, 93, 123, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottom: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 190,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    width: 500,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  customAmountInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  customAmountButton: {
    backgroundColor: '#E9D886',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
   
  },
  customAmountButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
});
