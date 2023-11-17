import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './src/routes';
import {NavigationProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  AppExplanation: undefined;
  Start: undefined;
  HabitPage: {create: boolean; habit: {habitArea: string}};
  HabitsConfiguration: undefined;
};
export type StackNavigation = NavigationProp<RootStackParamList>;

export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <Routes />
    </>
  );
}
