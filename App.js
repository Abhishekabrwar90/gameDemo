import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './src/screens/DashboardScreen';
import GameDetailScreen from './src/screens/GameDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import { AppProvider } from './src/context/AppContext';

// Import your custom image for the Games tab
const GameIcon = require('./src/assets/images/home.png'); // Adjust the path if needed
const ProfileIcon = require('./src/assets/images/profile.png'); // Adjust the path if needed
 


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="GameDetail" component={GameDetailScreen} options={{ title: 'Game Details' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconComponent;
              if (route.name === 'Games') {
                // Use your custom image for the Games tab
               
                iconComponent = (
                  <Image
                    source={GameIcon}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                );      
                      } else if (route.name === 'Profile') {
                // Use Ionicons for the Profile tab
                 
                iconComponent = (
                  <Image
                    source={ProfileIcon}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                );     
                
               }
              return iconComponent;
            },
            tabBarActiveTintColor: '#007bff', // Example active color
            tabBarInactiveTintColor: 'gray', // Example inactive color
          })}
        >
          <Tab.Screen name="Games" component={DashboardStack} options={{ headerShown: false }} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
} 