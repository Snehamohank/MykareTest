import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import {Storage} from '../utlis/storage';

type AuthMode = 'login' | 'register';

export const AuthForm = ({onAuthSuccess}: {onAuthSuccess: () => void}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    try {
      if (!username || !password) {
        throw new Error('Please enter both username and password');
      }

      const users = await Storage.getUsers();

      if (mode === 'login') {
        const user = users.find(
          u => u.username === username && u.password === password,
        );
        if (!user) throw new Error('Invalid credentials');
        await Storage.setCurrentUser(user);
        onAuthSuccess();
      } else {
        if (users.some(u => u.username === username)) {
          Alert.alert('Username already exists');
        }
        await Storage.storeUser({username, password});
        Alert.alert(
          'Registration Successful',
          'You can now login with your credentials',
          [
            {
              text: 'OK',
              onPress: () => {
                setMode('login');
                setUsername('');
                setPassword('');
              },
            },
          ],
        );
      }
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: '30%',
          width: '100%',
          backgroundColor: '#CD5C5C',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          flexDirection: 'column-reverse',
        }}>
        <View style={{padding: 30}}>
          <Text style={{color: '#fff', fontSize: 25, fontWeight: '700'}}>
            Welcome
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: '400',
              marginTop: 10,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            varius augue venenatis tincidunt semper.
          </Text>
        </View>
      </View>
    <View style={{paddingHorizontal:20}}>
    <Text style={styles.title}>
        {mode === 'login' ? 'Login' : 'Register'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#CD5C5C'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#CD5C5C'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAuth}
        disabled={!username || !password}>
        <Text style={styles.buttonText}>
          {mode === 'login' ? 'Login' : 'Register'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMode(mode === 'login' ? 'register' : 'login');
        }}>
        <Text style={styles.switchText}>
          {mode === 'login'
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
    color: '#CD5C5C',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#CD5C5C',
    padding: 15,
    color:'#000',
    marginBottom: 15,
    borderRadius: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#CD5C5C',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#CD5C5C',
    fontSize: 14,
  },
});
