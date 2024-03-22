  // import { View, Text } from 'react-native'
  // import React from 'react'
  // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  // import ProfileScreen from '../profileScreen/ProfileScreen';
  // import HomeScreen from '../homeScreen/HomeScreen';

  // const LandingScreen = () => {
  //     const Tab = createBottomTabNavigator();
  //   return (
  //     <Tab.Navigator>
  //         <Tab.Screen name="HomeScreen" component={HomeScreen} />
  //         <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
  //         <Tab.Screen name="SettingScreen" component={HomeScreen} />
  //     </Tab.Navigator>
  //   )
  // }

  // export default LandingScreen

  import React from 'react';
  import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
  } from 'react-native';
  import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import HomeScreen from '../homeScreen/HomeScreen';
  import ProfileScreen from '../profileScreen/ProfileScreen';
  import CommunityScreen from '../communityScreen/CommunityScreen';
  import ChatScreen from '../chatScreen/ChatScreen.js';


  export default function LandingScreen({navigation}) {
    const _renderIcon = (routeName, selectedTab) => {
      let icon = '';

      switch (routeName) {
        case 'HomeScreen':
          icon = 'home';
          break;
        case 'CommunityScreen':
          icon = 'people';
          break;
          case 'ProfileScreen':
          icon = 'person';
          break;
        case 'ChatScreen':
          icon = 'chatbubbles';
          break;
      }

      return (
        <Ionicons
          name={icon}
          size={25}
          color={routeName === selectedTab ? 'black' : 'white'}
        />
      );
    };
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
      return (
        <TouchableOpacity
          onPress={() => navigate(routeName)}
          style={styles.tabbarItem}
        >
          {_renderIcon(routeName, selectedTab)}
        </TouchableOpacity>
      );
    };

    return (
      
        <CurvedBottomBarExpo.Navigator
          type="DOWN"
          style={styles.bottomBar}
          shadowStyle={styles.shawdow}
          height={55}
          circleWidth={40}
          bgColor="#DFA0D1"
          initialRouteName="HomeScreen"
          borderTopLeftRight
          renderCircle={({ selectedTab, navigate }) => (
            <Animated.View style={styles.btnCircleUp}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>navigation.navigate('ExploreScreen') }
              >
                <Ionicons name={'apps-sharp'} color="white" size={25} />
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}
        >
          <CurvedBottomBarExpo.Screen
            name="HomeScreen"
            position="LEFT"
            component={() => <HomeScreen navigation ={navigation} />}
          />
          <CurvedBottomBarExpo.Screen
            name="CommunityScreen"
            position="LEFT"
            component={() => <CommunityScreen  navigation ={navigation}/>}
          />
          
          <CurvedBottomBarExpo.Screen
          name="ChatScreen"
          component={() => <ChatScreen navigation ={navigation} />}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
            name="ProfileScreen"
            component={() => <ProfileScreen navigation ={navigation} />}
            position="RIGHT"
          />
        </CurvedBottomBarExpo.Navigator>
      
    );
  }

  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    shawdow: {
      shadowColor: '#D9FA7C',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
    },
    bottomBar: {
      color:'#05445E'
    },
    btnCircleUp: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DFA0D1',
      bottom: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: '#D9FA7C',
    },
    tabbarItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: 30,
      height: 30,
    },
    
  });