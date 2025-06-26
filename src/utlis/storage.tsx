import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  username: string;
  password: string;
  isAdmin?: boolean;
};

const USERS_KEY = '@users';
const CURRENT_USER_KEY = '@current_user';

export const Storage = {
  // User 
  async storeUser(user: User): Promise<void> {
    try {
      const users = await this.getUsers();
      if (users.some(u => u.username === user.username)) {
        throw new Error('Username already exists');
      }
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
    } catch (error) {
      console.error('Error storing user:', error);
      throw error;
    }
  },

  async getUsers(): Promise<User[]> {
    try {
      const users = await AsyncStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  // Session management
  async setCurrentUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting current user:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await AsyncStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Initialize admin user
  async initAdmin(): Promise<void> {
    try {
      const users = await this.getUsers();
      if (!users.some(u => u.username === 'admin')) {
        await this.storeUser({ 
          username: 'admin', 
          password: 'admin', 
          isAdmin: true 
        });
      }
    } catch (error) {
      console.error('Error initializing admin:', error);
      throw error;
    }
  }
};