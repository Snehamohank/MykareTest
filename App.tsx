import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from './src/App';
import {SafeAreaView} from 'react-native-safe-area-context';


const MainApp = () => {
  return (
      <App />
  );
};

export default MainApp;

const styles = StyleSheet.create({
 
});
