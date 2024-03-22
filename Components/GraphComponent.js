import { View, Text } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const GraphComponent = () => {
  return (
    <View>
        <Text className="ml-4 mt-2 font-bold text-lg">Weekly Analysis </Text>
        <LineChart
            data={{
            labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat","Sun"],
            datasets: [{
                data: [
                    
                    Math.random()*10,
                    Math.random()*10,
                    Math.random()*10,
                    Math.random()*10,
                    Math.random()*10
                    ]
                }]
            }}
            width={screenWidth} // from react-native
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor:'black',
            // backgroundGradientFrom: "#fb8c00",
            // backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />
    </View>
  )
}

export default GraphComponent