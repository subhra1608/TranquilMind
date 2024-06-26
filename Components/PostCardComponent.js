import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import HorizontalLine from './HorizontalLine';
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../data/baseUrl';
import translate from 'translate-google-api';


const PostCardComponent = ({ item,setIsRefresh,setRefresh, navigation,selectedLanguage,isMyPost}) => {
  

  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [userId,setUserId] =useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [name,setName]=useState("");

  useEffect(() => {
    // Check if the user is a guest
    const checkIfGuest = async () => {
      await convertSelectedLanguageName(item.name)
      await convertSelectedLanguage(item.title);
      await convertSelectedLanguageDescription(item.description);
      
      const guestStatus = await AsyncStorage.getItem('isGuest');
      setIsGuest(guestStatus === 'true');
    };
    // convertSelectedLanguage("this is me");
    checkIfGuest();
    setUserFromAsyncStorage();
  }, [isLoading]);



  const convertSelectedLanguage = async(text)=>{
    // console.log(text);
    let result=text;
      if(selectedLanguage==='hi')
      {
        result = await translate(text, {
          from:"en",
          to: "hi",
        });
        setTitle(result[0]);    
        return;
      }
      setTitle(text);
      // console.log(result[0])
  }

  const convertSelectedLanguageDescription = async(text)=>{
    // console.log(text);
    let result=text;
      if(selectedLanguage==='hi')
      {
        result = await translate(text, {
          from:"en",
          to: "hi",
        });
        setDescription(result[0]);
        return;
      }
      setDescription(text);
      // console.log(result[0])
          
  }

  const convertSelectedLanguageName = async(text)=>{
    // console.log(text);
    let result=text;
      if(selectedLanguage==='hi')
      {
        result = await translate(text, {
          from:"en",
          to: "hi",
        });
        setName(result[0]);
      }
      // console.log(result[0])
      setName(text);
      return;
    }

  const handleFlag = async (postId, flag) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(`${baseUrl}/api/post/flag/${postId}`, flag, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      flagged=response.data.flagged;
      // Handle successful flagging
      console.log(response.data);
      setIsRefresh(!setRefresh)
    } catch (error) {
      // Handle error in flagging
      console.error('Error flagging post:', error.response || error);
    }
  };

  const handleLike = () => {
    const postId = item.id; // Assuming `item` is the post object that has an id
    const shouldFlag = true; // or some condition to determine if you should flag or unflag
    handleFlag(postId, shouldFlag);
    console.log('Flagged!');
  };

  const isFlaggedByUser = (flagged) => {
    return flagged>0; // Assuming `flagged` is the number of times the post has been flagged
  };


  const setUserFromAsyncStorage = async ()=>
  {
      const getUserId = await AsyncStorage.getItem('userId');
      setUserId(getUserId)
  }

  
  const handleSubmitComment = async() => {

    setIsLoading(true);
    if (isGuest) {
      // Alert the guest user and navigate to the login screen
      Alert.alert(
        "Restricted Action",
        "You must be logged in to post comments. Would you like to log in or register?",
        [
          { text: "Yes", onPress: () => navigation.navigate('ProfileScreen') },
          { text: "No" }
        ]
      );
    } else {
    const token = await  AsyncStorage.getItem('token');
    if(commentInput.length<5)
    {
      return Alert.alert("Please Enter a valid comment","The length of comment must be greater than 5.",[
        {
          text: 'OK',
          onPress: () => {null}
        }
      ]);
    }
    payload ={
      description:commentInput,
      uploadedAt:Date.now(),
      postId :item.id,
      commentById:userId,
      name:item.name
    }

    try {
      const response = await axios.post(`${baseUrl}/api/post/add-comment`,payload,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert("Comment Added Successfully","Your Comment has been added Succesfully",[
        {
        text: 'OK',
        onPress: () => {setIsRefresh(!setRefresh);}
      }])
      

;    } catch (error) {
      console.log(error.message);
      console.error('Error Getting details:', error);
    }    
   setIsLoading(false);
  }
  };

  function formatDate(timestamp) {
    const uploadedDate = new Date(timestamp);
    const currentDate = new Date();
  
    // Calculate the difference in milliseconds
    const difference = currentDate - uploadedDate;
    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInDay = millisecondsInHour * 24;
  
    // Check if the difference is less than 24 hours
    if (difference < millisecondsInDay) {
      const hoursAgo = Math.floor(difference / millisecondsInHour);
      return `${hoursAgo} hours ago`;
    } else {
      // Format the date in "day, month date, year" format
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return uploadedDate.toLocaleDateString('en-US', options);
    }
  }
  

  const onDeletePostHandler = async() => {

    setIsLoading(true);
    const token = await  AsyncStorage.getItem('token');
    try {
      console.log(`${baseUrl}/api/post/delete/${item.id}`)
      const response = await axios.delete(`${baseUrl}/api/post/delete/${item.id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      // setCourseMaterial(response.data.tasksByWeek);

;    } catch (error) {

      console.log(error.message);
      console.error('Error Getting details:', error);
    }    
   setIsLoading(false);
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={30} label={item.name.charAt(0).toUpperCase()}/> 
        <Text style={styles.username}>{name}</Text>

        <Text style={styles.postedOn}>{formatDate(item.uploadedAt)}</Text>
      </View>
      {
        item.image && <Image source={{ uri: item.image}} style={styles.image} resizeMode="contain" />
      }
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View className="flex-row justify-between">
        <View style={styles.interactions}>
          {
            (!(item.isApproved))&&(

            // <TouchableOpacity style={styles.interaction} onPress={() => handleLike(item.id)}>
            //   <Text style={styles.interactionText}>{item.flagged}</Text>

            //   <Image source={{uri:'https://png.pngtree.com/png-vector/20210228/ourmid/pngtree-fluttering-red-flag-png-image_2986748.jpg'}} style={styles.icon} />
            // </TouchableOpacity>

            <TouchableOpacity style={styles.interaction} onPress={() => handleLike(item.id)}>
              <Ionicons
                name={isFlaggedByUser(item.flagged) ? 'flag' : 'flag-outline'}
                size={24}
                color={isFlaggedByUser(item.flagged) ? '#FF0000' : '#000000'} // Red if flagged, black otherwise
              />
              {isFlaggedByUser(item.flagged) && <Text style={styles.interactionText}>Flagged</Text>}
            </TouchableOpacity>
            )
          }
          <TouchableOpacity
            style={styles.interaction}
            onPress={() => setShowComments(!showComments)}
          >
            <Ionicons size={15} name='chatbox-outline'></Ionicons><Text className=" ml-1" style={styles.interactionText}>{showComments ? 'Hide Comments' : 'View Comments'}</Text>
          </TouchableOpacity>
        </View>
        <View>
            {isMyPost === true && (
              <TouchableOpacity onPress={onDeletePostHandler}>
                <Ionicons name="trash" size={25} color="black" />
              </TouchableOpacity>
            )}
        </View>
      </View>
      {showComments &&  (
        <View style={styles.comments}>
          { item.comments.length>0 && item.comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer} className="mt-2">
              <View className="flex-row justify-between">
                <View className=" flex-row justify-start">
                  <View>
                    <Avatar.Text size={30} label={comment.name.charAt(0).toUpperCase()} />                
                  </View>
                  <View className="mx-2 mt-1">
                    <Text style={styles.commentUsername}>{comment.name}</Text>
                  </View>
                </View>
                {
                  (comment.commentById == userId) && 
                  (<View>  
                    <TouchableOpacity>
                      <Ionicons name="trash" size={18}/>
                    </TouchableOpacity>
                  </View>)
                }
              </View>
              <HorizontalLine borderWidth={1}/>

              <View  style={styles.commentContent} className="ml-3 my-1">
                <Text style={styles.commentText}>{comment.description}</Text>
              </View>
            </View>
          ))}

          <View className="flex flex-row justify-between">
            <View >
              <TextInput
               className="border-black rounded-lg pl-4 h-12 border-2 w-72  "
              style={styles.commentInput}
              placeholder="Add a comment..."
              multiline
              value={commentInput}
              onChangeText={setCommentInput}
              editable={!isGuest} // Disable input if user is a guest
              />
            </View>
            
            <View>
            <TouchableOpacity
                onPress={handleSubmitComment}
                disabled={isGuest}
                style={isGuest ? [styles.submitButton, styles.submitButtonDisabled] : styles.submitButton}
              >
                <Text style={{ color: isGuest ? '#8E8E8E' : 'white' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    marginLeft:5,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  postedOn: {
    fontSize: 12,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  interactions: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  interaction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  interactionText: {
    fontSize: 14,
    marginRight: 4,
    marginLeft: 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
  comments: {
    marginTop: 8,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  submitButton: {
    backgroundColor: '#9B8BCA', // A pleasant purple shade for the button
    color: 'white',              // White text color
    paddingVertical: 10,         // Vertical padding for button height
    paddingHorizontal: 20,       // Horizontal padding for button width
    borderRadius: 5,             // Rounded corners
    overflow: 'hidden',          // Prevent any child component from going outside the bounds
    textAlign: 'center',         // Center the text inside the button
    fontSize: 16,                // Reasonable font size for the button text
    fontWeight: '600',           // Medium font weight for a bit of emphasis
    elevation: 2,                // Subtle shadow for an elevated effect on Android
    shadowColor: 'black',        // Shadow color
    shadowOffset: { width: 0, height: 2 }, // X, Y offset for the shadow
    shadowOpacity: 0.25,         // Shadow opacity
    shadowRadius: 3.84,          // Shadow blur radius
    marginTop: 4,               // Margin on top to separate from other components
  },
  submitButtonDisabled: {
    backgroundColor: '#CDCDCD',  // A grayish color to indicate the button is disabled
    color: '#8E8E8E',            // A darker gray for the text
  }
});

export default PostCardComponent;