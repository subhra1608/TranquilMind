import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Header from '../../Components/HeaderComponent';


// Sample appointment data
const appointments = [
  { id: 1, date: '2024-03-10', doctor: 'Dr. Smith' ,problem:' cannot workout'},
  { id: 2, date: '2024-03-15', doctor: 'Dr. Johnson',problem:'cannot Dance' },
  { id: 3, date: '2024-03-20', doctor: 'Dr. Lee',problem:'cannot eat' },
];

const AppointmentScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = React.useState('past');

  // Filter appointments based on past or upcoming
  const filteredAppointments = selectedTab === 'past'
    ? appointments.filter(appointment => new Date(appointment.date) < new Date())
    : appointments.filter(appointment => new Date(appointment.date) >= new Date());

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
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
                <Text style={styles.appointmentText}>Date: {item.date}</Text>
                <Text style={styles.appointmentText}>Doctor: {item.doctor}</Text>
                <Text style={styles.appointmentText}>Concern: {item.problem}</Text>
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
    backgroundColor: '#DFA0D1',
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
