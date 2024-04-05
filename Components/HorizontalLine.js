import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = ({borderWidth}) => {
  return <View style={{
    borderBottomColor: 'black', // You can change the color of the line here
    borderBottomWidth:borderWidth,
    marginVertical: 2, // Adjust vertical margin as needed
}} />;
};



export default HorizontalLine;
