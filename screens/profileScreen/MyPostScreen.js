import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions, ActivityIndicator, Alert } from 'react-native';
import PostCardComponent from '../../Components/PostCardComponent';
// import { postData } from '../../data/postData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../data/baseUrl';
import QnAComponent from '../../Components/QnAComponent';
import i18n from '../../i18';
import Header from '../../Components/HeaderComponent';

const { width } = Dimensions.get('window');
const segmentWidth = width / 2; 

  const MyPostScreen = ({ navigation }) => {

  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [isViewPostsSelected,setIsViewPostsSelected]=useState(true);
  const [post,setPost]=useState({});
  const [isLoading,setIsLoading]=useState(true);
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const [isRefresh,setIsRefresh]=useState(false);
  const [language,setLanguage]=useState("");
  const [isGuest, setIsGuest] = useState(false);
  const [questions, setQuestions] = useState({});
  const t = i18n.t;
  
  useEffect(() => {
    const checkGuestStatus = async () => {
      const guestStatus = await AsyncStorage.getItem('isGuest');
      setIsGuest(guestStatus === 'true'); // Update the state based on the guest status
    };
    checkGuestStatus();
    // ... other code
  }, []);
  useEffect(() => {
    fetchPosts();
    setLanguageFromAsyncStorage();
  }, [isRefresh])
  const setLanguageFromAsyncStorage = async ()=>
  {
      const getSelectedLanguage = await AsyncStorage.getItem('language');
      if(getSelectedLanguage===null)
      {setLanguage('en');}
      else
      {setLanguage(getSelectedLanguage);}
  }

  const fetchPosts = async() => {

    setIsLoading(true);
    const token = await  AsyncStorage.getItem('token');
    const userId = await  AsyncStorage.getItem('userId');

    try {
      const response = await axios.get(`${baseUrl}/api/patient/my-posts/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(response.data);
      setIsRefresh(true);

  } catch (error) {

      console.log(error.message);
      console.error('Error Getting details:', error);
    }    

   setIsLoading(false);
   
  };
  useEffect(() => {
    fetchQuestions();  // Example: Ensure fetchQuestions sets all necessary properties
}, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');
    const userId = await  AsyncStorage.getItem('userId');

    try {
        const response = await axios.get(`${baseUrl}/api/patient/my-questions/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && Array.isArray(response.data)) {
            const questions = response.data.map(question => ({
                ...question,
                id: question.id || Date.now() + Math.random()  // Ensuring all questions have an id
            })).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
            setQuestions(questions);
        }
        setIsRefresh(false);
    } catch (error) {
        console.error('Failed to fetch questions:', error);
        setIsRefresh(false);
    } finally {
        setIsLoading(false);
    }
};

  const handleAddPostPress = async () => {
    if (isGuest) {
      Alert.alert(
        "Restricted Access",
        "Guest users cannot add posts. Please log in or register to contribute.",
        [
          { text: "OK", onPress: () => navigation.navigate('ProfileScreen') }
        ],
      );
    } else {
      navigation.navigate('CreatePostScreen', { onPostAdded: fetchPosts });
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [isRefresh]); 

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
      <PostCardComponent item={item} setIsRefresh={setIsRefresh} setRefresh={isRefresh} selectedLanguage={language} isMyPost={true} />
    );
  }

  const renderItemQnA = ({ item }) => {
    return(
      <QnAComponent item={item} setIsRefresh={setIsRefresh} setRefresh={isRefresh} />
    );
  }
  

  return (
    <View style={styles.container}>
      <View>
        <Header title="My Posts and Questions" onPressBack={() => navigation.goBack()} />
        </View>
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
        {[t('viewPosts', { lng: language }), t('viewQuestions', { lng: language })].map((segment, index) => (
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
          <TouchableOpacity 
              onPress={handleAddPostPress} 
              style={styles.addButton}
              // disabled={isGuest} // Use the state to disable the button
            >
              <Text style={styles.addButtonText}>{t('addPost', { lng: language })}</Text>
            </TouchableOpacity>
        <View className=" h-5/6">
        <FlatList
          data={post}
          keyExtractor={(item,index) => item.id.toString()}
          renderItem={renderItem}
        />
        </View>
        </View>)}
      
      { !isLoading && !isViewPostsSelected &&(
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('CreateQnAScreen')} style={styles.addButton}>
          <Text style={styles.addButtonText}> + Add Question</Text>
        </TouchableOpacity>
        <View  className=" h-5/6">
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id ? item.id.toString() : 'fallback-' + Date.now().toString()}
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
    paddingBottom: 220,
    
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
    backgroundColor: '#9B8BCA', // Purple indicator
    position: 'absolute',
    top: 0,
    left: 0,
  },
  addButton: {
    backgroundColor: '#9B8BCA',
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
    marginBottom: 10,
  },
});

export default MyPostScreen;










