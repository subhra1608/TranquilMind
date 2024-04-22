import React,{useEffect} from 'react';
import { View, Button } from 'react-native';
import  {signInAnonymouslyIfNeeded} from '../../firebase-config'


const ChatScreen = ({ navigation }) => {
  useEffect(() => {
    signInAnonymouslyIfNeeded();
    });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Chat"
        onPress={() => navigation.navigate('ChatMessageScreen')}
      />
    </View>
  );
};

export default ChatScreen;


