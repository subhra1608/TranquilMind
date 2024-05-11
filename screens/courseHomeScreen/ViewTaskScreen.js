import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import Header from '../../Components/HeaderComponent';

const ViewTaskScreen = ({ navigation }) => {
  const route = useRoute();
  const { taskData } = route.params;

  const handleLinkPress = () => {
    Linking.openURL(taskData.link);
  };

  return (
    <View style={styles.container}>
      <Header title="Reading Modules" onPressBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.descriptionContainer}>
          <Text className="font-extrabold text-white text-center text-3xl mb-5 " style={{    textDecorationLine: 'underline', // Underline style
}}>{taskData.title}</Text>
          <Text style={styles.descriptionText}>{taskData.description}</Text>
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={styles.linkText}>Link to resources: {taskData.link}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.completeButton} onPress={() => {/* handle completion */}}>
        <Text style={styles.completeButtonText}>Mark as Completed</Text>
      </TouchableOpacity>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  descriptionContainer: {
    backgroundColor: '#C197D2',
    padding: 10,
    margin: 10,
    marginTop: 30,
    borderRadius: 20,
    
  },
  descriptionText: {
    color: 'white',
    fontSize: 22,
    justifyContent: 'center',
    textAlign: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  completeButton: {
    //position: 'absolute',
   // bottom: 20, // Adjust as needed
   marginBottom:10,
    alignSelf: 'center',
    backgroundColor: '#C197D2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ViewTaskScreen;
