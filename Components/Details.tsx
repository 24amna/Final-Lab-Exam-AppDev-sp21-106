import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    ImageBackground,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  import { NavigationProp, RouteProp } from '@react-navigation/native';
  
  // Define the types for navigation and route props
  interface DetailsProps {
    navigation: NavigationProp<any>;
    route: RouteProp<{ params: { item: any } }, 'params'>;
  }
  
  interface DetailsState {
    currentDate: Date;
  }
  
  class Details extends React.Component<DetailsProps, DetailsState> {
    constructor(props: DetailsProps) {
      super(props);
      this.state = {
        currentDate: new Date(),
      };
    }
  
    render() {
      const { item } = this.props.route.params;
      const { currentDate } = this.state;
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const { width: Width } = Dimensions.get('window');
      let tintColor = '';
  
      if (item.gender === 'Male') {
        tintColor = 'blue';
      } else if (item.gender === 'Female') {
        tintColor = 'pink';
      }
  
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.main}>
          <ImageBackground
                    source={{ uri: item.image }}
                    style={{ width: Width, height: 370 }}
                    resizeMode='cover'>
                    <View style={{ flexDirection: 'row', marginTop: 50 }}>
                <TouchableOpacity
                  style={{ marginLeft: 20, marginTop: 5 }}
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <Image source={require('./Images/arrow-left.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 25,
                    width: 25,
                    height: 25,
                  }}>
                  <Image
                    source={require('./Images/favourite2.png')}
                    resizeMode="contain"
                    style={{ width: 23, height: 24 }}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
  
          <View style={styles.info}>
            <View style={{ marginTop: 15 }}>
              <Text style={styles.name}>{item.name}</Text>
              <ImageBackground
                source={require('./Images/circle.png')}
                style={styles.share}>
                <Image source={require('./Images/share.png')} />
              </ImageBackground>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Image
                  source={require('./Images/location.png')}
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.address}>{item.location}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center' }}>
              <Image source={require('./Images/alarm2.png')} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontFamily: 'Roboto',
                  fontWeight: '700',
                }}>
                {item.age}
              </Text>
  
              <Image
                source={require('./Images/gender2.png')}
                style={{ marginLeft: 10, tintColor }}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 16,
                  fontFamily: 'Roboto',
                  fontWeight: '700',
                }}>
                {item.gender}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', margin: 10 }}>
              <ImageBackground
                source={require('./Images/Ellipse2.png')}
                resizeMode="contain"
                style={{
                  width: 46,
                  height: 46,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('./Images/cat.png')}
                  style={{ width: 70, height: 70, marginTop: 10 }}
                />
              </ImageBackground>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.owner}>Sofia Oliver</Text>
                <Text style={styles.status}>Owner</Text>
              </View>
              <Text style={styles.date}>
  {currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</Text>
            </View>
            <Text style={styles.extraInfo}>{item.details}</Text>
            <View style={styles.button}>
              <TouchableOpacity style={styles.pressable}>
                <Text style={styles.buttonText}>Adopt now</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <StatusBar translucent={true} backgroundColor={'transparent'} />
        </SafeAreaView>
      );
    }
  }
  
  export default Details;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'beige',
      width: '100%',
      height: '100%',
    },
    main: {
      borderRadius: 24,
    },
    info: {
      marginTop: 10,
    },
    share: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      position: 'absolute',
      right: 10,
      marginTop: 20,
    },
    name: {
      fontFamily: 'Roboto',
      color: '#150C1A',
      fontWeight: '700',
      fontSize: 24,
      marginTop: 15,
      marginBottom: 10,
      marginLeft: 15,
    },
    address: {
      fontFamily: 'Roboto',
      color: '#C4C4C4',
      fontWeight: '700',
      fontSize: 16,
    },
    owner: {
      fontFamily: 'Roboto',
      fontSize: 18,
      fontWeight: '700',
      marginLeft: 10,
    },
    status: {
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: '200',
      marginLeft: 10,
    },
    date: {
      color: '#c2baba',
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: '500',
      position: 'absolute',
      right: 10,
      lineHeight: 25,
      marginTop: 10,
    },
    extraInfo: {
      color: '#333',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '200',
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
      alignItems: 'center',
    },
    pressable: {
      width: 380,
      height: 56,
      borderRadius: 52,
      backgroundColor: '#E9D886',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    button: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: 35,
    },
  });
  