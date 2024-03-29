import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegisterationScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Implement your sign-up logic
    console.log('Sign Up Pressed');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      {/* Repeat for other inputs */}
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Select your Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Others" value="others" />
      </Picker>
      {/* Repeat for password and confirm password */}
      <Button title="Sign Up" onPress={handleSignUp} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  // Add styles for other elements
});

export default RegisterationScreen;