import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Footer from '../../components/Footer';

const { width } = Dimensions.get('window');

const GADCommitteePage = () => {
  const committees = [
    {
      name: 'Executive Committee',
      description: 'Provides overall leadership and strategic direction for GAD initiatives',
      chairperson: 'Dr. Maria Elena Santos',
      members: [
        { name: 'Dr. Maria Elena Santos', position: 'Chairperson', department: 'Human Resources', experience: '8 years' },
        { name: 'Prof. Juan Carlos Rivera', position: 'Vice-Chair', department: 'Academic Affairs', experience: '6 years' },
        { name: 'Ms. Ana Cristina Lopez', position: 'Secretary', department: 'Administrative Services', experience: '5 years' },
      ],
      color: '#DC2626',
      lightColor: '#FEE2E2',
      cardBg: '#FECACA'
    },
    {
      name: 'Planning & Development Committee',
      description: 'Develops comprehensive GAD plans, programs, and strategic initiatives',
      chairperson: 'Prof. Roberto Mendoza',
      members: [
        { name: 'Prof. Roberto Mendoza', position: 'Committee Head', department: 'Planning Office', experience: '10 years' },
        { name: 'Dr. Carmen Reyes', position: 'Senior Planner', department: 'Research & Development', experience: '7 years' },
        { name: 'Ms. Jennifer Tan', position: 'Program Coordinator', department: 'Student Affairs', experience: '4 years' },
        { name: 'Mr. Michael Santos', position: 'Data Analyst', department: 'Information Systems', experience: '3 years' },
      ],
      color: '#7C3AED',
      lightColor: '#EDE9FE',
      cardBg: '#DDD6FE'
    },
    {
      name: 'Training & Education Committee',
      description: 'Implements capacity building programs and educational initiatives on gender issues',
      chairperson: 'Dr. Lisa Wang-Cruz',
      members: [
        { name: 'Dr. Lisa Wang-Cruz', position: 'Training Director', department: 'Human Resource Development', experience: '9 years' },
        { name: 'Prof. David Emmanuel', position: 'Curriculum Specialist', department: 'Education', experience: '12 years' },
        { name: 'Ms. Sarah Johnson', position: 'Workshop Facilitator', department: 'Training Center', experience: '6 years' },
        { name: 'Mr. Antonio Garcia', position: 'Materials Developer', department: 'Learning Resources', experience: '5 years' },
        { name: 'Dr. Patricia Kim', position: 'Assessment Coordinator', department: 'Quality Assurance', experience: '8 years' },
      ],
      color: '#B91C1C',
      lightColor: '#FEF2F2',
      cardBg: '#FECACA'
    },
    {
      name: 'Advocacy & Communication Committee',
      description: 'Promotes gender awareness through various communication channels and advocacy campaigns',
      chairperson: 'Ms. Rachel Torres',
      members: [
        { name: 'Ms. Rachel Torres', position: 'Communications Head', department: 'Public Affairs', experience: '7 years' },
        { name: 'Mr. James Rodriguez', position: 'Media Specialist', department: 'Marketing', experience: '5 years' },
        { name: 'Ms. Angela Villanueva', position: 'Social Media Manager', department: 'Digital Communications', experience: '4 years' },
        { name: 'Prof. Martin Cruz', position: 'Content Strategist', department: 'Mass Communication', experience: '11 years' },
      ],
      color: '#9333EA',
      lightColor: '#F3E8FF',
      cardBg: '#E9D5FF'
    },
    {
      name: 'Research & Evaluation Committee',
      description: 'Conducts research on gender-related issues and evaluates GAD program effectiveness',
      chairperson: 'Dr. Andrew Chen',
      members: [
        { name: 'Dr. Andrew Chen', position: 'Research Director', department: 'Research Institute', experience: '15 years' },
        { name: 'Dr. Maria Gonzales', position: 'Senior Researcher', department: 'Social Sciences', experience: '12 years' },
        { name: 'Ms. Stephanie Lee', position: 'Data Coordinator', department: 'Statistics Office', experience: '6 years' },
        { name: 'Mr. Carlos Mendez', position: 'Field Researcher', department: 'Community Studies', experience: '4 years' },
      ],
      color: '#EF4444',
      lightColor: '#FEF2F2',
      cardBg: '#FCA5A5'
    },
    {
      name: 'Community Engagement Committee',
      description: 'Builds partnerships and engages with external stakeholders and community groups',
      chairperson: 'Ms. Diana Pascual',
      members: [
        { name: 'Ms. Diana Pascual', position: 'Community Relations Head', department: 'External Affairs', experience: '8 years' },
        { name: 'Mr. Luis Fernando', position: 'Partnership Coordinator', department: 'Extension Services', experience: '6 years' },
        { name: 'Ms. Grace Morales', position: 'Volunteer Coordinator', department: 'Community Outreach', experience: '5 years' },
      ],
      color: '#8B5CF6',
      lightColor: '#F5F3FF',
      cardBg: '#C4B5FD'
    }
  ];

  const renderCommitteeMember = (member, index, committee) => (
    <View key={index} style={styles.memberItem}>
      <View style={[styles.memberAvatar, { backgroundColor: committee.color }]}>
        <Text style={styles.avatarText}>{member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</Text>
      </View>
      <View style={styles.memberDetails}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={[styles.memberPosition, { color: committee.color }]}>{member.position}</Text>
        <Text style={styles.memberDepartment}>{member.department}</Text>
        <Text style={styles.memberExperience}>Experience: {member.experience}</Text>
      </View>
    </View>
  );

  const renderCommitteeCard = (committee, index) => (
    <View key={index} style={[styles.committeeCard, { borderTopColor: committee.color, backgroundColor: committee.cardBg }]}>
      <View style={[styles.committeeHeader, { backgroundColor: committee.lightColor }]}>
        <Text style={[styles.committeeName, { color: committee.color }]}>{committee.name}</Text>
      </View>
      
      <View style={styles.committeeContent}>
        <Text style={styles.committeeDescription}>{committee.description}</Text>
        
        <View style={styles.chairpersonSection}>
          <Text style={styles.sectionLabel}>Committee Chairperson:</Text>
          <Text style={[styles.chairpersonName, { color: committee.color }]}>{committee.chairperson}</Text>
        </View>

        <View style={styles.membersSection}>
          <Text style={styles.sectionLabel}>Committee Members ({committee.members.length}):</Text>
          <View style={styles.membersList}>
            {committee.members.map((member, idx) => renderCommitteeMember(member, idx, committee))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GAD Committees</Text>
        <Text style={styles.headerSubtitle}>Gender and Development Committee Structure</Text>
        <Text style={styles.headerDescription}>
          Our GAD committee structure ensures comprehensive coverage of gender and 
          development initiatives across all organizational levels and functions.
        </Text>
      </View>

      {/* Overview Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Committees</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Years Active</Text>
          </View>
        </View>
      </View>

      {/* Committees Section */}
      <View style={styles.committeesSection}>
        <Text style={styles.sectionTitle}>Committee Details</Text>
        <View style={styles.committeesContainer}>
          {committees.map(renderCommitteeCard)}
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Join a Committee</Text>
          <Text style={styles.contactDescription}>
            Interested in contributing to our GAD initiatives? We welcome new members 
            who are passionate about gender equality and inclusive development.
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Express Interest</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D1B69', // Deep purple background
  },
  header: {
    backgroundColor: '#1E1B4B',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCF7FF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#E9D5FF',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  headerDescription: {
    fontSize: 16,
    color: '#E9D5FF',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4C1D95',
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#6B46C1',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E9D5FF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#C4B5FD',
    fontWeight: '600',
  },
  committeesSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E9D5FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  committeesContainer: {
    gap: 20,
  },
  committeeCard: {
    borderRadius: 16,
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  committeeHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  committeeName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  committeeContent: {
    padding: 20,
  },
  committeeDescription: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  chairpersonSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  chairpersonName: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  membersSection: {
    marginBottom: 20,
  },
  membersList: {
    gap: 12,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 245, 255, 0.8)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FCF7FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  memberPosition: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 1,
  },
  memberDepartment: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  memberExperience: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  contactSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  contactCard: {
    backgroundColor: '#FEE2E2',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DC2626',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B91C1C',
    marginBottom: 12,
    textAlign: 'center',
  },
  contactDescription: {
    fontSize: 16,
    color: '#7F1D1D',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FCF7FF',
  },
});

export default GADCommitteePage;