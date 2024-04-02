import { View, Text, FlatList, Button, ScrollView,StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../Components/HeaderComponent';
import Card from '../../Components/CardComponent';
import { data } from '../../data/courses';
import { baseUrl } from '../../data/baseUrl';

const ExploreScreen = ({ navigation }) => {
 

  const renderItem = ({ item }) => {
    
    const onCardPress= () =>{
      navigation.navigate('CourseHomeScreen',{ param1: item.id, param2: item.title })
  }
    return (
      <TouchableOpacity onPress={onCardPress}>
        <Card
        id ={item.id}
        title={item.title}
        description={item.description}
        imageSource={item.image}
        navigation={navigation}
      />
      </TouchableOpacity>  
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
          onPress={() => navigation.push('DoctorsDetailScreen')}
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
