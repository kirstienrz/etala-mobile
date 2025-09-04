import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Footer from '../../components/Footer';

export default function MemorandaScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const memoranda = [
    {
      id: 1,
      number: "MEMO-GAD-2024-001",
      title: "Implementation of Gender-Responsive Budgeting Guidelines",
      date: "March 22, 2024",
      department: "Finance Department",
      description: "Directive on integrating gender considerations into budget planning and allocation processes.",
      status: "active",
      type: "policy"
    },
    {
      id: 2,
      number: "MEMO-GAD-2024-002",
      title: "Establishment of Safe Spaces Committee",
      date: "March 18, 2024",
      department: "Human Resources",
      description: "Formation of committees to ensure safe and inclusive environments for all employees.",
      status: "active",
      type: "administrative"
    },
    {
      id: 3,
      number: "MEMO-GAD-2024-003",
      title: "Gender Sensitivity Training Schedule",
      date: "March 10, 2024",
      department: "Learning & Development",
      description: "Mandatory training sessions on gender sensitivity and awareness for all staff members.",
      status: "pending",
      type: "training"
    },
    {
      id: 4,
      number: "MEMO-GAD-2024-004",
      title: "Parental Leave Policy Updates",
      date: "February 28, 2024",
      department: "Human Resources",
      description: "Enhanced parental leave benefits and procedures for all employees regardless of gender.",
      status: "active",
      type: "policy"
    },
    {
      id: 5,
      number: "MEMO-GAD-2024-005",
      title: "Anti-Harassment Protocol Review",
      date: "February 15, 2024",
      department: "Legal Affairs",
      description: "Updated procedures for reporting and addressing workplace harassment incidents.",
      status: "archived",
      type: "policy"
    }
  ];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'active':
        return styles.activeStatus;
      case 'pending':
        return styles.pendingStatus;
      case 'archived':
        return styles.archivedStatus;
      default:
        return styles.defaultStatus;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'policy':
        return styles.policyType;
      case 'administrative':
        return styles.adminType;
      case 'training':
        return styles.trainingType;
      default:
        return styles.defaultType;
    }
  };

  const filteredMemolanda = memoranda.filter(memo => {
    const matchesSearch = memo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memo.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memo.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || memo.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBackground}>
          <Text style={styles.title}>Official Memoranda</Text>
          <Text style={styles.subtitle}>Gender and Development Directives</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Memoranda Overview</Text>
          <Text style={styles.summaryText}>
            Official memoranda serve as formal communications for implementing Gender and 
            Development policies, procedures, and initiatives across all departments. These 
            documents provide clear directives and guidelines to ensure consistent implementation 
            of GAD programs throughout the organization.
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Total Memoranda</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </View>

        <View style={styles.controlsSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search memoranda..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Filter by Status:</Text>
            <View style={styles.filterButtons}>
              {["all", "active", "pending", "archived"].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter && styles.activeFilterButton
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    selectedFilter === filter && styles.activeFilterText
                  ]}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.memorandaSection}>
          <Text style={styles.sectionTitle}>
            Recent Memoranda ({filteredMemolanda.length})
          </Text>
          
          {filteredMemolanda.map((memo) => (
            <View key={memo.id} style={styles.memoCard}>
              <View style={styles.memoHeader}>
                <View style={styles.memoTitleContainer}>
                  <Text style={styles.memoNumber}>{memo.number}</Text>
                  <View style={[styles.statusBadge, getStatusStyle(memo.status)]}>
                    <Text style={styles.statusText}>{memo.status.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={[styles.typeBadge, getTypeColor(memo.type)]}>
                  <Text style={styles.typeText}>{memo.type.toUpperCase()}</Text>
                </View>
              </View>
              
              <Text style={styles.memoTitle}>{memo.title}</Text>
              <Text style={styles.memoDepartment}>Issued by: {memo.department}</Text>
              <Text style={styles.memoDate}>Date: {memo.date}</Text>
              <Text style={styles.memoDescription}>{memo.description}</Text>
              
              <View style={styles.memoActions}>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Full Text</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton}>
                  <Text style={styles.downloadButtonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#7c3aed", // Purple
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#e9d5ff",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  summarySection: {
    backgroundColor: "#fef3f2", // Light red/pink
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626", // Red
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dc2626", // Red
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  controlsSection: {
    marginBottom: 25,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  activeFilterButton: {
    backgroundColor: "#3b82f6", // Blue
    borderColor: "#3b82f6",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#ffffff",
  },
  memorandaSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 20,
  },
  memoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  memoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  memoTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  memoNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
  },
  activeStatus: {
    backgroundColor: "#10b981", // Green
  },
  pendingStatus: {
    backgroundColor: "#f59e0b", // Orange
  },
  archivedStatus: {
    backgroundColor: "#6b7280", // Gray
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
  },
  policyType: {
    backgroundColor: "#7c3aed", // Purple
  },
  adminType: {
    backgroundColor: "#3b82f6", // Blue
  },
  trainingType: {
    backgroundColor: "#dc2626", // Red
  },
  memoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    lineHeight: 24,
  },
  memoDepartment: {
    fontSize: 14,
    color: "#7c3aed", // Purple
    fontWeight: "500",
    marginBottom: 4,
  },
  memoDate: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  memoDescription: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 16,
  },
  memoActions: {
    flexDirection: "row",
    gap: 10,
  },
  viewButton: {
    backgroundColor: "#dc2626", // Red
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  viewButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
  downloadButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#7c3aed", // Purple
    flex: 1,
  },
  downloadButtonText: {
    color: "#7c3aed", // Purple
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
  shareButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#3b82f6", // Blue
    flex: 1,
  },
  shareButtonText: {
    color: "#3b82f6", // Blue
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
  quickAccessSection: {
    marginTop: 20,
  },
  quickAccessGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  quickAccessCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 18,
    width: "47%",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  quickAccessTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 6,
  },
  quickAccessCount: {
    fontSize: 13,
    color: "#64748b",
  },
});