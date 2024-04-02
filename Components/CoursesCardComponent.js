import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const CoursesCardComponent = () => {
  return (
      <View className="flex-1">
        <View className="mt-2 rounded-lg basis-24 m-2 justify-center bg-yellow-100">
          <View className="flex flex-row justify-evenly">
            <View className="m-3">
              <Avatar.Text size={55} label='50%'/>
            </View>
            <View className=" flex flex-1 justify-evenly content-center flex-col">
                <View>
                  <Text className="justify-center text-xl font-bold">Your Current Progress</Text>
                </View>
                <View className="flex flex-row content-center">
                  <View className=" w-11/12">
                    <ProgressBar  progress={0.25}  color='purple' />
                  </View>
              
                </View>
            </View>
          </View>
        </View>
      </View>
    )
}

export default CoursesCardComponent

const styles = StyleSheet.create({})