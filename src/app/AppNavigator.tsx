import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapsScreen from '../screens/maps/Maps';
import screens from '../screens.json';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { ClientScreen } from '../screens/billing/ClientScreen';
import { FeedScreen } from '../screens/feed/FeedScreen';

const Tab = createBottomTabNavigator();
export default function AppNavigator() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={screens.maps}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={screens.maps}
        component={MapsScreen}
        options={{
          tabBarIcon({ color, size }) {
            return <Icon name="md-home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={screens.listBilling}
        component={ClientScreen}
        options={{
          tabBarIcon({ color, size }) {
            return <Icon name="person" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={screens.feed}
        component={FeedScreen}
        options={{
          tabBarIcon({ color, size }) {
            return <Icon name="newspaper-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
