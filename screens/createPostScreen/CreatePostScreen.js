import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreatePostScreen = ({ navigation }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [imageUri, setImageUri] = useState(null);
  // Placeholder for the user's name
  const userName = "Kaushal Pancholi";
  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };
  

  const handleSelectImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
  
    // Launch the image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    // if (!pickerResult.cancelled && pickerResult.assets) {
      
    //   setImageUri(pickerResult.assets[0].uri);
    //   console.log('Selected image URI: ', pickerResult.assets[0].uri);
    // }
    // console.log('Image URI in state: ', imageUri);

    // const base64 = await FileSystem.readAsStringAsync(imageUri, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });

    if (!pickerResult.cancelled && pickerResult.assets) {
      const imageUri = pickerResult.assets[0].uri;
      
      // Compress and resize the image
      const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 800 } }], // Adjust the width to your requirement
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
  
      setImageUri(manipResult.uri);
  
      // Convert the compressed image to base64
      const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      console.log('Compressed image as Base64:', base64);
    }
  };

  const handleSubmit = async () => {
    // Check if the title, content, or imageUri is not empty
  if (!postTitle || !postContent || !imageUri) {
    alert('Please fill in all fields and select an image.');
    return;
  }
  // Get user ID from AsyncStorage
  const userId = await AsyncStorage.getItem('userId');
  if (!userId) {
    alert('No user ID found. Please login again.');
    return;
  }
  // Convert the image to base64
  const base64 = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Construct the request body
  const requestBody = {
    title: postTitle,
    description: postContent,
    postedBy: parseInt(userId, 10), // You might want to get the actual user ID dynamically
    uploadedAt: getCurrentTimestamp(),
    image: `${base64}`, // Prefix with data URI schema
    flagged: 0, // Assuming this is the default value for new posts
  };

  // Replace 'http://backend-api-url/posts' with your actual backend API URL
  try {
    const response = await fetch('http://10.0.2.2:8082/api/post/add-post', {
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Share Your Thoughts And Inspire The Community</Text>
        <View style={styles.inputBox}>
          
          <Text style={styles.userName}>{userName}</Text>
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
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            <Text style={styles.imageUploadedText}>Image Uploaded! </Text>  
          </View>
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
    fontSize: 22, // Large, readable size
    fontWeight: 'bold', // Make it pop
    color: '#4A4E69', // A sophisticated, dark shade of blue
    textAlign: 'center', // Center-align text
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
    backgroundColor: '#FFFFFF', // Lighter background for better contrast and a clean look
    borderColor: '#DDD', // Add a border to define the input area more clearly
    borderWidth: 1, // Border width
    borderRadius: 8, // Soften the edges
    padding: 15, // Comfortable padding
    marginBottom: 20, // Space out elements
    fontSize: 16, // Readable text size
    color: '#333', // Dark text for readability
    shadowColor: '#000', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  textArea: {
    height: 150, // Enough space to write longer posts
    textAlignVertical: 'top', // Start text from the top
  },
  imageSelectButton: {
    backgroundColor: '#D8BFD8', // Use the same purple for consistency but a bit lighter
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
    backgroundColor: '#5e2d79', // A slightly darker purple to draw attention to the action button
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
  // previewImage: {
  //   width: '100%', // or a fixed size like 300
  //   height: 200, // or a fixed size like 200
  //   borderRadius: 8,
  // },
  imageUploadedText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 8,
  },
  imagePlaceholder: {
    width: '100%', // or a fixed size like 300
    height: 100, // or a fixed size like 200
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
