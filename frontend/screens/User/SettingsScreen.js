import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    biometric: false,
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => dispatch(logoutUser())
        },
      ]
    );
  };

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'Contact us at support@example.com');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'View our privacy policy in the app store or website.');
  };

  const handleAbout = () => {
    Alert.alert('About', 'App Version 1.0.0\nDeveloped with React Native');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.preferenceItem}
              onPress={() => togglePreference('notifications')}
              activeOpacity={0.7}
            >
              <Icon name="notifications" size={18} color="#8B5CF6" />
              <Text style={styles.itemText}>Push Notifications</Text>
              <View style={[styles.toggle, preferences.notifications && styles.toggleActive]}>
                <View style={[styles.toggleThumb, preferences.notifications && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.preferenceItem}
              onPress={() => togglePreference('darkMode')}
              activeOpacity={0.7}
            >
              <Icon name="dark-mode" size={18} color="#8B5CF6" />
              <Text style={styles.itemText}>Dark Mode</Text>
              <View style={[styles.toggle, preferences.darkMode && styles.toggleActive]}>
                <View style={[styles.toggleThumb, preferences.darkMode && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.preferenceItem, styles.lastItem]}
              onPress={() => togglePreference('biometric')}
              activeOpacity={0.7}
            >
              <Icon name="fingerprint" size={18} color="#8B5CF6" />
              <Text style={styles.itemText}>Biometric Login</Text>
              <View style={[styles.toggle, preferences.biometric && styles.toggleActive]}>
                <View style={[styles.toggleThumb, preferences.biometric && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handleHelpSupport}
              activeOpacity={0.7}
            >
              <Icon name="help" size={18} color="#8B5CF6" />
              <Text style={styles.itemText}>Help & Support</Text>
              <Icon name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handlePrivacyPolicy}
              activeOpacity={0.7}
            >
              <Icon name="privacy-tip" size={18} color="#8B5CF6" />
              <Text style={styles.itemText}>Privacy Policy</Text>
              <Icon name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItem, styles.lastItem]} 
              onPress={handleAbout}
              activeOpacity={0.7}
            >
              <Icon name="info" size={18} color="#8B5CF6" />
              <Text style={styles.itemText}>About</Text>
              <Icon name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Icon name="logout" size={18} color="#EF4444" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerPlaceholder: {
    width: 30,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40, // Extra padding to avoid bottom nav
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    paddingLeft: 4,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
    marginLeft: 12,
  },
  toggle: {
    width: 42,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E5E7EB',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#8B5CF6',
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default SettingsScreen;