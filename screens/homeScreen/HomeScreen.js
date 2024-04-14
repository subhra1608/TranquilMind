import { View, Text ,Image,StyleSheet, ActivityIndicator, Alert, SafeAreaView, ScrollView} from 'react-native'
import React, { useState,useEffect } from 'react'
import { FlatList,TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import youTubeData from '../../data/youTubeData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18';
import translations from './translations';

const HomeScreen = ({navigation}) => {

  
  const [quote, setQuote] = useState(null);
  const [fontsLoaded] = useState(true);
  const [language,setLanguage]=useState("");
  const t = i18n.t;

  
  useEffect(() => {
    setLanguageFromAsyncStorage();
    fetchQuote();
  }, []);

  const setLanguageFromAsyncStorage = async ()=>
  {
      const getSelectedLanguage = await AsyncStorage.getItem('language');
      if(getSelectedLanguage===null)
      {setLanguage('en');}
      else
      {setLanguage(getSelectedLanguage);}
  }

  const renderYouTubeSeries = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('YouTubeScreen',{item:{item:{articleUrl:item.playlistURL}}})}}>
        <View className="h-48 w-48 m-2 rounded-xl mt-1">
          <View className="justify-center">
          <Image source={{ uri:item.thumbnail }} className=" justify-center top-1 justify-items-center h-40 w-48 rounded-xl" />
          </View>
          <View className=" justify-items-center">
            <Text className="text-center text-md text-black mt-2 ">{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


    const renderQuotes = ({ item }) => {
      return (
        <View style={styles.item} className="shadow-lg rounded-3xl p-1" >
          <Text style= {styles.overlay} className="text-lg p-2 mt-1 text-white justify-items-center  font-bold" >{item.text}</Text>
          {/* <Text style={styles.author}>{item.author}</Text> */}
        </View>
      );
    };

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://type.fit/api/quotes');
      // Assuming response.data is an array of quotes
      if (response.data && response.data.length > 0) {
        setQuote(response.data);
      }
    } catch (error) {
      console.log(error.message);
      console.error('Error fetching quote:', error);
    }
  };
  
    const showAlert = (emotions, language) => {
      console.log(emotions,language);
      const translation = translations[language][emotions];
      const { title, message,okButton } = translation;
    
      return Alert.alert(
        title,
        message,
        [{ text: okButton }],
        { cancelable: true }
      );
    };

  const seeAll = () => {
    navigation.navigate("QuizScreen");
  };

      return(
        <>
        {fontsLoaded && (
            <View className=" bg-white">
          <View className=" px-2 py-2 ">
              <Image
              className=" h-48 w-full rounded-3xl"
              source={{ uri: 'https://media.istockphoto.com/id/1443495299/vector/abstract-fingerprint-seamless-background-finger-marks-on-a-dark-purple-background-shades-of.jpg?s=612x612&w=0&k=20&c=vgn7pKgCI3FAdDE7HyAjQCQ896zCBzfpGyrpyebut0k=' }} // Replace with your image URI
              resizeMode="cover"
              />
              <View className="absolute top-5 left-4 ">
              <Text className=" font-bold text-lg ml-20 text-neutral-50">{t('welcomeMessage', { lng: language })}</Text>
              <Text className="mt-2 font-bold text-lg ml-20 text-neutral-50">{t('How are you feeling today', { lng: language })}</Text>
              <View className="flex-row justify-between">
              <View>
                <TouchableOpacity onPress={()=>{showAlert("confused",language)}}>
                  <Image 
                    className="h-20 w-20 m-2"
                    source={require('../../assets/images/confused.png')}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={()=>{showAlert("happy",language)}}>
                  <Image 
                    className="h-20 w-20 m-2"
                    source={require('../../assets/images/happy.png')}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={()=>{showAlert("sad",language)}}>
                  <Image 
                    className="h-20 w-20 m-2"
                    source={require('../../assets/images/sad.png')}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={()=>{showAlert("angry",language)}}>
                  <Image 
                    className="h-20 w-20 m-2"
                    source={require('../../assets/images/ang.png')}
                  />
                </TouchableOpacity>
              </View>
              
              
              
              </View>
              </View>
          </View> 
          <View className=" flex-1 bg-white">
  
            <View className=" h-8 mb-2 flex-row justify-between">
              <View >
                <Text style={{ fontSize:22,fontWeight:'600'}} className="mt-1 ml-4" >Mental Checkout</Text>
              </View>
              
            </View>
            <View className="flex-row mx-2 p-2 h-20 rounded-3xl" style={{backgroundColor:"#8155BA"}}>
              <View className="flex-row w-10/12">
                <View className="flex-col flex-1 justify-between">
                  <View className="flex-1">
                    <Text  className=" text-lg mx-1  text-white ">Test your stress Level</Text>
                  </View>
                </View>
   
              </View>
              <View className="flex flex-col justify-center bg">
                  <TouchableOpacity onPress={() =>{seeAll()} } >
                      <Ionicons name="chevron-forward-outline" size={64} color="white" ></Ionicons>
                  </TouchableOpacity>
                </View>
            </View>
            <Text className=" mt-2 ml-3 mb-2 text-lg">Glance over these beautiful quotes!</Text>
            
            <View className="flex-1  mx-1  rounded-3xl ">
              <FlatList
              data={quote}
              renderItem={renderQuotes}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true} // Set to true for horizontal scroll
              />
            </View>
          </View>
          <View className="flex-1 rounded-lg">
          <Text className="mt-2 ml-2 mb-2 text-lg"> You Tube channels for self development </Text>
          <View className="h-60">
          <FlatList
              data={youTubeData}
              renderItem={({ item}) => renderYouTubeSeries(item={item})}
              keyExtractor={item => item.playlistId.toString()}
              horizontal={true}
              // numColumns={2}
              showsHorizontalScrollIndicator={false}
          />
        </View>
          </View>
          </View>
        )}
        {
          !fontsLoaded && <ActivityIndicator size={100}/>
        }
        </>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    height:120,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor:"#8155BA",
    width: 250, // Set width of each item
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

