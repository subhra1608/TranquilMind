import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import EmailVerificationScreen from '../emailVerificationScreen/EmailVerificationScreen';
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

  const handleRegistration = async () => {
      
      const registrationEndpoint = 'https://af6a-119-161-98-68.ngrok-free.app/api/patient/register';  
      const userDetails = {
        firstName,
        middleName,
        lastName,
        mobileNo,
        age,
        gender,
        email,
        password,
        // confirmPassword,
      };
      try {
        
        const response = await axios.post(registrationEndpoint, userDetails);
    
        if (response.status === 200 || response.status === 201) {
          console.log(response.data.accessToken);
          const accessToken = response.data.accessToken;
      
        if (accessToken) {
          await AsyncStorage.setItem('userToken', accessToken); // Save the accessToken in AsyncStorage
          navigation.navigate('LandingScreen');
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
          console.log(error.response.status);
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
  };      
  const handleSecureStoreError = async (action, key) => {
    try {
      if (action === 'set') {
        await SecureStore.setItemAsync(key, value);
      } else if (action === 'get') {
        return await SecureStore.getItemAsync(key);
      } else if (action === 'delete') {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error('Error handling secure store operation:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonText} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inputContainer}>
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
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.signupButton} onPress={handleRegistration}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#f0f0f0',
    // justifyContent: 'space-between', 

  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10, 
    borderRadius: 5, 
  },
  backButtonText: {
    fontSize: 20,
    bottom: -1,
    right: 10,
    color: '#7f3db5', // Blue color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#7f3db5'
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#7f3db5', // Purple color
    padding: 15,
    borderRadius: 30, // Slightly rounded corners
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RegistrationScreen;