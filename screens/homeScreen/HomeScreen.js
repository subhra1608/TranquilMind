import { View, Text ,Image,StyleSheet, ActivityIndicator} from 'react-native'
import React, { useState,useEffect } from 'react'
import { FlatList,TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import GraphComponent from '../../Components/GraphComponent'
import { useFonts } from 'expo-font';
import Carousel from '../../Components/Carousel';
import youTubeData from '../../data/youTubeData';


const HomeScreen = ({navigation}) => {

  
  const [quote, setQuote] = useState(null);
  const [fontsLoaded] = useState(true);
  
  useEffect(() => {
    
    fetchQuote();
  }, []);

  const renderYouTubeSeries = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('YouTubeScreen',{item:{item:{articleUrl:item.playlistURL}}})}}>
        <View className="h-56 w-52 rounded-xl mt-2">
          <View className="justify-center">
          <Image source={{ uri:item.thumbnail }} className=" justify-center top-1 left-6 justify-items-center h-40 w-48 rounded-xl" />
          </View>
          <View className=" justify-items-center">
            <Text className="text-center text-lg text-black mt-2 ">{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


    const renderQuotes = ({ item }) => {
      return (
        <View style={styles.item} className="shadow-lg rounded-3xl p-3" >
          <Text style= {styles.overlay} className="text-lg p-3 mt-1 text-white justify-items-center  font-bold" >{item.text}</Text>
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
  

  const seeAll = () => {
    navigation.navigate("QuizScreen");
  };

      return(
        <>
        {fontsLoaded && (
          <View className="  flex-1 flex-col bg-white">
          <View className=" px-2 py-2 ">
              {/* <Image
              className=" h-48 w-full rounded-3xl"
              source={{ uri: 'https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-77.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707609600&semt=sph' }} // Replace with your image URI
              resizeMode="cover"
              /> */}
              <Carousel/>
          </View> 
          <View className=" flex-1 bg-white">
  
            <View className=" h-8 mb-2 flex-row justify-between">
              <View >
                <Text style={{ fontSize:22,fontWeight:'600'}} className="mt-1 ml-4" >Mental Checkout</Text>
              </View>
              
            </View>
            <View className="flex-row mx-2 p-2 h-20 rounded-3xl" style={{backgroundColor:"#9B8BCA"}}>
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
          <Text className="mt-2 ml-3 mb-2 text-lg"> You Tube channels for self development </Text>
          <View>
          <FlatList
              data={youTubeData}
              renderItem={({ item}) => renderYouTubeSeries(item={item})}
              keyExtractor={item => item.playlistId.toString()}
              horizontal={true}
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
    backgroundColor:"#9B8BCA",
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

