// ChatMessageScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { db } from '../../firebase-config';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { encryptMessage, decryptMessage, masterKey } from '../../EncryptionHelper';

const ChatMessageScreen = ({ navigation, route }) => {
  const [patientId, setPatientId] = useState(null);
  // const [doctorId, setDoctorId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // const [appointmentDate, setAppointmentDate] = useState(null);
  const { doctorId, appointmentDate } = route.params;
  const [isChatEnabled, setIsChatEnabled] = useState(true);

  // useEffect(() => {
  //   const fetchIds = async () => {
  //     const patientId = await AsyncStorage.getItem('userId');
  //     // const patientId = '6';
  //     const doctorId = await AsyncStorage.getItem('doctorId');
  //     const storedAppointmentDate = await AsyncStorage.getItem('selectedAppointmentDate'); // Fetching the stored appointment date
  //     setPatientId(patientId);
  //     setDoctorId(doctorId);
  //     console.log(patientId);
  //     console.log(doctorId);

  //     if (storedAppointmentDate) {
  //       setAppointmentDate(new Date(storedAppointmentDate));  // Convert string back to date
  //     }
  //     if (!storedAppointmentDate) {
  //       console.error('No appointment date stored');
  //       return;
  //     }
  //   };
  //   fetchIds();
  // }, []);
  useEffect(() => {
    const fetchPatientId = async () => {
      const storedPatientId = await AsyncStorage.getItem('userId');
      setPatientId(storedPatientId);
      evaluateChatAvailability();
    };
    fetchPatientId();
  }, [doctorId, appointmentDate]);
  console.log(patientId);
  console.log(doctorId);

  useEffect(() => {
    if (patientId && doctorId) {
      // const roomId = '$5_6';
      const roomId = `$${doctorId}_${patientId}`;
      console.log(roomId);
      const messagesRef = collection(db, 'Messages');
      const q = query(messagesRef, where('room', '==', roomId), orderBy('createdAt', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => {
          // console.log("Doc data:", doc.data());
          const encryptedText = doc.data().text;
          const decryptedText = decryptMessage(encryptedText, masterKey);  // Decrypting the message
          return {
            id: doc.id,
            text: decryptedText,
            createdAt: doc.data().createdAt?.toDate(),
            senderId: doc.data().senderId
          };
        });
        setMessages(fetchedMessages.reverse());
      });

      return () => unsubscribe();
    }
  }, [patientId, doctorId]);

  const evaluateChatAvailability = () => {
    const currentDateTime = new Date();
    const appointmentDateTime = new Date(appointmentDate);
    const timeDiff = currentDateTime.getTime() - appointmentDateTime.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    setIsChatEnabled(daysDiff <= 3);
  };

  // const handleSend = async () => {
  //   if (!appointmentDate) {
  //     console.error("Appointment date not available.");
  //     return;
  //   }
  //   const currentDate = new Date();

  //   const timeDiff = currentDate.getTime() - appointmentDate.getTime();
  //   const daysDiff = timeDiff / (1000 * 3600 * 24);

  //   if (daysDiff > 3) {
  //     Alert.alert("Chat Unavailable", "Chat is only available within 3 days from the appointment date.");
  //     return;
  //   }
  //   if (newMessage.trim().length > 0 && patientId && doctorId) {
  //     const encryptedMessage = encryptMessage(newMessage, masterKey); // Encrypt the message before sending
  //     const roomId = `$${doctorId}_${patientId}`;
  //     // const roomId = '$5_6';
  //     const senderId = `${patientId}_${doctorId}`;  
  //     const messagesRef = collection(db, 'Messages');
      
  //     try {
  //       await addDoc(messagesRef, {
  //         text: encryptedMessage,
  //         createdAt: serverTimestamp(),
  //         senderId: senderId,
  //         room: roomId
  //       });
        
  //       setNewMessage('');
  //     } catch (error) {
  //       console.error("Failed to send the message: ", error);
  //     }
  //   }
  // };

  const handleSend = async () => {
    if (!isChatEnabled) {
      Alert.alert("Chat Unavailable", "Chat is only available within 3 days from the appointment date.");
      return;
    }
    if (newMessage.trim().length > 0) {
      const encryptedMessage = encryptMessage(newMessage, masterKey);
      const roomId = `$${doctorId}_${patientId}`;
      const senderId = `${patientId}_${doctorId}`;

      try {
        await addDoc(collection(db, 'Messages'), {
          text: encryptedMessage,
          createdAt: serverTimestamp(),
          senderId,
          room: roomId
        });

        setNewMessage('');
      } catch (error) {
        console.error("Failed to send the message: ", error);
      }
    }
  };
  const renderMessage = (item) => {
    console.log("Checking message", item.senderId, "against patientId:", patientId);
    const isMyMessage = item.senderId && item.senderId.startsWith(`${patientId}_`);
    // console.log("Is my message:", isMyMessage);
    return (
        <View style={isMyMessage ? styles.myMessage : styles.theirMessage}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timeText}>
                {item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
            </Text>
        </View>
    );
};


// const canChat = () => {
//   if (!appointmentDate) return false;

//   const currentDate = new Date();
//   const timeDiff = currentDate.getTime() - appointmentDate.getTime();
//   const daysDiff = timeDiff / (1000 * 3600 * 24);

//   return daysDiff <= 3;
// };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat</Text>
      </View>
      <FlatList
      style={styles.container}
      data={messages}
      renderItem={({ item }) => renderMessage(item)}
      keyExtractor={(item) => item.id}
      inverted
    />
    {isChatEnabled ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message"
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noChatText}>Chat is no longer available for this appointment.</Text>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EEFF', // A very light grey
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#A390D5', // A soft purplish header background
      elevation: 3, // Subtle elevation for Android
      shadowOpacity: 0.1, // Shadow for iOS
      shadowRadius: 3,
      shadowColor: '#000',
      shadowOffset: { height: 1, width: 0 },
      zIndex: 10, // Make sure the header is above other elements
  },
  myMessage: {
      backgroundColor: '#D5A6ED', // A muted purplish tint for "my message" bubble
      padding: 12,
      borderRadius: 20,
      marginVertical: 8,
      marginHorizontal: 15,
      alignSelf: 'flex-end',
      maxWidth: '80%',
      shadowOpacity: 0.1,
      shadowRadius: 2,
      shadowColor: '#000',
      shadowOffset: { height: 1, width: 0 },
  },
  
  backIcon: {
      padding: 10,
      marginLeft: -10,
  },
  title: {
      flex: 1,
      // textAlign: 'center',
      fontSize: 20,
      fontWeight: '600', // Semi-bold
      color: '#FFFFFF', // White text for the title
  },
  theirMessage: {
      backgroundColor: '#EEEAF4', // Light grey with a hint of purple for "their message" bubble
      padding: 12,
      borderRadius: 20,
      marginVertical: 8,
      marginHorizontal: 15,
      alignSelf: 'flex-start',
      maxWidth: '80%',
      shadowOpacity: 0.1,
      shadowRadius: 2,
      shadowColor: '#000',
      shadowOffset: { height: 1, width: 0 },
  },
  messageText: {
    fontSize: 16,
    color: '#353535', // White text for high contrast in "myMessage"
  },
  timeText: {
      fontSize: 12,
      color: 'grey', // Subtle purple text for timestamp
      alignSelf: 'flex-end',
      marginTop: 4,
  },
  inputContainer: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: '#FDFDFF',
      borderTopWidth: 1,
      borderColor: '#EDEDED', // A very light grey border for the input area
  },
  input: {
      flex: 1,
      height: 40,
      backgroundColor: '#F4EEFF', // Matches the overall background
      borderRadius: 20,
      padding: 10,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#DCC7FF', // Soft purple border color
  },
  sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C59BF4', // A slightly darker purplish shade for the send button
      borderRadius: 20,
      width: 40,
      height: 40,
  },
  noChatText: {
    padding: 20,
    textAlign: 'center',
    color: 'red',
  }
  
});

export default ChatMessageScreen;