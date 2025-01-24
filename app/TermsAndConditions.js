import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Terms and Conditions</Text>

      <Text style={styles.updatedDate}>Last Updated: January 18, 2025</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to [Your App Name]. These terms and conditions outline the rules and regulations for using our application. By accessing or using our app, you agree to comply with and be bound by these terms. If you disagree with any part, you must stop using the app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Use of the App</Text>
        <Text style={styles.paragraph}>
          You agree to use the app only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of the app. Prohibited behavior includes harassing or causing distress to any other user.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Account Registration</Text>
        <Text style={styles.paragraph}>
          To access certain features, you may be required to register an account. You must provide accurate and complete information during registration and keep your account information up to date.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content included in this app, including but not limited to text, graphics, logos, and software, is the property of [Your App Name] or its licensors. You may not reproduce, distribute, or use any part of the app without prior written permission.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Termination</Text>
        <Text style={styles.paragraph}>
          We reserve the right to terminate or suspend your access to the app at any time, without notice, for any reason, including if you breach these terms.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          To the fullest extent permitted by law, [Your App Name] shall not be liable for any damages arising from your use of the app, including but not limited to indirect, incidental, or consequential damages.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting. Your continued use of the app signifies your acceptance of the revised terms.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in [Your Location].
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these terms and conditions, please contact us:
          {"\n"}• **Email:** support@example.com
          {"\n"}• **Phone:** +1 (123) 456-7890
          {"\n"}• **Address:** 123 Terms Lane, Legal City, LC 12345
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#212529',
  },
  updatedDate: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
  },
});

export default TermsAndConditions;
