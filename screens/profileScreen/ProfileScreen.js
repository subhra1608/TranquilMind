import { useState } from 'react';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import InputComponent from '../../Components/InputComponent';

const ProfileScreen = ({ navigation }) => {
  // Dummy user data
  const user = {
    name: 'Subhra Singh',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-a9wdsqFbo6C2AXpAqFhukcppgJgpUy5qPg&usqp=CAU',
    appointments: ['Appointment 1', 'Appointment 2'],
    prescriptions: ['Prescription 1', 'Prescription 2'],
    accountDetails: {
      email: 'subhrasingh@gmail.com',
      phoneNumber: '9123720342',
      gender: 'Female',
      dateOfBirth:'16th August 2000'

      // Add more account details as needed
    },
  };
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  
  const handleLogout = () => {
    
    navigation.navigate('LoginScreen');
  };

  return (
      <ScrollView>
        <KeyboardAvoidingView>
          
        <View style={styles.container}>
      <View style={styles.header}>
      <Image source={{ uri: user.image }} style={styles.image} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text>Email: {user.accountDetails.email}</Text>
        <Text>Phone Number: {user.accountDetails.phoneNumber}</Text>
      </View>
    </View>
      <View classname=" flex-1">
        <View classname=" flex-1 bg-slate-600">
          <TouchableOpacity onPress={()=>navigation.navigate('AppointmentScreen')}>
            
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Appointments</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View>
        <TouchableOpacity onPress={() => setShowAccountDetails(!showAccountDetails)}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Details</Text>
          </View>
        </TouchableOpacity>
        {showAccountDetails && (
          
          <View style={styles.accountDetails}>
            <InputComponent placeholder="Name" value="" onChangeMethod={null} keyboardType='default' />
            <InputComponent placeholder="Email" value="" onChangeMethod={null} keyboardType='email-address' />
            <InputComponent placeholder="Phone Number" value="" onChangeMethod={null} keyboardType='numeric' />
            <InputComponent placeholder="Address" value="" onChangeMethod={null}  keyboardType='default' />
            <InputComponent placeholder="Gender" value="" onChangeMethod={null}  keyboardType='default'  />
            <InputComponent placeholder="Date of Birth" value="" onChangeMethod={null}  keyboardType='default'  />

            {/* Add more account details as needed */}
          </View>
        )}
      </View>

          
          <TouchableOpacity 
          style={styles.logoutButton} onPress={()=>handleLogout()}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
        </KeyboardAvoidingView>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:10,
  },
  logoutButton: {
    backgroundColor: '#DFA0D1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  accountDetails: {
  paddingHorizontal: 5,
  marginBottom: 20,
  fontSize: 20,
  },
  accountDetailsText:{
    marginTop:2,
    fontSize: 18,

  }
});

export default ProfileScreen;
