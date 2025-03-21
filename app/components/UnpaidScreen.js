import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import EmiCard from '../components/EmiCard';

const UnpaidScreen = ({ emis, onPay }) => (
  <FlatList
    data={emis.filter(emi => !emi.isPaid)}
    keyExtractor={(item) => item.emiId.toString()}
    renderItem={({ item }) => <EmiCard emi={item} onPay={onPay} />}
    ListEmptyComponent={<Text style={styles.noData}>No Unpaid EMIs</Text>}
  />
);

const styles = StyleSheet.create({
  noData: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
    color: '#777',
  },
});

export default UnpaidScreen;
