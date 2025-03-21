import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      
      {/* Text Input */}
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 10,
    margin: 10,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchBar;