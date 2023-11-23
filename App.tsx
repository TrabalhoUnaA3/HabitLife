import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './src/routes';
import {NavigationProp} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';

export type RootStackParamList = {
  Home:
    | undefined
    | {updateHabit?: string; createHabit?: string; excludeArea?: string};
  AppExplanation: undefined;
  Start: undefined;
  HabitPage: {create: boolean; habit: {habitArea: string}};
  HabitsConfiguration: undefined;
};
export type StackNavigation = NavigationProp<RootStackParamList>;

export default function App() {
  return (
    <>
      <ToastProvider>
        <StatusBar barStyle="default" />
        <Routes />
      </ToastProvider>
    </>
  );
}
