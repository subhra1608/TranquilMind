import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../data/baseUrl';
import Header from '../../Components/HeaderComponent';


const CreatePostScreen = ({ route, navigation }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [imageUri, setImageUri] = useState(null);


  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };
  

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!pickerResult.cancelled && pickerResult.assets) {
      setImageUri(pickerResult.assets[0].uri); // Access the uri from the assets array
    } else {
      setImageUri(null);
    }
  };


  const handleSubmit = async () => {
    // Check if the title, content, or imageUri is not empty
  if (!postTitle || !postContent) {
    alert('Please fill in all fields.');
    return;
  }
  // Get user ID from AsyncStorage
  const userId = await AsyncStorage.getItem('userId');
  if (!userId) {
    alert('No user ID found. Please login again.');
    return;
  }
  let imageBase64 = "";
    if (imageUri) {
      imageBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
    }
  // Construct the request body
  let requestBody = {
    title: postTitle,
      description: postContent,
      postedBy: parseInt(userId, 10),
      uploadedAt: getCurrentTimestamp(),
      image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : "",
      flagged: 0,
  };

  try {
    const response = await fetch(`${baseUrl}/api/post/add-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers like Authorization if needed
      },
      body: JSON.stringify(requestBody),
    });
    
    const responseData = await response.json();

    if (response.ok) {
      alert('Post submitted successfully!');
      if (route.params?.onPostAdded) {
        route.params.onPostAdded(); // Call the refresh function passed via params
      }
      console.log('Response data:', responseData);
      navigation.goBack();
    } else {
      alert('Failed to submit post. Please try again.');
      console.log('Response error:', responseData);
    }
  } catch (error) {
    console.error('Submit post error:', error);
    alert('An error occurred. Please try again.');
  }

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Header title="Create Post" onPressBack={() => navigation.goBack()} />
        </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.headerText}>Share Your Thoughts And Inspire The Community</Text>
        <View style={styles.inputBox}>
          
          
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={postTitle}
            onChangeText={setPostTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="What's on your mind?"
            value={postContent}
            onChangeText={setPostContent}
            multiline={true}
          />
          <TouchableOpacity onPress={handleSelectImage} style={styles.imageSelectButton}>
            <Text style={styles.imageSelectButtonText}>+ Add Image</Text>
          </TouchableOpacity>
          {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>No image selected</Text>
          </View>
        )}
       
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Maintain the light, neutral background for a clean look
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === "ios" ? 60 : 40, // Adjusted for platform-specific positioning
    left: 20,
    backgroundColor: '#9B8BCA', // A rich purple for visual appeal
    borderRadius: 50, // Fully rounded corners for a modern, button-like appearance
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#7f3db5', // Soft shadow for depth, matching the button color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // Android shadow
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold', // Bold text to make it stand out
  },
  userName: {
    fontSize: 24, // Larger size for emphasis
    fontWeight: '700', // Increased weight for prominence
    marginBottom: 20, // Increased spacing for visual separation
    color: '#333',
    // fontFamily: 'Avenir-Heavy', // Custom font for a premium feel
  },
  inputBox: {
    width: '100%',
    maxWidth: 600, // Max width for better appearance on larger screens
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15, // Slightly more rounded for a softer look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8, // Slightly more elevation for a prominent "lifted" effect
    marginBottom: 20, // Ensure spacing below the box, especially important if you have more content below
  },
  headerText: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#4A4E69', 
    textAlign: 'center', 
    marginTop: 20, // Add space on the top
    marginBottom: 20, // Add space at the bottom
    paddingHorizontal: 10, // Prevents text from touching the screen edges
    textTransform: 'uppercase', // CAPITALIZE EVERY LETTER for impact
    letterSpacing: 1, // Increase spacing between letters
    lineHeight: 30, // Adjust line height for better readability
    shadowColor: '#000', // Black shadow for a slight depth effect
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.1, // Make the shadow noticeable yet subtle
    shadowRadius: 4, // Soften the shadow
    elevation: 3, // For Android shadow
    backgroundColor: '#FFF6', // Slightly white transparent background to make text pop
    borderRadius: 8, // Round the corners of the background
    overflow: 'hidden', // Ensure the background does not bleed out
    padding: 10, // Padding inside the background
  },
  input: {
    backgroundColor: '#FFFFFF', 
    borderColor: '#DDD', 
    borderWidth: 1, 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 20, 
    fontSize: 16, 
    color: '#333', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  textArea: {
    height: 150, 
    textAlignVertical: 'top', 
  },
  imageSelectButton: {
    backgroundColor: '#D8BFD8', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#7f3db5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageSelectButtonText: {
    color: '#5e2d79', // White text for contrast
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#9B8BCA', // A slightly darker purple to draw attention to the action button
    padding: 15,
    borderRadius: 8,
    shadowColor: '#5e2d79',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  previewImage: {
    width: '100%',
    height: 85,
    resizeMode : "contain",
    marginBottom: 20,
    borderRadius: 8, // Rounded corners for a softer look
    borderWidth: 1, // Define the boundary of the image
    borderColor: '#EEE', // Light border color
  },
  
  imagePreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  imageUploadedText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 8,
  },
  imagePlaceholder: {
    width: '100%', 
    height: 100, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    marginBottom: 20,
  },
  imagePlaceholderText: {
    color: '#999',
  },

});

export default CreatePostScreen;
