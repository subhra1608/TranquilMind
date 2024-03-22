import { View, Text,StyleSheet,TouchableOpacity,Image,Modal } from 'react-native'
import React, { useState } from 'react'

const DoctorCard = ({doctorData}) => {
    
    
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={{ uri: doctorData.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{doctorData.name}</Text>
        <Text>{`Experience: ${doctorData.experience}`}</Text>
        <Text>{`Consultation Fee: ${doctorData.consultation_fee}`}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      marginLeft:40,
      borderRadius:10,
      elevation: 2,
      width:'80%',
      alignItems: 'center',
      padding: 10,
      marginTop:10,
      marginBottom:10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    image: {
      width: 85,
      height: 100,
      padding:20,
      borderRadius: 10,
      marginRight: 10,
    },
    infoContainer: {
      flex: 1,
      padding:10,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });
  


export default DoctorCard