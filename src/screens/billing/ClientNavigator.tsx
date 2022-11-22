import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListBillingScreen from './list/ListBillingScreen';
import CreateBillingScreen from './create/CreateBillingScreen';
import billingscreens from './billingscreen.json';

const Stack = createNativeStackNavigator();

export function ClientNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={billingscreens.list}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={billingscreens.list} component={ListBillingScreen} />
      <Stack.Screen
        name={billingscreens.create}
        component={CreateBillingScreen}
      />
    </Stack.Navigator>
  );
}
