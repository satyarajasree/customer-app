import React, { useState } from 'react';
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import EmiCard from '../components/EmiCard';
import { LinearGradient } from 'expo-linear-gradient';

const PaidScreen = ({ emis }) => {
  const [showAll, setShowAll] = useState(false);
  const paidEmis = emis.filter(emi => emi.isPaid).reverse();

  // If not showing all, only show the first emi
  const displayedEmis = showAll ? paidEmis : paidEmis.slice(0, 1);

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedEmis}
        keyExtractor={(item) => item.emiId.toString()}
        renderItem={({ item }) => <EmiCard emi={item} />}
        ListEmptyComponent={<Text style={styles.noData}>No Paid EMIs</Text>}
      />
      {!showAll && paidEmis.length > 1 && (
        <TouchableOpacity onPress={() => setShowAll(true)}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>View More</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noData: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
    color: '#777',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PaidScreen;
