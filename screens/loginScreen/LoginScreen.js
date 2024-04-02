// LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput,ImageBackground, Button, StyleSheet,Alert , TouchableOpacity} from 'react-native';
import axios from 'axios';
import InputComponent from '../../Components/InputComponent';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser]= useState({});

  const handleLogin = async() => {

    const cred = {
      "email":email,
      "password":password
    }
    const headers = {
      'Content-Type': 'application/json',
    };

    console.log(email,password);

    try {
      const response =  await axios.post(`https://673a-106-51-164-14.ngrok-free.app/api/user/authenticate`,cred,{headers});
      console.log(response.data);  
      setUser(response.data);
      navigation.navigate('LandingScreen');

    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    }

    navigation.navigate('LandingScreen');
    
    // if (1) {
    //   Alert.alert('Invalid Login', 'Please enter valid email and password.');
    // }
  };

  return (
    
    <View style={styles.container}>
      <ImageBackground
      source={require('../../assets/images/yoga.jpg')} // Adjust the path to your background image
      style={styles.backgroundImage}
      />
      <Text style={styles.title}>Login</Text>
      
      <InputComponent  className="mt-4"
      placeholder="example@email.com"
      value={email}
      onChangeMethod={setEmail}
      keyboardType="email-address"
      secureTextEntry={false}
      style1={{ position: "relative",
      top:-100 }}
      />
  
      <InputComponent 
      className="mt-4"
      placeholder="@password"
      value={password}
      onChangeMethod={setPassword}
      secureTextEntry={true}
      style1={{ position: "relative",
      top:-100 }}
      />
      
      <Button title="Login" style={styles.btn} onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent:'center',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    position: "relative",
    top:-100,
    height:340,
    width:360,
    resizeMode: "cover",
  },
  title: {
    position: "relative",
    top:-100,
    fontSize: 24,
    marginBottom: 20,
  },
  pos:{
    position: "relative",
    top:-100,
  },
  btn: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#05445E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: 'blue', // You can adjust the color
    marginTop: 15,
    textDecorationLine: 'underline',

  }
});

export default LoginScreen;
