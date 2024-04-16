import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions, ActivityIndicator } from 'react-native';
import PostCardComponent from '../../Components/PostCardComponent';
import { postData } from '../../data/postData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../data/baseUrl';
import QnAComponent from '../../Components/QnAComponent';

const { width } = Dimensions.get('window');
const segmentWidth = width / 2; 

  const CommunityScreen = ({ navigation }) => {

  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [isViewPostsSelected,setIsViewPostsSelected]=useState(true);
  const [post,setPost]=useState({});
  const [isLoading,setIsLoading]=useState(true);
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const [isRefresh,setIsRefresh]=useState(false);

  useEffect(() => {
    fetchPosts();
  }, [isRefresh])

  const fetchPosts = async() => {

    setIsLoading(true);
    const token = await  AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/api/post/get-posts`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(response.data);
      setIsRefresh(true);

;    } catch (error) {

      console.log(error.message);
      console.error('Error Getting details:', error);
    }    

   setIsLoading(false);
   
  };

  const handleSelectSegment = (index) => {
    Animated.timing(indicatorAnim, {
      toValue: index * segmentWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setSelectedSegmentIndex(index);

    if(index===0)
    setIsViewPostsSelected(true);
  else if(index===1)
  setIsViewPostsSelected(false);
  };

  const renderItem = ({ item }) => {
    return(
      <PostCardComponent item={item} setIsRefresh={setIsRefresh} setRefresh={isRefresh} />
    );
  }

  const renderItemQnA = ({ item }) => {
    return(
      <QnAComponent item={item} setIsRefresh={setIsRefresh} setRefresh={isRefresh} />
    );
  }
  
  const qnaData=[
    {id:1,question:"How are you",answer:"I'm Fine",userId:1,userName:"Subhra",liked:12,disliked:14},
    {id:2,question:"How are you",answer:"I'm Fine",userId:1,userName:"Subhra",liked:12,disliked:14},
    {id:3,question:"How are you",answer:"I'm Fine",userId:1,userName:"Subhra",liked:12,disliked:14},
    {id:4,question:"How are you",answer:"I'm Fine",userId:1,userName:"Subhra",liked:12,disliked:14},
    {id:5,question:"How are you",answer:"I'm Fine",userId:1,userName:"Subhra",liked:12,disliked:14},
    {id:6,question:"How are you",answer:"I'm Fine",userId:1,userName:"Subhra",liked:12,disliked:14},
  ]

  return (
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
        <Animated.View
          style={[
            styles.indicator,
            { 
              width: segmentWidth - 10, // Slightly less width than the segment
              transform: [{ translateX: indicatorAnim }],
              zIndex: 1,
            },
          ]}
        />
        {['View Posts', 'View Questions'].map((segment, index) => (
          <TouchableOpacity
            key={segment}
            onPress={() => handleSelectSegment(index)}
            style={styles.segment}
          >
            <Text style={[styles.segmentText, selectedSegmentIndex === index && styles.segmentTextActive]}>
              {segment}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <>
        {isViewPostsSelected && !isLoading && 
        ( <View>
          <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen')} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Post</Text>
        </TouchableOpacity>
        <View className=" h-5/6">
        <FlatList
          data={post}
          keyExtractor={(item,index) => item.id.toString()}
          renderItem={renderItem}
        />
        </View>
        </View>)}
      
      { !isLoading && !isViewPostsSelected && (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen')} style={styles.addButton}>
          <Text style={styles.addButtonText}> + Add Question</Text>
        </TouchableOpacity>
        <View  className=" h-5/6">
        <FlatList
          data={qnaData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItemQnA}
        />
        </View>
      </View>
      )}
      { isLoading && (<ActivityIndicator size={30} />)}

      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDD', // Light gray background
    borderRadius: 25,
    margin: 10,
    padding: 2,
  },
  segment: {
    width: segmentWidth,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Ensure the segment text is above the indicator
  },
  segmentText: {
    color: '#7F3DB5', // Purple text color
    fontSize: 16,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#FFFFFF', // White text for the active segment
  },
  indicator: {
    height: '100%',
    borderRadius: 25,
    backgroundColor: '#7F3DB5', // Purple indicator
    position: 'absolute',
    top: 0,
    left: 0,
  },
  addButton: {
    backgroundColor: '#7F3DB5',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  postContainer: {
    marginBottom: 30,
  },
});

export default CommunityScreen;










