import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const NotificationsScreen = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'workshop',
      title: 'Gender Equality Workshop Tomorrow',
      description: 'Join us for an interactive workshop on gender equality in STEM fields.',
      time: '2 hours ago',
      unread: true,
      icon: '📚',
      category: 'education'
    },
    {
      id: 2,
      type: 'policy',
      title: 'New GAD Policy Updates',
      description: 'Important updates to the Gender and Development policies have been published.',
      time: '4 hours ago',
      unread: true,
      icon: '📋',
      category: 'announcement'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Essay Submission Approved',
      description: 'Your essay on gender perspectives in literature has been approved with excellent remarks.',
      time: '1 day ago',
      unread: false,
      icon: '✅',
      category: 'academic'
    },
    {
      id: 4,
      type: 'event',
      title: 'GAD Club Meeting Reminder',
      description: 'Don\'t forget about the GAD club meeting this Friday at 3:00 PM in Room 205.',
      time: '1 day ago',
      unread: false,
      icon: '📅',
      category: 'event'
    },
    {
      id: 5,
      type: 'deadline',
      title: 'Certificate Submission Due',
      description: 'Submit your gender sensitivity training certificates by Friday, March 15th.',
      time: '2 days ago',
      unread: false,
      icon: '⏰',
      category: 'deadline'
    },
    {
      id: 6,
      type: 'welcome',
      title: 'Welcome to GAD Program',
      description: 'Welcome to the Gender and Development program! Explore resources and connect with peers.',
      time: '1 week ago',
      unread: false,
      icon: '🎉',
      category: 'general'
    }
  ]);

  const markAsRead = (id) => {
    // In a real app, this would update the notification status
    console.log(`Marking notification ${id} as read`);
  };

  const renderNotification = (notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationItem,
        notification.unread && styles.unreadNotification
      ]}
      onPress={() => markAsRead(notification.id)}
    >
      <View style={styles.notificationContent}>
        <View style={[
          styles.iconContainer,
          notification.unread && styles.unreadIconContainer
        ]}>
          <Text style={styles.notificationIcon}>{notification.icon}</Text>
        </View>
        
        <View style={styles.notificationInfo}>
          <View style={styles.notificationHeader}>
            <Text style={[
              styles.notificationTitle,
              notification.unread && styles.unreadTitle
            ]}>
              {notification.title}
            </Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
          
          <Text style={[
            styles.notificationDescription,
            notification.unread && styles.unreadDescription
          ]}>
            {notification.description}
          </Text>
          
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>
              {notification.category.charAt(0).toUpperCase() + notification.category.slice(1)}
            </Text>
          </View>
        </View>
        
        {notification.unread && <View style={styles.unreadIndicator} />}
      </View>
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} unread</Text>
          )}
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.notificationsList}
        contentContainerStyle={styles.notificationsContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length > 0 ? (
          notifications.map(renderNotification)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔔</Text>
            <Text style={styles.emptyStateText}>No notifications</Text>
            <Text style={styles.emptyStateSubtext}>
              You have no notifications at the moment
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 4,
  },
  unreadCount: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  unreadNotification: {
    backgroundColor: '#FDFCFF',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  unreadIconContainer: {
    backgroundColor: '#EDE9FE',
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  unreadDescription: {
    color: '#374151',
    fontWeight: '500',
  },
  categoryContainer: {
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '500',
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C3AED',
    marginLeft: 8,
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default NotificationsScreen;