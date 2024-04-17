import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'



const ViewTaskScreen = ({navigation}) => {
    const route = useRoute();

  const { param1} = route.params;
  console.log(param1);
  return (
    <View>
      <Text>hi</Text>
    </View>
  )
}

export default ViewTaskScreen