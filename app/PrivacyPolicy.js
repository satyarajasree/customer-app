import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.sectionTitle}>Introduction</Text>
      <Text style={styles.text}>
        Welcome to our Privacy Policy. Your privacy is critically important to us. This policy explains how we handle your personal information and data when you use our app.
      </Text>

      <Text style={styles.sectionTitle}>Information We Collect</Text>
      <Text style={styles.text}>
        We collect information to provide better services to all our users. This includes:
        {"\n"}- Personal details like name, email address, and phone number.
        {"\n"}- Data about your device and usage of our app.
      </Text>

      <Text style={styles.sectionTitle}>How We Use Information</Text>
      <Text style={styles.text}>
        We use the information we collect to:
        {"\n"}- Provide, operate, and maintain our app.
        {"\n"}- Improve, personalize, and expand our services.
        {"\n"}- Communicate with you, either directly or through one of our partners.
      </Text>

      <Text style={styles.sectionTitle}>Sharing of Information</Text>
      <Text style={styles.text}>
        We do not share your personal information with third parties except:
        {"\n"}- To comply with legal obligations.
        {"\n"}- To protect and defend our rights and property.
        {"\n"}- With your explicit consent.
      </Text>

      <Text style={styles.sectionTitle}>Security</Text>
      <Text style={styles.text}>
        We take your security seriously and implement measures to protect your data. However, no system is completely secure, and we cannot guarantee the absolute security of your information.
      </Text>

      <Text style={styles.sectionTitle}>Your Rights</Text>
      <Text style={styles.text}>
        You have the right to:
        {"\n"}- Access and update your personal information.
        {"\n"}- Request deletion of your data.
        {"\n"}- Opt-out of certain data collection practices.
      </Text>

      <Text style={styles.sectionTitle}>Changes to This Policy</Text>
      <Text style={styles.text}>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </Text>

      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions about this Privacy Policy, please contact us at support@example.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default PrivacyPolicy;
