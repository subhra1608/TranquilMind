import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const QnAComponent = ({item}) => {

  return (
    <View className="flex flex-1 content-center justify-center shadow-lg m-2 bg-red-300 rounded-xl p-3">
      <Text className="text-xl font-bold">Q:  {item.question}</Text> 
      <Text className=" text-xl w-4/5">Ans:  {item.answer}</Text> 
      <Text className="text-lg">{item.userName}</Text> 
      <View className="flex flex-row justify-between mt-4">
        <View>
            <TouchableOpacity className="bg-red-400 p-3 rounded-xl "  >
                <Ionicons name="thumbs-up" size={15} color="white">Helpful for {item.liked}</Ionicons>
            </TouchableOpacity>
        </View>
        <View className="bg-red-400 p-2 rounded-xl ">
        <Ionicons name="thumbs-down" size={15} color="white">  {item.disliked}</Ionicons>
        </View>

      </View>
    </View>
  )
}

export default QnAComponent

const styles = StyleSheet.create({})