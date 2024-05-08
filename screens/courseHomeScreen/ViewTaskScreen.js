import { View, Text, ScrollView, StyleSheet,Linking ,TouchableOpacity} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import Header from '../../Components/HeaderComponent';

const ViewTaskScreen = ({ navigation }) => {
  const route = useRoute();
  const { param1 } = route.params;
  
  const handleLinkPress = () => {
    Linking.openURL(param1.link);
  };

  return (
    <View style={styles.container}>
      <Header title={param1.taskId} onPressBack={() => navigation.goBack()} />
      <View style={styles.descriptionContainer}>
        <Text className="font-extrabold text-white text-center text-5xl mb-5">{param1.taskId}</Text>
        <Text style={styles.descriptionText}>{param1.description}</Text>
        <TouchableOpacity onPress={handleLinkPress}>
          <Text style={styles.linkText}>Link to resources: {param1.link}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  descriptionContainer: {
    backgroundColor: '#C197D2',
    padding: 10,
    margin: 10,
    marginTop:40,
    borderRadius: 5,
  },
  descriptionText: {
    color: 'white',
    fontSize: 28,
    justifyContent: 'center',
    textAlign:'center'
  },
  linkText: {
    color: 'white',
    fontSize: 28,
    marginTop: 30,

  },
});

export default ViewTaskScreen;
