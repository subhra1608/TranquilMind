import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: 'black', // You can change the color of the line here
    borderBottomWidth: 2,
    marginVertical: 2, // Adjust vertical margin as needed
  },
});

export default HorizontalLine;
