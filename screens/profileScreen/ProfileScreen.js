import { useEffect, useState } from 'react';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Linking, Alert } from 'react-native';
import InputComponent from '../../Components/InputComponent';
import { baseUrl } from '../../data/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import i18n from '../../i18';
const ProfileScreen = ({ navigation }) => {


  const [age,setAge]=useState(0);
  const [firstName,setFirstName] = useState("");
  const [middleName,setMiddleName]=useState("");
  const [lastName,setLastName]= useState("");
  const [gender,setGender]= useState("");
  const [mobileNo,setMobileNo]=useState(0);
  const [isLoading,setIsLoading]=useState(true);
  const [email,setEmail]=useState("");
  const [responseData, setResponseData]=useState({});
  const [isGuest, setIsGuest] = useState(false);
  const [language,setLanguage]=useState("");
  const t = i18n.t;

  useEffect(() => {
    checkIfGuestUser();
    setLanguageFromAsyncStorage();
    // Only call getUserDetails if not a guest user
   
  }, [isGuest]);
  const setLanguageFromAsyncStorage = async ()=>
    {
        const getSelectedLanguage = await AsyncStorage.getItem('language');
        if(getSelectedLanguage===null)
        {setLanguage('en');}
        else
        {setLanguage(getSelectedLanguage);}
    }

  const checkIfGuestUser = async () => {
    setIsLoading(true);
    const guestStatus = await AsyncStorage.getItem('isGuest');
    //console.log(guestStatus);
    setIsGuest(guestStatus === 'true');
    if (guestStatus !== 'true') {
      getUserDetails();
    }
    setIsLoading(true);
  };
  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    return cleaned;
  };
  const handleOpenDialer = () => {
    const phoneNumber = '08046110007';  // This should be your actual emergency contact number
    const formattedNumber = formatPhoneNumber(phoneNumber);
    
    Linking.openURL(`tel:${formattedNumber}`)
      .catch(err => {
        console.error('Failed to open dialer:', err);
        alert("Failed to open dialer. Please try again later."); // Using native alert if AlertPro is not set up here
      });
};
  
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
    //console.log("In use rdetail")
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
  
  const handleLogout = async() => {

    await AsyncStorage.removeItem('isGuest');
    await AsyncStorage.removeItem('token');
    navigation.navigate('LoginScreen');

  };



  if (isGuest) {
    return (
      <View style={styles.container}>
        <Text style={styles.guestMessage}>You are currently logged in as a guest.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
          <Text style={styles.loginButtonText}>Login or Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const deleteAccount = async () => {
    Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => confirmDeleteAccount() }
        ],
        { cancelable: false }
    );
};

const confirmDeleteAccount = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    try {
        const response = await axios.delete(`${baseUrl}/api/patient/deletepatient/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 410) { // Assuming status code 410 for 'Gone' as used in ResponseEntity
            Alert.alert("Account Deleted", "Your account has been successfully deleted.");
            await AsyncStorage.clear();
            navigation.replace('LoginScreen'); // Redirect to login screen or home
        } else {
            throw new Error("Failed to delete the account.");
        }
    } catch (error) {
        console.error("Deletion failed:", error);
        Alert.alert("Deletion Failed", "Could not delete the account. Please try again later.");
    }
};
  return (
    
      <ScrollView>
        <KeyboardAvoidingView>
        
      {!isGuest && (    
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

      {
        !isLoading && (
          <View classname=" flex-1">
            <View classname=" flex-1 bg-slate-600">
            <TouchableOpacity onPress={()=>navigation.navigate('AppointmentScreen')}>
              
              <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('My Appointments', { lng: language })}</Text>
              </View>
            </TouchableOpacity>
        </View>
        
        <View>
        <TouchableOpacity onPress={() => setShowAccountDetails(!showAccountDetails)}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('Account Details', { lng: language })}</Text>
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
        <View classname=" flex-1 bg-slate-600">
            <TouchableOpacity onPress={()=>navigation.navigate('MyPostsScreen')}>
              
              <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('My Posts and Questions', { lng: language })}</Text>
              </View>
            </TouchableOpacity>
        </View>      
      </View>
      
      <TouchableOpacity 
          onPress={handleOpenDialer}
          style={styles.dialerButton}
        >
          <Text style={styles.dialerButtonText}>{t('Call Emergency Services', { lng: language })}</Text>
        </TouchableOpacity>
          <TouchableOpacity 
          style={styles.logoutButton} onPress={()=>handleLogout()}>
            <Text style={styles.logoutButtonText}>{t('Logout', { lng: language })}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAccount} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        )

      }
    </View>
      )}
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
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  guestMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#9B8BCA',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  accountDetailsText:{
    marginTop:2,
    fontSize: 18,

  },
  dialerButton: {
    backgroundColor: '#f44336', // A bright red color for emergency
    padding: 15,
    borderRadius: 10,
    marginTop: 20, // Add some top margin for spacing from other content
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Use full width to make it more prominent
    marginBottom: 20,
  },
  dialerButtonText: {
    color: '#fff', // White text for better contrast and readability
    fontSize: 18,
    fontWeight: 'bold', // Bold text to make it more noticeable
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
},
deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
},
});

export default ProfileScreen;
