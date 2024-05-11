import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../data/baseUrl';
import Header from '../../Components/HeaderComponent';

const CreateQnAScreen = ({ navigation }) => {
  const [postContent, setPostContent] = useState('');

  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };
  

    const handleSubmit = async () => {
   if (!postContent) {
    alert('Please fill in all fields.');
    return;
  }
  // Get user ID from AsyncStorage
  const userId = await AsyncStorage.getItem('userId');
  if (!userId) {
    alert('No user ID found. Please login again.');
    return;
  }
  // Construct the request body
  let requestBody = {
      question: postContent,
      questionBy: parseInt(userId, 10),
      uploadedAt: getCurrentTimestamp()
  };

  console.log(requestBody);

  try {
    const response = await fetch(`${baseUrl}/api/question/add-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers like Authorization if needed
      },
      body: JSON.stringify(requestBody),
    });
  
    // console.log(response.status);
    if (response.ok) {
        const responseData = await response.json();
        alert('Your question has been submitted successfully!');
        console.log('Response data:', responseData);
        navigation.goBack();
      } else {
        const errorData = await response.text(); // or response.json() if the server responds with JSON format
        console.log('Response status:', response.status);
        console.log('Error Response data:', errorData);
        alert(`Failed to submit your question. Status: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('An error occurred. Please try again.');
        
    }

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Header title="Ask Questions" onPressBack={() => navigation.goBack()} />
        </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.headerText}>Unlocking Peace of Mind : Your Questions Matter</Text>
        <View style={styles.inputBox}>
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ask the Questions you are holding inside."
            value={postContent}
            onChangeText={setPostContent}
            multiline={true}
          />
                
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Question</Text>
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
 });

export default CreateQnAScreen;