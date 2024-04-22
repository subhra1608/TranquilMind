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
import TotalScoreScreen from './screens/totalScoreScreen/TotalScoreScreen';
import CreatePostScreen from './screens/createPostScreen/CreatePostScreen';
import YouTubeScreen from './screens/youTubeScreen/YouTubeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeViewAndroid from './Components/SafeViewAndroid';
import ViewTaskScreen from './screens/courseHomeScreen/ViewTaskScreen';
import ChatScreen from './screens/chatScreen/ChatScreen';
import ChatMessage from './screens/chatScreen/ChatMessage';
import ChatMessageScreen from './screens/chatScreen/ChatMessageScreen';
import CreateQnAScreen from './screens/createQnAscreen/CreateQnAScreen';
import PostCardComponent from './Components/PostCardComponent';
import { useEffect } from 'react';
const Stack = createNativeStackNavigator();


export default function App() {
  
  

  return (
    
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:false
        }}
        
        initialRouteName="LoginScreen" >
        <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
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
          title: 'LandingScreen',
        }}
      />
      <Stack.Screen
        name="YouTubeScreen"
        component={YouTubeScreen}
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
        options={{headerShown: false}}
      /> 
      <Stack.Screen
        name="ViewTaskScreen"
        component={ViewTaskScreen}
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
      <Stack.Screen
        name="TotalScoreScreen"
        component={TotalScoreScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />  
      <Stack.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />  
      <Stack.Screen
        name="CreateQnAScreen"
        component={CreateQnAScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />  
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />  
      <Stack.Screen
        name="ChatMessageScreen"
        component={ChatMessageScreen}
        options={{
          headerShown:false,
          title: 'Awesome app',
        }}
      />  
      <Stack.Screen
        name="PostCardComponent"
        component={PostCardComponent}
        options={{
          headerShown:false,
          title: 'Login',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
    </SafeAreaView>
  );
}
