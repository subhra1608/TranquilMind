import { View, Text,StyleSheet,Image,Modal } from 'react-native'
import React, { useState } from 'react'

const DoctorCard = ({doctorData}) => {
    // console.log(doctorData);
    
  return (
    
      <View style={styles.cardContainer}>
        <Image source={{ uri: "https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg" }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{doctorData.firstName} {doctorData.middleName} {doctorData.lastName}</Text>
          <Text>{`Experience: ${doctorData.experience}`}</Text>
          <Text>{`Consultation Fee: Rs.${doctorData.consultationFee}`}</Text>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      margin:10,
      borderRadius:10,
      elevation: 2,
      width:'90%',
      alignItems: 'center',
      padding: 5,
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