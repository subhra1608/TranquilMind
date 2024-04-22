// ChatMessageScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { db } from '../../firebase-config'; 
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

// const messagesData = [
//     {
//       id: '1',
//       text: 'Hey, how are you?',
//       timestamp: '4:30 PM',
//       userId: '1',
//     },
//     {
//       id: '2',
//       text: 'I\'m good, how about you?',
//       timestamp: '4:35 PM',
//       userId: '2',
//     },
//     {
//       id: '3',
//       text: 'Great! Working on a project. You?',
//       timestamp: '4:40 PM',
//       userId: '1',
//     },
//   ];


  
  const ChatMessageScreen = ({ navigation }) => {
    const [patientId, setPatientId] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    

    useEffect(() => {
      const fetchIds = async () => {
          const patientId = await AsyncStorage.getItem('userId');
          const doctorId = await AsyncStorage.getItem('doctorId');
          setPatientId(patientId);
          setDoctorId(doctorId);
      };
      fetchIds();
  }, []);


    useEffect(() => {
        if (patientId && doctorId) {
          const roomId = `$${doctorId}_${patientId}`;
          // const roomId = '$5_24';
          const messagesRef = collection(db, 'Messages');
            const q = query(messagesRef, where('room', '==', roomId), orderBy('createdAt', 'asc'));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate() 
                })); 
                setMessages(fetchedMessages.reverse());
            });

            return () => unsubscribe();
        }
    }, [patientId, doctorId]);
    // console.log(messages);
    const handleSend = async () => {
      if (newMessage.trim().length > 0 && patientId && doctorId) {
        const messagesRef = collection(db, 'Messages');

        const roomId = `$${doctorId}_${patientId}`;
        // const roomId = '$5_24';
        console.log("Room ID:",roomId);
        
          
        try {
          await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            senderId: `${patientId}_${doctorId}`, // Adjust the format as needed
            room: roomId
          });
          
          setNewMessage('');
          console.log("Message sent successfully.");
        } catch (error) {
          console.error("Failed to send the message: ", error);
        }
      }
    };
  
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
          renderItem={({ item }) => (
            <View style={item.senderId.split('_')[0] === patientId ? styles.myMessage : styles.theirMessage}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timeText}>
              {item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}</Text>          
              </View>
          )}
          keyExtractor={(item) => item.id}
          inverted
        />
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
  });

export default ChatMessageScreen;

