// ChatMessage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatMessage = ({ message, isOwnMessage }) => {
  return (
    <View style={[styles.messageContainer, isOwnMessage ? styles.ownMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.timeText}>{message.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    maxWidth: '80%',
  },
  ownMessage: {
    backgroundColor: '#DCF8C6', // Light green for own messages
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  otherMessage: {
    backgroundColor: '#E5E5EA', // Light grey for other messages
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
});

export default ChatMessage;
