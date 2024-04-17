  import React from 'react';
  import {
    Alert,
    Animated,
    ScrollView,
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
          height={50}
          circleWidth={40}
          bgColor="#9B8BCA"
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
            component={() => <ScrollView><HomeScreen navigation ={navigation} /></ScrollView>}
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
    },
    content: {
      flex: 1,
      paddingBottom: 60, // Adjust the padding to accommodate the bottom tab bar
    },
    shawdow: {
      shadowColor: '#C26DBC',
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
      color:'#9B8BCA'
    },
    btnCircleUp: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9B8BCA',
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
      tintColor: '#C26DBC',
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

  // import React from 'react';
  // import { View, StyleSheet } from 'react-native';
  
  // import { CommonActions } from '@react-navigation/native';
  // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  // import { Text, BottomNavigation } from 'react-native-paper';
  // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  // import HomeScreen from '../homeScreen/HomeScreen';
  // import ProfileScreen from '../profileScreen/ProfileScreen';
  // import CommunityScreen from '../communityScreen/CommunityScreen';
  // import ExploreScreen from '../exploreScreen/ExploreScreen';
  // import ChatScreen from '../chatScreen/ChatScreen';


  // const Tab = createBottomTabNavigator();
  

  

  // export default function LandingScreen() {



  //   return (
  //     <Tab.Navigator
  //       screenOptions={{
  //         headerShown: false,
  //       }}
        
                
  //       tabBar={({ navigation, state, descriptors, insets }) => (
  //         <BottomNavigation.Bar
  //           style={{
  //             backgroundColor:'',
              
  //           }}
            
  //           activeColor='#8155AA'
  //           inactiveColor='black'
  //           keyboardHidesNavigationBar={true}
  //           shifting={true}
  //           navigationState={state}
  //           compact={true}
  //           safeAreaInsets={insets}
  //           onTabPress={({ route, preventDefault }) => {
  //             const event = navigation.emit({
  //               type: 'tabPress',
  //               target: route.key,
  //               canPreventDefault: false,
  //             });
  
  //             if (event.defaultPrevented) {
  //               preventDefault();
  //             } else {
  //              navigation.dispatch({
  //                 ...CommonActions.navigate(route.name, route.params),
  //                 target: state.key,
  //               });
  //             }
  //           }}
  //           renderIcon={({ route, focused, color }) => {
  //             const { options } = descriptors[route.key];
  //             if (options.tabBarIcon) {
  //               return options.tabBarIcon({ focused, color, size: 24 });
  //             }
  
  //             return null;
  //           }}
  //           getLabelText={({ route }) => {
  //             const { options } = descriptors[route.key];
  //             const label =
  //               options.tabBarLabel !== undefined
  //                 ? options.tabBarLabel
  //                 : options.title !== undefined
  //                 ? options.title
  //                 : route.title;
  
  //             return label;
  //           }}
  //         />
  //       )}
  //     >
  //       <Tab.Screen
  //         name="Home"
  //         component={HomeScreen}
  //         options={{
  //           tabBarLabel: 'Home',
  //           tabBarIcon: ({ color, size }) => {
  //             return <Icon name="home" size={size} color={color} />;
  //           },
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Community"
  //         component={CommunityScreen}
  //         options={{
  //           tabBarLabel: 'community',
  //           tabBarIcon: ({ color, size }) => {
  //             return <Icon name="account-group" size={size} color={color} />;
  //           },
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Explore"
  //         component={ExploreScreen}
  //         options={{
  //           tabBarLabel: 'Explore',
  //           tabBarIcon: ({ color, size }) => {
  //             return <Icon name="airplane-takeoff" size={size} color={color} />;
  //           },
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Chat"
  //         component={ChatScreen}
  //         options={{
  //           tabBarLabel: 'Chat',
  //           tabBarIcon: ({ color, size }) => {
  //             return <Icon name="message-text" size={size} color={color} />;
  //           },
  //         }}
  //       />
  //       <Tab.Screen
  //         name="Profile"
  //         component={ProfileScreen}
  //         options={{
  //           tabBarLabel: 'Profile',
  //           tabBarIcon: ({ color, size }) => {
  //             return <Icon name="account-circle" size={size} color={color} />;
  //           },
  //         }}
  //       />
         
  //     </Tab.Navigator>
  //   );
  // }
  
