import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { User } from '../types';

export const UserList = ({ users }: { users: User[] }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Registered Users</Text>
    <FlatList
      data={users}
      keyExtractor={item => item.username}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.username}</Text>
          {item.isAdmin && <Text style={styles.admin}>Admin</Text>}
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  item: { flexDirection: 'row', padding: 10, borderBottomWidth: 1 },
  admin: { color: 'green', marginLeft: 10 }
});