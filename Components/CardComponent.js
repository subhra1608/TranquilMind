import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import translate from 'translate-google-api';

const Card = ({ id,title, description, imageSource,isEnrolled }) => {
  isEnrolled=true;

  const [stitle,setTitle]=useState("");
  const [language,setLanguage]=useState("hi");

  useEffect(() => {
      setLanguageFromAsyncStorage()
      convertSelectedLanguageTitle(title);
  }, [])
  
  const setLanguageFromAsyncStorage = async ()=>
    {
        const getSelectedLanguage = await AsyncStorage.getItem('language');
        if(getSelectedLanguage===null)
        {setLanguage('en');}
        else
        {setLanguage(getSelectedLanguage);}
    }

  const convertSelectedLanguageTitle = async(text)=>{
    // console.log(text);
    let result=text;
      if(language==='hi')
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


  
  return (
    <View style={styles.card}>
        <Image source={{
          uri: imageSource,
        }} style={styles.image} />
        <View style={styles.textContainer}>
        <Text style={styles.title}>{stitle}</Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    margin:10,
    marginLeft:15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height:230,
    width:175,
    shadowOpacity: 2,
    shadowRadius: 3.84,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign:'center',
    justifyContent:'center'
  },
  description: {
    fontSize: 16,
    textAlign:'center',
    marginLeft:15,
    color: '#666',
  },
});

export default Card;
