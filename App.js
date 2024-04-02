// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homeScreen/HomeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
import ProfileScreen from './screens/profileScreen/ProfileScreen';
import OnboardingScreen from './screens/onboardingScreen/OnboardingScreen';
import LandingScreen from './screens/landingScreen/LandingScreen';
import ExploreScreen from './screens/exploreScreen/ExploreScreen';
import QuizScreen from './screens/quizScreen/QuizScreen';
import AppointmentScreen from './screens/appointmentScreen/AppointmentScreen';
import CourseHomeScreen from './screens/courseHomeScreen/CourseHomeScreen';
import DoctorsDetailScreen from './screens/bookAppointmentScreen/DoctorsDetailScreen';
import BookAppointmentScreen from './screens/bookAppointmentScreen/BookAppointmentScreen';
import CommunityScreen from './screens/communityScreen/CommunityScreen';
import RegistrationScreen from './screens/registrationScreen/RegistrationScreen';
import QuestionScreen from './screens/questionScreen/QuestionScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingScreen" >
        <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          title: 'Onboarding',
          headerShown:false
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={RegistrationScreen}
        options={{
          headerShown:false,
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="AppointmentScreen"
        component={AppointmentScreen}
        options={{
          headerShown:false,
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="CourseHomeScreen"
        component={CourseHomeScreen}
        options={{
          headerShown:false,
          title: 'CourseHomeScreen',
        }}
      />
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{
          headerShown:false,
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />     
      <Stack.Screen
        name="BookAppointmentScreen"
        component={BookAppointmentScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      /> 
      <Stack.Screen
        name="DoctorsDetailScreen"
        component={DoctorsDetailScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />         
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />    
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      /> 
      <Stack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          headerShown:false,
          title: 'Login',
        }}
      />

      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />  
       <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />  
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
