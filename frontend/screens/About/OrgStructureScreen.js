import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Footer from '../../components/Footer';

const { width } = Dimensions.get('window');

const OrganizationalStructure = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const organizationData = {
    ceo: {
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      department: "Executive",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 001-0001"
    },
    departments: [
      {
        id: 1,
        name: "Technology",
        head: "Michael Chen",
        headEmail: "michael.chen@company.com",
        color: "#3B82F6",
        employees: 45,
        teams: [
          { name: "Frontend Development", members: 12 },
          { name: "Backend Development", members: 15 },
          { name: "DevOps & Infrastructure", members: 8 },
          { name: "QA & Testing", members: 10 }
        ]
      },
      {
        id: 2,
        name: "Product Management",
        head: "Jennifer Liu",
        headEmail: "jennifer.liu@company.com",
        color: "#8B5CF6",
        employees: 18,
        teams: [
          { name: "Product Strategy", members: 6 },
          { name: "User Experience", members: 8 },
          { name: "Product Analytics", members: 4 }
        ]
      },
      {
        id: 3,
        name: "Marketing & Sales",
        head: "David Rodriguez",
        headEmail: "david.rodriguez@company.com",
        color: "#EF4444",
        employees: 32,
        teams: [
          { name: "Digital Marketing", members: 12 },
          { name: "Sales Operations", members: 15 },
          { name: "Customer Success", members: 5 }
        ]
      },
      {
        id: 4,
        name: "Human Resources",
        head: "Emma Thompson",
        headEmail: "emma.thompson@company.com",
        color: "#6366F1",
        employees: 12,
        teams: [
          { name: "Talent Acquisition", members: 4 },
          { name: "Employee Relations", members: 3 },
          { name: "Learning & Development", members: 3 },
          { name: "Compensation & Benefits", members: 2 }
        ]
      },
      {
        id: 5,
        name: "Finance & Operations",
        head: "Robert Kim",
        headEmail: "robert.kim@company.com",
        color: "#DC2626",
        employees: 24,
        teams: [
          { name: "Financial Planning", members: 8 },
          { name: "Operations Management", members: 10 },
          { name: "Legal & Compliance", members: 6 }
        ]
      }
    ]
  };

  const totalEmployees = organizationData.departments.reduce((sum, dept) => sum + dept.employees, 0) + 1;

  const handleDepartmentPress = (departmentId) => {
    setSelectedDepartment(selectedDepartment === departmentId ? null : departmentId);
  };

  const renderCEOCard = () => (
    <View style={styles.ceoCard}>
      <View style={styles.ceoHeader}>
        <View style={styles.ceoAvatar}>
          <Text style={styles.avatarText}>SJ</Text>
        </View>
        <View style={styles.ceoInfo}>
          <Text style={styles.ceoName}>{organizationData.ceo.name}</Text>
          <Text style={styles.ceoPosition}>{organizationData.ceo.position}</Text>
        </View>
      </View>
      <View style={styles.ceoContact}>
        <Text style={styles.contactText}>{organizationData.ceo.email}</Text>
        <Text style={styles.contactText}>{organizationData.ceo.phone}</Text>
      </View>
    </View>
  );

  const renderDepartmentCard = (department) => {
    const isExpanded = selectedDepartment === department.id;
    
    return (
      <TouchableOpacity
        key={department.id}
        style={styles.departmentCard}
        onPress={() => handleDepartmentPress(department.id)}
        activeOpacity={0.8}
      >
        <View style={[styles.departmentHeader, { borderLeftColor: department.color }]}>
          <View style={styles.departmentInfo}>
            <Text style={styles.departmentName}>{department.name}</Text>
            <Text style={styles.departmentHead}>Head: {department.head}</Text>
            <Text style={styles.employeeCount}>{department.employees} employees</Text>
          </View>
          <View style={[styles.expandIcon, { backgroundColor: department.color }]}>
            <Text style={styles.expandText}>{isExpanded ? '−' : '+'}</Text>
          </View>
        </View>
        
        {isExpanded && (
          <View style={styles.departmentDetails}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Department Head Contact:</Text>
              <Text style={styles.contactEmail}>{department.headEmail}</Text>
            </View>
            
            <View style={styles.teamsSection}>
              <Text style={styles.teamsTitle}>Teams & Members:</Text>
              {department.teams.map((team, index) => (
                <View key={index} style={styles.teamRow}>
                  <View style={[styles.teamDot, { backgroundColor: department.color }]} />
                  <Text style={styles.teamName}>{team.name}</Text>
                  <Text style={styles.teamMembers}>({team.members})</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Organizational Structure</Text>
          <Text style={styles.subtitle}>Company Overview & Departments</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalEmployees}</Text>
              <Text style={styles.statLabel}>Total Employees</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{organizationData.departments.length}</Text>
              <Text style={styles.statLabel}>Departments</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Executive Leadership</Text>
          {renderCEOCard()}

          <Text style={styles.sectionTitle}>Department Structure</Text>
          <Text style={styles.sectionSubtitle}>Tap on any department to view detailed information</Text>
          
          {organizationData.departments.map(renderDepartmentCard)}
        </View>
              <Footer />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0F172A',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 25,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  statLabel: {
    fontSize: 14,
    color: '#CBD5E1',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    marginTop: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  ceoCard: {
    backgroundColor: '#334155',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ceoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ceoAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ceoInfo: {
    flex: 1,
  },
  ceoName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  ceoPosition: {
    fontSize: 16,
    color: '#CBD5E1',
  },
  ceoContact: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#475569',
  },
  contactText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  departmentCard: {
    backgroundColor: '#334155',
    borderRadius: 15,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  departmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderLeftWidth: 4,
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  departmentHead: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 4,
  },
  employeeCount: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  expandIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  departmentDetails: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#2D3748',
  },
  contactInfo: {
    marginBottom: 20,
    paddingTop: 15,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 6,
  },
  contactEmail: {
    fontSize: 14,
    color: '#94A3B8',
  },
  teamsSection: {
    marginTop: 10,
  },
  teamsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  teamDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    color: '#E5E7EB',
    fontWeight: '500',
  },
  teamMembers: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
});

export default OrganizationalStructure;