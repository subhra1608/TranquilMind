import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonComponent = ({ color, title, onPress, selected,isAlreadySelected }) => {
  return (
    <TouchableOpacity
    disabled={isAlreadySelected}
      style={[styles.button, { backgroundColor: isAlreadySelected ? 'gray' : selected ? 'orange':color }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: selected ? 'white' : 'black' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin:8,
    width:120,
    height:40    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonComponent;
