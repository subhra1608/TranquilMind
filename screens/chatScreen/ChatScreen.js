// import React, { useEffect } from 'react';
// import { View, Button, Text, StyleSheet, Linking } from 'react-native';
// import AlertPro from "react-native-alert-pro";

// const formatPhoneNumber = (phoneNumberString) => {
//   const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
//   return cleaned;
// };

// const ChatScreen = ({ navigation }) => {
//   useEffect(() => {
//   }, []);

//   const handleOpenDialer = () => {
//     const phoneNumber = '9409548048';  
//     const formattedNumber = formatPhoneNumber(phoneNumber);
    
//     Linking.openURL(`tel:${formattedNumber}`)
//       .catch(err => {
//         console.error('Failed to open dialer:', err);
//         alertProRef.current.open(); // Open the AlertPro
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Chat"
//           onPress={() => navigation.navigate('ChatMessageScreen')}
//           color="#4CAF50"
//         />
//         <View style={styles.spacer} />
//         <Button
//           title="Open Dialer"
//           onPress={handleOpenDialer}
//           color="#f44336"
//         />
//       </View>
//       <AlertPro
//         ref={alertProRef}
//         onConfirm={() => alertProRef.current.close()}
//         title="Error"
//         message="Failed to open dialer. Please try again later."
//         showConfirm={true}
//         textConfirm="OK"
//         confirmButtonColor="#DD6B55"
//       />
//     </View>
//   );
// };

// const alertProRef = React.createRef();

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#fff'
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//     fontWeight: 'bold',
//     color: '#333'
//   },
//   buttonContainer: {
//     width: '100%',
//     paddingHorizontal: 50
//   },
//   spacer: {
//     height: 20,
//   }
// });

// export default ChatScreen;




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