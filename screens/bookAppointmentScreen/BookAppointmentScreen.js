import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { doctorData } from '../../data/doctorData';
import DoctorCard from '../../Components/DoctorCard';
import Header from '../../Components/HeaderComponent';

const BookAppointmentScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return <DoctorCard doctorData={item} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Book Appointments" onPressBack={() => navigation.goBack()} />
      
        <FlatList
          className="bg-white"
          data={doctorData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          //stickyHeaderIndices={[0]} // Make the first item (header) sticky
        />
     
    </View>
  );
};

export default BookAppointmentScreen;
