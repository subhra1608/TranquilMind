// LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput,ImageBackground, Button, StyleSheet,Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import InputComponent from '../../Components/InputComponent';
import { baseUrl } from '../../data/baseUrl';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
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
      const response =  await axios.post(`${baseUrl}/api/user/authenticate`,cred,{headers});
      console.log(response.data);  
      const userId = response.data.userId;
      await AsyncStorage.setItem('token',response.data.accessToken);      // setUser(response.data);
      console.log(response.data.accessToken);
      await AsyncStorage.setItem('userId',String(userId));      // setUser(response.data);

      //console.log(token)
      navigation.navigate('LandingScreen');

    } catch (error) {
      
      console.error('Invalid Credentials:', error.message);
      Alert.alert('Error', 'Invalid Credentials');
    }

    navigation.navigate('LandingScreen');
    
   
  };

  return (
    
    <View className="flex flex-1">
      <View className="justify-start items-center">
        <ImageBackground
        source={require('../../assets/images/logo.jpg')} // Adjust the path to your background image
        // style={styles.backgroundImage}
        className="rounded-full overflow-hidden h-60 w-60 mt-24"
        />
      </View>
      <View className="justify-start items-center">
        <Text className="text-xl mt-6 font-semibold ">Welcome Back To TranquilMind!</Text>
      </View>
      
      <View className="w-11/12 justify-center align-middle ml-4 mt-2">
      <InputComponent  
        placeholder="example@email.com"
        value={email}
        onChangeMethod={setEmail}
        keyboardType="email-address"
        secureTextEntry={false}
      />
  
      <InputComponent 
      className="mt-4"
      placeholder="@password"
      value={password}
      onChangeMethod={setPassword}
      secureTextEntry={true}
      
      />
      
      </View>
      <View className="flex flex-row justify-center">
      <TouchableOpacity className="  justify-center items-center rounded-xl mt-3 bg-[#9B8BCA] h-10 w-4/6 " onPress={handleLogin} ><Text className="text-lg text-neutral-50">Login</Text></TouchableOpacity>
      </View>
      <View className="flex flex-row justify-center">
      <TouchableOpacity className="  justify-center items-center rounded-xl mt-3 bg-[#9B8BCA] h-10 w-4/6 " onPress={()=>{navigation.navigate('RegistrationScreen')}}><Text className="text-lg text-neutral-50">Register Now</Text></TouchableOpacity>
      </View>
      {/* <View className="flex flex-row justify-end mr-4">
      <TouchableOpacity onPress={()=>{navigation.navigate('RegistrationScreen')}}><Text className="text-lg">Register Now</Text></TouchableOpacity>
      </View> */}
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
    marginTop:20,
    height:340,
    width:360,
  },
 
  pos:{
    position: "relative",
    top:-100,
  },
  
});

export default LoginScreen;
