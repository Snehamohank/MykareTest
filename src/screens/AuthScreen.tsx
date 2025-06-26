import React, { useEffect } from 'react';
import { View } from 'react-native';
import { AuthForm } from '../component/AuthForm';
import { Storage } from '../utlis/storage';

export const AuthScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    Storage.initAdmin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <AuthForm onAuthSuccess={() => navigation.replace('Dashboard')} />
    </View>
  );
};