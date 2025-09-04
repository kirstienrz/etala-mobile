import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
  Dimensions
} from 'react-native';
import Footer from '../../components/Footer';

const { width } = Dimensions.get('window');

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    
    Alert.alert('Success', 'Thank you for your message. We\'ll get back to you soon!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const openEmail = () => {
    Linking.openURL('mailto:contact@company.com');
  };

  const openPhone = () => {
    Linking.openURL('tel:+1234567890');
  };

  const openLocation = () => {
    const url = 'https://maps.google.com/?q=123 Business Ave, City, State 12345';
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Get In Touch</Text>
        <Text style={styles.headerSubtitle}>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Text>
      </View>

      {/* Contact Info Cards */}
      <View style={styles.contactInfoContainer}>
        <TouchableOpacity style={styles.infoCard} onPress={openEmail}>
          <View style={[styles.iconContainer, { backgroundColor: '#E53E3E' }]}>
            <Text style={styles.iconText}>✉</Text>
          </View>
          <Text style={styles.infoTitle}>Email Us</Text>
          <Text style={styles.infoText}>contact@company.com</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoCard} onPress={openPhone}>
          <View style={[styles.iconContainer, { backgroundColor: '#3182CE' }]}>
            <Text style={styles.iconText}>📞</Text>
          </View>
          <Text style={styles.infoTitle}>Call Us</Text>
          <Text style={styles.infoText}>+1 (234) 567-890</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoCard} onPress={openLocation}>
          <View style={[styles.iconContainer, { backgroundColor: '#805AD5' }]}>
            <Text style={styles.iconText}>📍</Text>
          </View>
          <Text style={styles.infoTitle}>Visit Us</Text>
          <Text style={styles.infoText}>123 Business Ave{'\n'}City, State 12345</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Send Us a Message</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="Enter your email address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            value={formData.subject}
            onChangeText={(text) => handleInputChange('subject', text)}
            placeholder="Enter message subject"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Message *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.message}
            onChangeText={(text) => handleInputChange('message', text)}
            placeholder="Enter your message here..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      {/* Business Hours */}
      <View style={styles.businessHours}>
        <Text style={styles.businessTitle}>Business Hours</Text>
        <View style={styles.hoursContainer}>
          <View style={styles.hourRow}>
            <Text style={styles.dayText}>Monday - Friday</Text>
            <Text style={styles.timeText}>9:00 AM - 6:00 PM</Text>
          </View>
          <View style={styles.hourRow}>
            <Text style={styles.dayText}>Saturday</Text>
            <Text style={styles.timeText}>10:00 AM - 4:00 PM</Text>
          </View>
          <View style={styles.hourRow}>
            <Text style={styles.dayText}>Sunday</Text>
            <Text style={styles.timeText}>Closed</Text>
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  contactInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  infoCard: {
    width: (width - 60) / 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 16,
  },
  formContainer: {
    backgroundColor: '#F7FAFC',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2D3748',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  businessHours: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  businessTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  hoursContainer: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 16,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dayText: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '600',
  },
});

export default ContactPage;