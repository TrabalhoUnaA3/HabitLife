/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StatusBar} from 'react-native';
import Home from './src/pages/home';
import Start from './src/pages/start';
import HabitPage from './src/pages/HabitPage';
import AppExplanation from './src/pages/AppExplanation';

// export type ScreenNames = [
//   'Home',
//   'AppExplanation',
//   'AppExplanation',
//   'Start',
//   'HabitPage',
// ];
// export type RootStackParamList = Record<ScreenNames[number], undefined>;
// export type StackNavigation = NavigationProp<RootStackParamList>;

export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <HabitPage />
    </>
  );
}
