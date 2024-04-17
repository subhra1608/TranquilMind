import { useEffect, useState } from 'react';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import InputComponent from '../../Components/InputComponent';
import { baseUrl } from '../../data/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
const ProfileScreen = ({ navigation }) => {

  useEffect(() => {
    getUserDetails();
  }, []);

  const [age,setAge]=useState(0);
  const [firstName,setFirstName] = useState("");
  const [middleName,setMiddleName]=useState("");
  const [lastName,setLastName]= useState("");
  const [gender,setGender]= useState("");
  const [mobileNo,setMobileNo]=useState(0);
  const [isLoading,setIsLoading]=useState(true);
  const [email,setEmail]=useState("");
  const [responseData, setResponseData]=useState({});
  
  const updateUserDetails = async() => {

    try {
      setIsLoading(true);
      const token = await  AsyncStorage.getItem('token');
      const patientId = await AsyncStorage.getItem('userId');
    
      payload = {
        "firstName": firstName,
        "middleName":middleName,
        "lastName":lastName,
        "age":age,
        "mobileNo":mobileNo,
        "gender":gender
        }

      const response = await axios.put(`${baseUrl}/api/patient/updatepatient/${patientId}`,payload,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return Alert.alert(
        'Data Saved Successfully',
        
        [
          {
            text: 'OK',
            onPress: () => {
              getUserDetails();
            }
          }
        ],
        { cancelable: false }
      );
    
    } catch (error) {
      console.log("API error",error);
    }
    setIsLoading(false);
  };



  const getUserDetails = async () => {

    setIsLoading(true);

    const token = await  AsyncStorage.getItem('token');
    const patientId = await AsyncStorage.getItem('userId');

    try {
      const response = await axios.get(`${baseUrl}/api/patient/patientbyid/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
      });
      // Assuming response.data is an array of quotes
      if (response.data) {
        setResponseData(response.data);
        setAge(response.data.age);
        setFirstName(response.data.firstName);
        setMiddleName(response.data.middleName);
        setGender(response.data.gender);
        setLastName(response.data.lastName);
        setMobileNo(response.data.mobileNo);
        setEmail(response.data.email);
      }
    } catch (error) {
      console.log(error.message);
      console.error('Error fetching user details:', error);
    }
    setIsLoading(false);
  };


  const [showAccountDetails, setShowAccountDetails] = useState(false);
  
  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  return (
      <ScrollView>
        <KeyboardAvoidingView>
          
      <View style={styles.container}>
      {isLoading && (<ActivityIndicator color='purple' size={30}/>)}

      {!isLoading && (  <View style={styles.header}>
        <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGDohX4qAelLzi3t8vCfqccDFxifY-huxkmRrgnSRoig&s" }} style={styles.image} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{responseData.firstName} {responseData.middleName} {responseData.lastName}</Text>
          <Text>Email: {responseData.email}</Text>
          <Text>Phone Number: {responseData.mobileNo}</Text>
          <Text>Age: {responseData.age}</Text>

        </View>
      </View>)}

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
            <InputComponent placeholder="First Name" value={firstName} onChangeMethod={setFirstName} keyboardType='default' />
            <InputComponent placeholder="MiddleName" value={middleName} onChangeMethod={setMiddleName} keyboardType='default' />
            <InputComponent placeholder="Last Name" value={lastName} onChangeMethod={setLastName} keyboardType='default' />
            <InputComponent placeholder="Phone Number" value={mobileNo} onChangeMethod={setMobileNo} keyboardType='numeric' />
            <InputComponent placeholder="Gender" value={gender} onChangeMethod={setGender}  keyboardType='default'  />
            <InputComponent placeholder="Age" value={age.toString()} onChangeMethod={setAge}  keyboardType='default'  />

          <TouchableOpacity style={styles.logoutButton} onPress={()=>updateUserDetails()}>
            <Text style={styles.logoutButtonText}>Submit</Text>
          </TouchableOpacity>
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
    borderWidth:2,
    borderRadius:5,
    borderColor:'#9B8BCA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginBottom:10,
    padding:5,
    textAlign:'center',
  },
  logoutButton: {
    backgroundColor: '#9B8BCA',
    padding: 10,
    marginBottom:6,
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
