import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Storage} from '../utlis/storage'; 
import {UserList} from '../component/UserList'; 

type User = {
  username: string;
  password: string;
  isAdmin?: boolean;
};

type LocationData = {
  ip: string;
  country: string;
};

export const DashboardScreen = ({navigation}: {navigation: any})  => {
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await Storage.getCurrentUser();
      setUser(currentUser);
      
      if (currentUser?.isAdmin) {
        setUsers(await Storage.getUsers());
      }
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const {ip} = await ipResponse.json();
        const countryResponse = await fetch(`http://ip-api.com/json/${ip}`);
        const {country} = await countryResponse.json();
        setLocation({ip, country});
      } catch (error) {
        setLocation({ip: 'Unknown', country: 'Unknown'});
      }
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    await Storage.logout();
    navigation.navigate('Auth');
  };

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Welcome, {user.username}</Text>

      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>IP Address: {location.ip}</Text>
          <Text style={styles.locationText}>Country: {location.country}</Text>
        </View>
      )}

      {user.isAdmin && (
        <View style={styles.adminSection}>
          <TouchableOpacity 
            style={styles.toggleButton}
            onPress={() => setShowUsers(!showUsers)}
          >
            <Text style={styles.toggleButtonText}>
              {showUsers ? 'Hide Users' : 'Show All Users'}
            </Text>
          </TouchableOpacity>
          {showUsers && <UserList users={users} />}
        </View>
      )}

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CD5C5C',
    marginVertical: 40,
    textAlign: 'center',
  },
  locationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationText: {
    fontSize: 16,
    marginVertical: 5,
  },
  adminSection: {
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: '#CD5C5C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#CD5C5C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});