import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';
import { ProgressBar } from 'react-native-paper';


const CoursesCardComponent = ({item,courseId}) => {
  //console.log("Inside card component");
  // console.log(item);

// console.log(courseId)
  return (
      <View className="flex-1 h-20 m-3 rounded-xl bg-[#C197D2] ">
        <Text className="text-center m-6 text-lg text-white font-semibold">{item.title}</Text>
      </View>
    )
}

export default CoursesCardComponent

const styles = StyleSheet.create({})