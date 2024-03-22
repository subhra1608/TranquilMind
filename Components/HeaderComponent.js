import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'


const Header = ({ title, onPressBack }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'white', paddingHorizontal: 5 }}>
      <TouchableOpacity onPress={onPressBack} style={{ paddingRight: 10 }}>
      <Ionicons name="chevron-forward-outline" size={25} color="black" ></Ionicons>
      </TouchableOpacity>
      <Text style={{ fontSize: 18,  fontWeight: 'bold' }}>{title}</Text>
    </View>
  );
};

export default Header;
