import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    ImageBackground,
    TextInput,
    FlatList,
    ListRenderItem,
  } from 'react-native';
  
  import React, { useState, useEffect } from 'react';
  import { GestureHandlerRootView } from 'react-native-gesture-handler';
  import { useNavigation, NavigationProp } from '@react-navigation/native';
  import { DrawerNavigationProp } from '@react-navigation/drawer'; // Import DrawerNavigationProp
  import { ref, onValue, off, getDatabase } from 'firebase/database';
  
  import { app } from '../firebase';
  
  // Define the types for category and pet data
  interface Category {
    category_id: number;
    title: string;
  }
  
  interface Pet {
    id: number;
    name: string;
    categoryId: number;
    image: string;
    location: string;
  }
  
  interface HomeProps {
    navigation: DrawerNavigationProp<any>; // Use DrawerNavigationProp
  }
  
  const Home: React.FC<HomeProps> = ({ navigation }) => {
    const [categoryData, setCategoryData] = useState<Category[] | null>(null);
    const [petData, setPetData] = useState<Pet[]>([]);
    const [userName, setUserName] = useState<string>('');
    const [imageUri, setImageUri] = useState<string | null>(null);
  
    // to filter the data based on selection
    const [selectedCategory, setSelectedCategory] = useState<string>('');
  
    const renderCategoryItem: ListRenderItem<Category> = ({ item }) => {
      // Function to get the corresponding image based on category name
      const getImageSource = (categoryName: string) => {
        switch (categoryName.toLowerCase()) {
          case 'cats':
            return require('./Images/catTab.png');
          case 'dogs':
            return require('./Images/dogFace.png');
          case 'birds':
            return require('./Images/bird.png');
          case 'bunnies':
            return require('./Images/rabbit-face.png');
          default:
            return null;
        }
      };
  
      return (
        <TouchableOpacity onPress={() => setSelectedCategory(item.title)}>
          <View style={{ marginTop: 10 }}>
            <ImageBackground
              source={require('./Images/circle.png')}
              style={styles.tabs}
            >
              <Image source={getImageSource(item.title)} style={styles.pets} />
            </ImageBackground>
            <Text style={styles.petNames}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  
    const renderPetItem: ListRenderItem<Pet> = ({ item }) => {
      // console.log(selectedCategory);
      if (
        (selectedCategory === 'Cats' && item.categoryId === 3) ||
        (selectedCategory === 'Birds' && item.categoryId === 1) ||
        (selectedCategory === 'Dogs' && item.categoryId === 2) ||
        (selectedCategory === 'Bunnies' && item.categoryId === 4)
      ) {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { item })}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                shadowColor: 'grey',
                marginTop: 10,
                marginBottom: 20,
                width: 370,
                height: 240,
                borderRadius: 18,
                alignSelf: 'center',
              }}
            />
            <View style={styles.description}>
              <Text
                style={{
                  color: '#150C1A',
                  fontSize: 25,
                  fontWeight: '700',
                  lineHeight: 24,
                  margin: 20,
                }}
              >
                {item.name}
              </Text>
  
              <View style={{ position: 'absolute', right: 10, marginTop: 15 }}>
                <ImageBackground
                  source={require('./Images/circle.png')}
                  style={{
                    height: 45,
                    width: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={require('./Images/share.png')}
                    style={{ height: 25, width: 25 }}
                  />
                </ImageBackground>
              </View>
              <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <Image
                  source={require('./Images/location.png')}
                  style={{ marginLeft: 15, marginBottom: 20 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Roboto',
                    marginLeft: 15,
                    marginBottom: 20,
                  }}
                >
                  {item.location}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else {
        // Skip rendering for items not in the selected category
        return null;
      }
    };
  
    useEffect(() => {
      // Fetch category data from Firebase
      const db = getDatabase(app); // Get the Firebase Realtime Database instance
      const categoriesRef = ref(db, 'categories');
      const categoriesListener = onValue(categoriesRef, (snapshot) => {
        const categories = snapshot.val();
        if (categories) {
          setCategoryData(Object.values(categories));
          console.log(categories);
        }
      });
  
      // Fetch pet data from Firebase
      const petsRef = ref(db, 'pets');
      const petsListener = onValue(petsRef, (snapshot) => {
        const pets = snapshot.val();
        if (pets) {
          setPetData(Object.values(pets));
          console.log(pets);
        }
      });
  
      return () => {
        // Unsubscribe from Firebase listeners when component unmounts
        off(categoriesRef);
        off(petsRef);
      };
    }, []);
  
    return (
      <GestureHandlerRootView>
        <View style={styles.container}>
          <View style={styles.bar}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image source={require('./Images/menu.png')} />
            </TouchableOpacity>
            <Text style={styles.profileText}>{userName}</Text>
            <TouchableOpacity>
              <ImageBackground
                source={require('./Images/Ellipse2.png')}
                resizeMode="contain"
                style={styles.ellipseBar}
              >
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.catImage} />
                ) : (
                  <Image source={require('./Images/cat.png')} style={styles.defaultCatImage} />
                )}
              </ImageBackground>
            </TouchableOpacity>
          </View>
  
          <View style={styles.bar2}>
            <View style={styles.inputContainer}>
              <Image
                source={require('./Images/search.png')}
                style={styles.icon}
              />
              <TextInput placeholder="Search Pets to adopt" />
            </View>
            <ImageBackground
              source={require('./Images/circle.png')}
              style={styles.circle}
            >
              <Image
                source={require('./Images/filter.png')}
                style={{ height: 30, width: 30, alignSelf: 'center' }}
              ></Image>
            </ImageBackground>
          </View>
  
          <FlatList
            horizontal
            data={categoryData}
            keyExtractor={(item) => item.category_id.toString()}
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
              marginBottom: 20,
            }}
            renderItem={renderCategoryItem}
          />
  
          <FlatList
            data={petData}
            keyExtractor={(item) => item.id.toString()}
            style={{ marginTop: 30 }}
            renderItem={renderPetItem}
          />
  
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle={'dark-content'}
          ></StatusBar>
        </View>
      </GestureHandlerRootView>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#e8e1c1',
      width: '100%',
      height: '100%',
    },
    bar: {
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
      marginLeft: 80,
    },
    ellipseBar: {
      width: 50,
      height: 50,
      marginLeft: 210,
      alignItems: 'center',
      justifyContent: 'center',
    },
    catImage: {
      height: 45,
      width: 45,
      borderRadius: 25,
      alignSelf: 'center',
      justifyContent: 'center',
      marginRight: 10,
      marginTop: 5,
    },
    defaultCatImage: {
      alignSelf: 'center',
      justifyContent: 'center',
      height: 90,
      width: 90,
      marginTop: 20,
      marginLeft: 10,
    },
    bar2: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      marginLeft: 5,
      marginRight: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 30,
      padding: 2,
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 12,
      width: 330,
      backgroundColor: 'white',
    },
    icon: {
      marginRight: 10,
      margin: 10,
    },
    circle: {
      height: 40,
      width: 40,
      marginTop: 5,
      justifyContent: 'center',
      alignSelf: 'flex-start',
      marginRight: 10,
    },
    tabs: {
      height: 60,
      width: 60,
      alignSelf: 'center',
      justifyContent: 'center',
      marginLeft: 20,
    },
    pets: {
      height: 30,
      width: 30,
      alignSelf: 'center',
      justifyContent: 'center',
      alignContent: 'center',
    },
    petNames: {
      fontSize: 20,
      fontFamily: 'Roboto',
      fontWeight: '700',
      marginLeft: 40,
      marginRight: 20,
      marginTop: 5,
      marginBottom: 55,
    },
    central: {
      alignItems: 'center',
      backgroundColor: '#e8e1c1',
    },
    description: {
      borderWidth: 1,
      borderColor: '#FFF',
      borderRadius: 20,
      padding: 2,
      marginRight: 20,
      marginLeft: 17,
      marginBottom: 12,
      marginTop: -80,
      width: 380,
      height: 100,
      backgroundColor: '#FFF',
      shadowColor: 'grey',
    },
  });
  