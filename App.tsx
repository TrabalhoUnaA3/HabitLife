import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Routes from './src/routes';

export type ScreenNames = [
  'Home',
  'AppExplanation',
  'AppExplanation',
  'Start',
  'HabitPage',
];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Routes />
    </>
  );
}
