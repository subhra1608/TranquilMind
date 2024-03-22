import { View, Text } from 'react-native'
import React from 'react'
import {  TextInput, StyleSheet } from 'react-native';

const InputComponent = ({placeholder,value,onChangeMethod,keyboardType,secureTextEntry,style1}) => {
  return (
    <TextInput
        style={[style1,styles.input]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeMethod}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        cursorColor='black'
      />
  )
}

export default InputComponent

const styles = StyleSheet.create({
        
    input: {
      width: '100%',
      height: 50,
      fontSize:18,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 10,
      textDecorationColor:'green',
      color:'black',
      marginBottom: 10,
      paddingHorizontal: 10,
    },
  });