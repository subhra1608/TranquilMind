import React, { useState ,useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import Header from '../../Components/HeaderComponent';
import { baseUrl } from '../../data/baseUrl';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import  {signInAnonymouslyIfNeeded} from '../../firebase-config';



// Sample appointment data
// const appointments = [
//   { id: 1, date: '2024-03-10', doctor: 'Dr. Smith' ,problem:' cannot workout'},
//   { id: 2, date: '2024-03-15', doctor: 'Dr. Johnson',problem:'cannot Dance' },
//   { id: 3, date: '2024-03-20', doctor: 'Dr. Lee',problem:'cannot eat' },
// ];

const AppointmentScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = React.useState('past');
  const [appointments,setAppointments]=useState([]);
  useEffect(() => {
    
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const token = await  AsyncStorage.getItem('token');

      const userID = await  AsyncStorage.getItem('userId');

      const response = await axios.get(`${baseUrl}/api/appointment/patient-appointments/${userID}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
          }
        });
        console.log(response.data);

        if (response.data && response.data.length > 0) {
          // Fetch each doctor's full name from AsyncStorage
          const appointmentsWithDoctors = await Promise.all(response.data.map(async (appointment) => {
            const doctorFullName = await AsyncStorage.getItem(`doctorFullName${appointment.doctorId}`);
            return { ...appointment, doctorFullName: doctorFullName || 'Doctor Name Unavailable' };
          }));
  
          setAppointments(appointmentsWithDoctors);
        }
    } catch (error) {
      console.log(error.message);
      console.error('Error fetching Appointment Details:', error);
    }
  };


  // Filter appointments based on past or upcoming
  const filteredAppointments = selectedTab === 'past'
    ? appointments.filter(appointment => new Date(appointment.date) < new Date())
    : appointments.filter(appointment => new Date(appointment.date) >= new Date());

    const handleChatPress = async () => {
      try {
        await signInAnonymouslyIfNeeded();
        navigation.navigate('ChatMessageScreen');
      } catch (error) {
        console.error('Error signing in anonymously:', error);
      }
    };

  return (
    
      <View style={styles.container}>
        <Header title="My Appointments" onPressBack={() => navigation.goBack()}></Header>
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'past' && styles.selectedTab]}
                onPress={() => setSelectedTab('past')}>
                <Text style={styles.tabText}>Past Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'upcoming' && styles.selectedTab]}
                onPress={() => setSelectedTab('upcoming')}>
                <Text style={styles.tabText}>Upcoming Appointments</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            data={filteredAppointments}
            keyExtractor={item => item.appointmentId.toString()}
            renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
                <Text style={styles.appointmentText}>Date: {item.date}</Text>
                <Text style={styles.appointmentText}>Doctor: {item.doctorFullName}</Text>
                <Button
                title="Chat"
                onPress={() => handleChatPress()}
            />
            </View>
            )}
        />
        </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    //backgroundColor:'white',
   
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor:'white'
  },
  selectedTab: {
    backgroundColor: '#9B8BCA',
    color:'white',
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  appointmentItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  appointmentText: {
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default AppointmentScreen;

