import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Image, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { baseUrl } from '../../data/baseUrl';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

// import EmailVerificationScreen from '../emailVerificationScreen/EmailVerificationScreen';
const RegistrationScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState(''); // Added state variable for middle name
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); // Added state variable for gender
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading,setIsLoading]=useState(false);
  const [imageUri, setImageUri] = useState(null);

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;// Passwords will contain at least one letter and one number, and be at least 8 characters long
  const nameRegex = /^[a-zA-Z]+$/; // Names should only contain letters
  const mobileRegex = /^[0-9]{10}$/; // Mobile numbers should be 10 digits long
  const ageRegex = /^[0-9]+$/;

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

    
  const handlePasswordChange = (password) => {
    setPassword(password);
    setPasswordMatch(password === confirmPassword);
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    setPasswordMatch(password === confirmPassword);
  };
  
 
  const handleRegistration = async () => {
    let imageBase64 = "";
    if (imageUri) {
      imageBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
    }

      setIsLoading(true);
      const registrationEndpoint = baseUrl+'/api/patient/register';  
      const userDetails = {
        firstName,
        middleName,
        lastName,
        mobileNo,
        age,
        gender,
        email,
        password,
        image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : ""
      };
      
      if (!nameRegex.test(firstName)) {
        Alert.alert("Invalid First Name", "First name should only contain letters.");
        return;
      }
      
      if (!nameRegex.test(lastName)) {
        Alert.alert("Invalid Last Name", "Last name should only contain letters.");
        return;
      }
      
      if (!mobileRegex.test(mobileNo)) {
        Alert.alert("Invalid Mobile Number", "Mobile number should be 10 digits long.");
        return;
      }
      const numericAge = parseInt(age, 10); // Convert age from string to number
      if (!ageRegex.test(age) || numericAge < 1 || numericAge > 120) {
        Alert.alert("Invalid Age", "Age must be a number between 1 and 120.");
        return;
      }
      if (!emailRegex.test(email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return;
      }
      if (!passwordRegex.test(password)) {
        Alert.alert(
          "Invalid Password",
          "Password must be at least 6 characters long and include at least one letter and one number."
        );
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Password Mismatch", "The passwords do not match.");
        return;
      }
      try {
        
        const response = await axios.post(registrationEndpoint, userDetails,{
          headers:{
            "Content-Type":'application/json'
          }
        });
    
        if (response.status === 200 || response.status === 201) {
          console.log(response.data.accessToken);
          const accessToken = response.data.accessToken;
      
        if (accessToken) {
          await AsyncStorage.setItem('userToken', accessToken); // Save the accessToken in AsyncStorage
          navigation.navigate('LoginScreen');
        } else {
          console.error('No access token received');
          // Handle case where no token is received
        }
        
      }
      else {
          
          console.error('Registration failed:', response.data.message);
          
        }
      } 
      catch (error) {
        // Check if the error response has a status code
        if (error.response) {
          console.log(error.response);
          // Check if the status code is 409 Conflict, which indicates a duplicate email
          if (error.response.status === 409) {
            Alert.alert("Registration Failed", "This email is already registered. Please use a different email.");
          } else {
            // Handle other possible status codes (400, 500, etc.)
            Alert.alert("Registration Error", error.response.data.message || "An unexpected error occurred. Please try again later.");
          }
        } else {
          // Handle errors that don't have a response (network errors, timeouts, etc.)
          Alert.alert("Network Error", "Please check your internet connection and try again.");
        }
      }
      setIsLoading(false);
  };   

 

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonText} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inputContainer}>
       <TouchableOpacity onPress={handleSelectImage} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>Add Profile Picture</Text>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        )}
      </TouchableOpacity>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
          style={styles.input}
        />
        <TextInput
          value={middleName}
          onChangeText={setMiddleName}
          placeholder="Enter Middle Name" 
          style={styles.input}
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
          style={styles.input}
        />
        <TextInput
          value={mobileNo}
          onChangeText={setMobileNumber}
          placeholder="Enter Mobile Number"
          style={styles.input}
        />
        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="Enter Age"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          style={styles.input}
        />
       <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" /> 
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
          <Picker.Item label="Others" value="OTHERS" />
        </Picker>
        <TextInput
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter Password"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
        />
        {!passwordMatch && (
        <Text style={styles.passwordMismatchText}>Passwords do not match</Text>
      )}
      </View>
      <TouchableOpacity style={styles.signupButton} onPress={handleRegistration}>
        {isLoading && (<ActivityIndicator size={30} color='white'/>)}
        {!isLoading && (<Text style={styles.signupButtonText}>Sign Up</Text>) }
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 30,
//     backgroundColor: '#f0f0f0',
//     // justifyContent: 'space-between', 

//   },
//   backButton: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     padding: 10, 
//     borderRadius: 5, 
//   },
//   backButtonText: {
//     fontSize: 20,
//     bottom: -1,
//     right: 10,
//     color: '#7f3db5', // Blue color
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#7f3db5'
//   },
//   inputContainer: {
//     marginBottom: 10,
//   },
//   input: {
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     fontSize: 16,
//   },
//   signupButton: {
//     backgroundColor: '#9B8BCA', // Purple color
//     padding: 15,
//     borderRadius: 30, // Slightly rounded corners
//     alignItems: 'center',
//   },
//   signupButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   passwordMismatchText: {
//     color: 'red',
//     fontSize: 14,
//     marginLeft: 8,
//   },
//   imagePickerButton: {
//     alignSelf: 'center', // Center the button
//     marginBottom: 20, // Space below the button
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50, // Circular image
//     marginBottom: 20,
//   },
//   imagePickerText: {
//     fontSize: 16,
//     color: '#5e2d79', // Purple color
//   }
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#f7f7f7', 
  },
  backButton: {
    marginTop: 40, // Adjusts for status bar height on iOS
    marginLeft: 10,
    padding: 10, 
    borderRadius: 50, // Circular for a modern look
    width: 50,
    height: 50,
    justifyContent: 'center', // Centers the back icon
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // A light grey that stands out slightly from white
  },
  backButtonText: {
    color: '#7f3db5', // Purple color for the icon
    fontSize: 18,
    fontWeight: '500'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold', // Less bold than 'bold' for a lighter appearance
    marginTop: 10, // Ensures spacing from the top
    marginBottom: 40, // More space before the form starts
    textAlign: 'center',
    color: '#7f3db5', // A dark color for the title that isn't pure black
  },
  inputContainer: {
    marginTop: 30,
    marginBottom: 20, // Space after the form
  },
  input: {
    padding: 15,
    marginBottom: 15, // Increased space between inputs
    backgroundColor: '#fff',
    borderRadius: 10, // More rounded corners for inputs
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // subtle elevation for Android
  },
  signupButton: {
    backgroundColor: '#9B8BCA',
    padding: 18,
    borderRadius: 25, // More pronounced rounded corners for the button
    marginTop: 30, // Space before the signup button
    marginBottom: 40, // Space after the signup button
    alignItems: 'center',
    shadowColor: '#5e2d79',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  passwordMismatchText: {
    color: '#ff3b30', // A standard error color
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
    textAlign: 'center', // Centered text
  },
  imagePickerButton: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Perfect circle
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light grey border
    // Ensure the profile image is behind the text
    zIndex: 0,
  },
  imagePickerText: {
    fontSize: 18,
    color: '#5e2d79',
    fontWeight: '400',
    position: 'relative', // Changed to relative
    marginTop: -60, // Adjust as needed
    backgroundColor: '#f7f7f7', // Same as the page background for camouflage
    padding: 5, // To ensure the text has a background on all sides
  },
  scrollContainer: {
    paddingBottom: 30, // Space at the bottom inside the scroll view
  }
});
export default RegistrationScreen;