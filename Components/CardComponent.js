import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Card = ({ id,title, description, imageSource, navigation }) => {

  const onCardPress= () =>{
      navigation.navigate('CourseHomeScreen',{ param1: id, param2: title })
  }
  return (
    <TouchableOpacity onPress={onCardPress} style={styles.card}>
      <Image source={{
          uri: imageSource,
        }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text  style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    margin:10,
    marginLeft:15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height:230,
    width:175,
    shadowOpacity: 2,
    shadowRadius: 3.84,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'center',
    justifyContent:'center'
  },
  description: {
    fontSize: 16,
    textAlign:'center',
    marginLeft:15,
    color: '#666',
  },
});

export default Card;
