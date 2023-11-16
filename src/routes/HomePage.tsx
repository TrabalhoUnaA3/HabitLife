import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Start from '../pages/start';
import Home from '../pages/home';
import AppExplanation from '../pages/AppExplanation';
import HabitPage from '../pages/HabitPage';
import HabitsConfiguration from '../pages/HabitsConfiguration';
import {RootStackParamList} from '../../App';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomePage() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="AppExplanation" component={AppExplanation} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HabitPage" component={HabitPage} />
        <Stack.Screen
          name="HabitsConfiguration"
          component={HabitsConfiguration}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
