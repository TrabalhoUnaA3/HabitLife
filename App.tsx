import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './src/routes';
import {NavigationProp} from '@react-navigation/native';

export type ScreenNames = [
  'Home',
  'AppExplanation',
  'Start',
  'HabitPage',
  'HabitsConfiguration',
];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <Routes />
    </>
  );
}
