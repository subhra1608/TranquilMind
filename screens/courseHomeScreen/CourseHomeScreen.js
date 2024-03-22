import * as React from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../../Components/HeaderComponent';
//import MyComponent from '../../Components/RegularCardComponent';

const CourseHomeScreen = ({ navigation }) => {
  const route = useRoute();
  const { param2 } = route.params;
  const [selectedWeek, setSelectedWeek] = React.useState(1);

  const handleWeekButtonClick = (week) => {
    setSelectedWeek(week);
  };

  return (
      <View>
        
<Header title={`${param2} Module`} onPressBack={() => navigation.goBack()} />
<View className="">
  <Text>Welcome to the {param2} module!</Text>
  <View style={styles.buttonContainer}>
    <Button 
      title="Week 1" 
      onPress={() => handleWeekButtonClick(1)} 
      color={selectedWeek === 1 ? 'blue' : 'gray'}
      accessibilityLabel="Select Week 1"
      style={styles.buttonText}
    />
    <Button 
      title="Week 2" 
      onPress={() => handleWeekButtonClick(2)} 
      color={selectedWeek === 2 ? 'blue' : 'gray'}
      accessibilityLabel="Select Week 2"
      style={styles.buttonText}
    />
    <Button 
      title="Week 3" 
      onPress={() => handleWeekButtonClick(3)} 
      color={selectedWeek === 3 ? 'blue' : 'gray'}
      accessibilityLabel="Select Week 3"
      style={styles.buttonText}
    />
    <Button 
      title="Week 4" 
      onPress={() => handleWeekButtonClick(4)} 
      color={selectedWeek === 4 ? 'blue' : 'gray'}
      accessibilityLabel="Select Week 4"
      style={styles.buttonText}
    />
  </View>
  {selectedWeek && (
    <View>
      <Text>Content for Week {selectedWeek}</Text>
      {/* Render content for the selected week here */}
    </View>
  )}
</View>
        
      </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  buttonText: {
    color: 'black',
  },
});

export default CourseHomeScreen;
