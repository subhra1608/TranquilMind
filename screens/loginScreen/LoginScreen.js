// LoginScreen.js

import React, { useState,useEffect } from 'react';
import { View, Text, TextInput,ImageBackground, Button, StyleSheet,Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import InputComponent from '../../Components/InputComponent';
import { baseUrl } from '../../data/baseUrl';
import i18n from '../../i18';
import {Picker} from '@react-native-picker/picker';

const LoginScreen = ({ navigation }) => {

  const t = i18n.t;
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState('examplepassword');
  const [user,setUser]= useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en"); 
  const [isLoading,setIsLoading]=useState(false);
  const [language,setLanguage]=useState("");

  useEffect(() => {
    setLanguageFromAsyncStorage();
  }, [selectedLanguage])
  
  const setLanguageFromAsyncStorage = async ()=>
  {
      const getSelectedLanguage = await AsyncStorage.getItem('language');
      if(getSelectedLanguage===null)
      {setSelectedLanguage('en');}
      else
      {setLanguage(getSelectedLanguage);}
      console.log("selectedLanguage",selectedLanguage)
  }

  const handleLogin = async() => {
    
    setIsLoading(true);
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
      await AsyncStorage.setItem('userId',String(userId));      // setUser(response.data);
      
      navigation.navigate('LandingScreen');

    } catch (error) {
      
      console.error('Invalid Credentials:', error.message);
      Alert.alert('Error',"Credentials are invalid");
    }

    //navigation.navigate('LandingScreen');
    setIsLoading(false);
   
  };

  return (
    
    <View className="mt-5 flex flex-1">
      <View className="justify-start items-center mt-5">
      <View className="absolute right-1">
      <Picker
          selectedValue={language}
          style={styles.languagePicker}
          onValueChange={(itemValue, itemIndex) =>
            {
              setSelectedLanguage(itemValue);
              AsyncStorage.setItem('language',itemValue);
            }
            
          }>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="हिन्दी" value="hi" />
          <Picker.Item label="ಕನ್ನಡ" value="ka" />
        </Picker>
      </View>

        <ImageBackground
        source={require('../../assets/images/logo.jpg')}
        className="rounded-full overflow-hidden h-60 w-60 mt-24"
        />
      </View>
      <View className="justify-start items-center">
        <Text className="text-xl mt-6 font-semibold ">{t('welcomeMessage', { lng: language })}</Text>
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
      {isLoading && <ActivityIndicator size={(30)}/>}
      {!isLoading && (<View className="flex flex-row justify-center">
      <TouchableOpacity className="  justify-center items-center rounded-xl mt-3 bg-[#9B8BCA] h-10 w-4/6 " onPress={handleLogin} ><Text className="text-lg text-neutral-50">{t('loginButton', { lng: language })}</Text></TouchableOpacity>
      </View>)}
      <View className="flex flex-row justify-center">
      <TouchableOpacity className="  justify-center items-center rounded-xl mt-3 bg-[#9B8BCA] h-10 w-4/6 " onPress={()=>{navigation.navigate('RegistrationScreen')}}><Text className="text-lg text-neutral-50">{t('registerButton', { lng: language })}</Text></TouchableOpacity>
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
  languagePicker: {
    height: 50,
    width: 150,
    color: 'black',
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
