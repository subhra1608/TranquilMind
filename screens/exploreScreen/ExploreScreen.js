import { View, Text, FlatList, Button, ScrollView,StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../Components/HeaderComponent';
import Card from '../../Components/CardComponent';
import { data } from '../../data/courses';

const ExploreScreen = ({ navigation }) => {
  

  const renderItem = ({ item }) => {
    return (
      <Card
        id ={item.id}
        title={item.title}
        description={item.description}
        imageSource={item.image}
        navigation={navigation}
      />  
    );
  };

  return (
    <View>
      <View>
        <Header title="Mindful Modules" onPressBack={() => navigation.goBack()} />
        </View>
        <Button
          style={styles.shortButton} // Apply the custom style here
          title="Book an appointment"
          onPress={() => navigation.push('BookAppointmentScreen')}
          color="pink"
        />
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        horizontal={false}
      />
      </View>
    
  );
};
const styles = StyleSheet.create({
  shortButton: {
    width: 150, 
  },
});

export default ExploreScreen;
