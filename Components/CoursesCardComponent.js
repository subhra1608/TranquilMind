import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';
import { ProgressBar } from 'react-native-paper';


const CoursesCardComponent = ({item}) => {
  console.log("Inside card component");
  console.log(item);

  return (
      <View className="flex-1">
        <View></View>
      </View>
    )
}

export default CoursesCardComponent

const styles = StyleSheet.create({})