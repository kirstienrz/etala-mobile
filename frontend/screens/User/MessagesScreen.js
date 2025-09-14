import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const MessagesScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [messages] = useState([
    {
      id: 1,
      name: 'Dr. Maria Santos',
      role: 'GAD Coordinator',
      lastMessage: 'Don\'t forget about tomorrow\'s workshop on gender equality in STEM fields.',
      time: '2:30 PM',
      unread: true,
      avatar: 'MS'
    },
    {
      id: 2,
      name: 'Student Council',
      role: 'Organization',
      lastMessage: 'New GAD policies have been implemented. Please review the updated guidelines.',
      time: '1:15 PM',
      unread: false,
      avatar: 'SC'
    },
    {
      id: 3,
      name: 'Prof. Juan Dela Cruz',
      role: 'Faculty',
      lastMessage: 'Your essay on gender perspectives in literature was excellent. Well done!',
      time: '11:45 AM',
      unread: true,
      avatar: 'JD'
    },
    {
      id: 4,
      name: 'Anna Rodriguez',
      role: 'Classmate',
      lastMessage: 'Are you joining the GAD club meeting this Friday?',
      time: 'Yesterday',
      unread: false,
      avatar: 'AR'
    },
    {
      id: 5,
      name: 'GAD Office',
      role: 'Administration',
      lastMessage: 'Reminder: Submit your gender sensitivity training certificates by Friday.',
      time: 'Yesterday',
      unread: false,
      avatar: 'GO'
    }
  ]);

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchText.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderAvatar = (avatar, unread) => (
    <View style={[styles.avatar, unread && styles.avatarUnread]}>
      <Text style={[styles.avatarText, unread && styles.avatarTextUnread]}>
        {avatar}
      </Text>
    </View>
  );

  const renderMessage = (message) => (
    <TouchableOpacity key={message.id} style={styles.messageItem}>
      <View style={styles.messageContent}>
        {renderAvatar(message.avatar, message.unread)}
        <View style={styles.messageInfo}>
          <View style={styles.messageHeader}>
            <Text style={[styles.messageName, message.unread && styles.unreadText]}>
              {message.name}
            </Text>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
          <Text style={styles.messageRole}>{message.role}</Text>
          <Text style={[styles.lastMessage, message.unread && styles.unreadMessage]} numberOfLines={2}>
            {message.lastMessage}
          </Text>
        </View>
        {message.unread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.composeButton}>
          <Text style={styles.composeButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Messages List */}
      <ScrollView 
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredMessages.length > 0 ? (
          filteredMessages.map(renderMessage)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No messages found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your search terms</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  composeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  composeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingBottom: 100, // Extra padding to prevent bottom nav overlap
  },
  messageItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarUnread: {
    backgroundColor: '#DDD6FE',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  avatarTextUnread: {
    color: '#7C3AED',
  },
  messageInfo: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  unreadText: {
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  messageTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  messageRole: {
    fontSize: 12,
    color: '#7C3AED',
    marginBottom: 4,
    fontWeight: '500',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  unreadMessage: {
    color: '#374151',
    fontWeight: '500',
  },
  unreadDot: {
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
    paddingTop: 60,
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
  },
});

export default MessagesScreen;