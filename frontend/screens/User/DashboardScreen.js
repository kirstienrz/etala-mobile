import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dashboard = ({ navigation }) => {
  const { user, loading } = useSelector((state) => state.auth);

  const quickLinks = [
    {
      id: 1,
      title: 'My Activity',
      icon: 'timeline',
      subtitle: 'View your recent activities',
      onPress: () => navigation.navigate('MyActivity'),
    },
    {
      id: 2,
      title: 'Notifications',
      icon: 'notifications',
      subtitle: 'Check your messages',
      badge: 3, // Example notification count
      onPress: () => navigation.navigate('Notifications'),
    },
  ];

  const exclusiveTools = [
    {
      id: 1,
      title: 'Reports & Forms',
      icon: 'assignment',
      subtitle: 'Submit GAD reports and forms',
      color: '#10B981',
      onPress: () => navigation.navigate('ReportsAndForms'),
    },
    {
      id: 2,
      title: 'Document Upload',
      icon: 'cloud-upload',
      subtitle: 'Upload documents & artworks',
      color: '#3B82F6',
      onPress: () => navigation.navigate('DocumentUpload'),
    },
    {
      id: 3,
      title: 'Bookings & Requests',
      icon: 'event',
      subtitle: 'Make appointments and requests',
      color: '#F59E0B',
      onPress: () => navigation.navigate('BookingsRequests'),
    },
    {
      id: 4,
      title: 'GAD Resources',
      icon: 'library-books',
      subtitle: 'Access learning materials',
      color: '#EF4444',
      onPress: () => navigation.navigate('GADResources'),
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Form Submission',
      description: 'GAD Activity Report submitted successfully',
      time: '2 hours ago',
      icon: 'check-circle',
      color: '#10B981',
    },
    {
      id: 2,
      title: 'Document Uploaded',
      description: 'Training certificate uploaded',
      time: '1 day ago',
      icon: 'cloud-done',
      color: '#3B82F6',
    },
    {
      id: 3,
      title: 'Booking Confirmed',
      description: 'Gender sensitivity training session',
      time: '3 days ago',
      icon: 'event-available',
      color: '#8B5CF6',
    },
  ];

  // Helper function to get the full name
  const getFullName = (user) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.name || user?.firstName || 'User';
  };

  // Helper function to get avatar initial
  const getAvatarInitial = (user) => {
    const fullName = getFullName(user);
    return fullName.charAt(0).toUpperCase();
  };

  // Helper function to get user department/position
  const getUserPosition = (user) => {
    return user?.department || user?.position || 'Student';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>
              {getFullName(user)}
            </Text>
            <Text style={styles.userPosition}>
              {getUserPosition(user)}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
          >
            {user?.avatar?.url ? (
              <Image 
                source={{ uri: user.avatar.url }} 
                style={styles.avatarImage}
                onError={(error) => console.warn('Avatar image error:', error)}
              />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {getAvatarInitial(user)}
                </Text>
              </View>
            )}
            <View style={styles.statusIndicator} />
          </TouchableOpacity>
        </View>

        {/* Quick Links Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickLinksContainer}>
            {quickLinks.map((link) => (
              <TouchableOpacity
                key={link.id}
                style={styles.quickLinkCard}
                onPress={link.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.quickLinkIconContainer}>
                  <Icon 
                    name={link.icon} 
                    size={24} 
                    color="#8B5CF6" 
                  />
                  {link.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{link.badge}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.quickLinkContent}>
                  <Text style={styles.quickLinkText}>{link.title}</Text>
                  <Text style={styles.quickLinkSubtitle}>{link.subtitle}</Text>
                </View>
                <Icon 
                  name="chevron-right" 
                  size={20} 
                  color="#9CA3AF" 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Exclusive Tools Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GAD Tools & Services</Text>
          <View style={styles.toolsGrid}>
            {exclusiveTools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={styles.toolCard}
                onPress={tool.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.toolIconContainer, { backgroundColor: `${tool.color}15` }]}>
                  <Icon 
                    name={tool.icon} 
                    size={28} 
                    color={tool.color} 
                  />
                </View>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolSubtitle}>{tool.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyActivity')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityContainer}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={[styles.activityIcon, { backgroundColor: `${activity.color}15` }]}>
                  <Icon 
                    name={activity.icon} 
                    size={20} 
                    color={activity.color} 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* GAD Announcements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GAD Announcements</Text>
          <View style={styles.announcementCard}>
            <View style={styles.announcementHeader}>
              <Icon name="campaign" size={20} color="#F59E0B" />
              <Text style={styles.announcementDate}>Today</Text>
            </View>
            <Text style={styles.announcementTitle}>
              Gender Sensitivity Training Workshop
            </Text>
            <Text style={styles.announcementText}>
              Join us for a comprehensive gender sensitivity training workshop. Registration is now open for all members.
            </Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  userPosition: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  avatarContainer: {
    position: 'relative',
    marginLeft: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#8B5CF6',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  quickLinksContainer: {
    gap: 12,
  },
  quickLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  quickLinkIconContainer: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickLinkContent: {
    flex: 1,
  },
  quickLinkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  quickLinkSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  toolIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  toolSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 14,
  },
  activityContainer: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  announcementCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  announcementText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
});

export default Dashboard;