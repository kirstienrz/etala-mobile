import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Footer from '../../components/Footer';

export default function ResolutionsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showArchived, setShowArchived] = useState(false);

  const resolutions = [
    {
      id: 1,
      resolutionNumber: "RES-GAD-2024-08",
      title: "Strengthening Gender-Responsive Governance in Public Service",
      date: "March 28, 2024",
      adoptedDate: "April 05, 2024",
      type: "policy",
      scope: "institutional",
      priority: "high",
      description: "Resolution establishing comprehensive guidelines for integrating gender perspectives into all governance processes, decision-making, and public service delivery mechanisms.",
      sponsor: "Committee on Gender and Development",
      coSponsors: ["HR Committee", "Policy Review Board"],
      votingResult: { favor: 18, against: 0, abstain: 2 },
      status: "adopted",
      implementationDeadline: "June 30, 2024",
      budgetAllocation: "₱2,500,000",
      attachments: 6
    },
    {
      id: 2,
      resolutionNumber: "RES-GAD-2024-07",
      title: "Establishment of Women's Economic Empowerment Program",
      date: "March 22, 2024",
      adoptedDate: "March 29, 2024",
      type: "program",
      scope: "community",
      priority: "critical",
      description: "Resolution creating a comprehensive program to support women entrepreneurs through skills training, microfinance, and market access initiatives.",
      sponsor: "Economic Development Committee",
      coSponsors: ["Women's Affairs Committee", "Finance Committee"],
      votingResult: { favor: 19, against: 1, abstain: 0 },
      status: "adopted",
      implementationDeadline: "May 15, 2024",
      budgetAllocation: "₱5,000,000",
      attachments: 4
    },
    {
      id: 3,
      resolutionNumber: "RES-GAD-2024-06",
      title: "Anti-Sexual Harassment Policy Enhancement",
      date: "March 15, 2024",
      adoptedDate: "March 22, 2024",
      type: "policy",
      scope: "workplace",
      priority: "critical",
      description: "Resolution updating and strengthening anti-sexual harassment policies with enhanced reporting mechanisms, investigation procedures, and victim support systems.",
      sponsor: "Legal Affairs Committee",
      coSponsors: ["HR Committee", "Ethics Committee"],
      votingResult: { favor: 20, against: 0, abstain: 0 },
      status: "adopted",
      implementationDeadline: "April 30, 2024",
      budgetAllocation: "₱800,000",
      attachments: 8
    },
    {
      id: 4,
      resolutionNumber: "RES-GAD-2024-05",
      title: "Gender-Inclusive Infrastructure Development Standards",
      date: "March 08, 2024",
      adoptedDate: "Pending",
      type: "standards",
      scope: "infrastructure",
      priority: "high",
      description: "Resolution establishing mandatory gender-inclusive design standards for all public infrastructure projects including accessibility, safety, and specific needs considerations.",
      sponsor: "Infrastructure Committee",
      coSponsors: ["Planning Committee"],
      votingResult: { favor: 15, against: 2, abstain: 3 },
      status: "under_review",
      implementationDeadline: "July 31, 2024",
      budgetAllocation: "₱1,200,000",
      attachments: 3
    },
    {
      id: 5,
      resolutionNumber: "RES-GAD-2024-04",
      title: "Comprehensive LGBTQ+ Rights and Protection Framework",
      date: "February 28, 2024",
      adoptedDate: "March 07, 2024",
      type: "rights",
      scope: "comprehensive",
      priority: "high",
      description: "Resolution establishing comprehensive protection mechanisms, anti-discrimination measures, and support services for LGBTQ+ community members.",
      sponsor: "Human Rights Committee",
      coSponsors: ["Legal Affairs Committee", "Health Committee"],
      votingResult: { favor: 17, against: 1, abstain: 2 },
      status: "adopted",
      implementationDeadline: "August 15, 2024",
      budgetAllocation: "₱3,200,000",
      attachments: 5
    },
    {
      id: 6,
      resolutionNumber: "RES-GAD-2024-03",
      title: "Mandatory Gender Impact Assessment Protocol",
      date: "February 20, 2024",
      adoptedDate: "February 27, 2024",
      type: "procedural",
      scope: "assessment",
      priority: "medium",
      description: "Resolution requiring gender impact assessments for all major policies, programs, and projects to ensure gender-responsive planning and implementation.",
      sponsor: "Planning Committee",
      coSponsors: ["GAD Committee"],
      votingResult: { favor: 16, against: 3, abstain: 1 },
      status: "implemented",
      implementationDeadline: "Completed",
      budgetAllocation: "₱600,000",
      attachments: 2
    }
  ];

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'critical':
        return styles.criticalPriority;
      case 'high':
        return styles.highPriority;
      case 'medium':
        return styles.mediumPriority;
      default:
        return styles.lowPriority;
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'adopted':
        return styles.adoptedStatus;
      case 'under_review':
        return styles.reviewStatus;
      case 'implemented':
        return styles.implementedStatus;
      case 'pending':
        return styles.pendingStatus;
      default:
        return styles.defaultStatus;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'policy':
        return styles.policyType;
      case 'program':
        return styles.programType;
      case 'standards':
        return styles.standardsType;
      case 'rights':
        return styles.rightsType;
      case 'procedural':
        return styles.proceduralType;
      default:
        return styles.defaultType;
    }
  };

  const filteredResolutions = resolutions.filter(resolution => {
    const matchesSearch = resolution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resolution.resolutionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resolution.sponsor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || resolution.type === selectedType;
    const matchesArchived = showArchived || resolution.status !== "archived";
    return matchesSearch && matchesType && matchesArchived;
  });

  const sortedResolutions = [...filteredResolutions].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "priority") {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBackground}>
          <Text style={styles.title}>Official Resolutions</Text>
          <Text style={styles.subtitle}>Gender Equality & Development</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Resolutions Dashboard</Text>
          <Text style={styles.summaryText}>
            Official resolutions represent formal decisions and commitments to advance 
            gender equality initiatives. These legally binding documents establish policies, 
            allocate resources, and mandate actions to promote inclusive and equitable 
            practices across all organizational levels.
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Total Resolutions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>22</Text>
              <Text style={styles.statLabel}>Adopted</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Under Review</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>Implemented</Text>
            </View>
          </View>

          <View style={styles.budgetSummary}>
            <Text style={styles.budgetTitle}>Total Budget Allocated</Text>
            <Text style={styles.budgetAmount}>₱13,300,000</Text>
            <Text style={styles.budgetNote}>Across active resolutions</Text>
          </View>
        </View>

        <View style={styles.controlsSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search resolutions..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.filtersRow}>
            <View style={styles.typeFilter}>
              <Text style={styles.filterLabel}>Type:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterButtons}>
                  {["all", "policy", "program", "standards", "rights", "procedural"].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.filterButton,
                        selectedType === type && styles.activeFilterButton
                      ]}
                      onPress={() => setSelectedType(type)}
                    >
                      <Text style={[
                        styles.filterButtonText,
                        selectedType === type && styles.activeFilterText
                      ]}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.sortAndToggleRow}>
              <View style={styles.sortContainer}>
                <Text style={styles.filterLabel}>Sort:</Text>
                <View style={styles.sortButtons}>
                  {[
                    { key: "date", label: "Date" },
                    { key: "priority", label: "Priority" },
                    { key: "status", label: "Status" }
                  ].map((sort) => (
                    <TouchableOpacity
                      key={sort.key}
                      style={[
                        styles.sortButton,
                        sortBy === sort.key && styles.activeSortButton
                      ]}
                      onPress={() => setSortBy(sort.key)}
                    >
                      <Text style={[
                        styles.sortButtonText,
                        sortBy === sort.key && styles.activeSortText
                      ]}>
                        {sort.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={[styles.toggleButton, showArchived && styles.toggleButtonActive]}
                onPress={() => setShowArchived(!showArchived)}
              >
                <Text style={[
                  styles.toggleButtonText,
                  showArchived && styles.toggleButtonTextActive
                ]}>
                  Show Archived
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.resolutionsSection}>
          <Text style={styles.sectionTitle}>
            Active Resolutions ({sortedResolutions.length})
          </Text>
          
          {sortedResolutions.map((resolution) => (
            <View key={resolution.id} style={styles.resolutionCard}>
              <View style={styles.resolutionHeader}>
                <View style={styles.resolutionHeaderLeft}>
                  <Text style={styles.resolutionNumber}>{resolution.resolutionNumber}</Text>
                  <View style={[styles.priorityBadge, getPriorityStyle(resolution.priority)]}>
                    <Text style={styles.priorityText}>{resolution.priority.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.resolutionHeaderRight}>
                  <View style={[styles.typeBadge, getTypeColor(resolution.type)]}>
                    <Text style={styles.typeText}>{resolution.type.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.statusBadge, getStatusStyle(resolution.status)]}>
                    <Text style={styles.statusText}>{resolution.status.replace('_', ' ').toUpperCase()}</Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.resolutionTitle}>{resolution.title}</Text>
              
              <View style={styles.resolutionMeta}>
                <Text style={styles.resolutionDate}>Filed: {resolution.date}</Text>
                <Text style={styles.adoptedDate}>
                  {resolution.adoptedDate === "Pending" ? "Pending Adoption" : `Adopted: ${resolution.adoptedDate}`}
                </Text>
                <Text style={styles.scopeInfo}>Scope: {resolution.scope}</Text>
              </View>
              
              <Text style={styles.resolutionDescription}>{resolution.description}</Text>
              
              <View style={styles.sponsorSection}>
                <Text style={styles.sponsorLabel}>Sponsored by:</Text>
                <Text style={styles.primarySponsor}>{resolution.sponsor}</Text>
                {resolution.coSponsors.length > 0 && (
                  <View style={styles.coSponsorsContainer}>
                    <Text style={styles.coSponsorsLabel}>Co-sponsors:</Text>
                    <Text style={styles.coSponsors}>{resolution.coSponsors.join(", ")}</Text>
                  </View>
                )}
              </View>

              <View style={styles.votingSection}>
                <Text style={styles.votingLabel}>Voting Results:</Text>
                <View style={styles.votingResults}>
                  <View style={styles.voteItem}>
                    <Text style={styles.voteCount}>{resolution.votingResult.favor}</Text>
                    <Text style={styles.voteLabel}>Favor</Text>
                  </View>
                  <View style={styles.voteItem}>
                    <Text style={styles.voteCount}>{resolution.votingResult.against}</Text>
                    <Text style={styles.voteLabel}>Against</Text>
                  </View>
                  <View style={styles.voteItem}>
                    <Text style={styles.voteCount}>{resolution.votingResult.abstain}</Text>
                    <Text style={styles.voteLabel}>Abstain</Text>
                  </View>
                </View>
              </View>

              <View style={styles.implementationSection}>
                <View style={styles.implementationRow}>
                  <Text style={styles.implementationLabel}>Implementation Deadline:</Text>
                  <Text style={[
                    styles.implementationValue,
                    resolution.implementationDeadline === "Completed" && styles.completedText
                  ]}>
                    {resolution.implementationDeadline}
                  </Text>
                </View>
                <View style={styles.implementationRow}>
                  <Text style={styles.implementationLabel}>Budget Allocated:</Text>
                  <Text style={styles.budgetValue}>{resolution.budgetAllocation}</Text>
                </View>
                <View style={styles.implementationRow}>
                  <Text style={styles.implementationLabel}>Attachments:</Text>
                  <Text style={styles.attachmentCount}>{resolution.attachments} document(s)</Text>
                </View>
              </View>
              
              <View style={styles.resolutionActions}>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Full Text</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton}>
                  <Text style={styles.downloadButtonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.trackButton}>
                  <Text style={styles.trackButtonText}>Track Progress</Text>
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
    backgroundColor: "#3b82f6", // Blue
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
    color: "#dbeafe",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  summarySection: {
    backgroundColor: "#dbeafe", // Light blue
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6", // Blue
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b82f6", // Blue
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    width: "48%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
  },
  budgetSummary: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  budgetTitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  budgetAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dc2626", // Red
    marginBottom: 4,
  },
  budgetNote: {
    fontSize: 12,
    color: "#9ca3af",
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
  filtersRow: {
    gap: 15,
  },
  typeFilter: {
    marginBottom: 15,
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
  },
  filterButton: {
    paddingHorizontal: 14,
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
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#ffffff",
  },
  sortAndToggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 15,
  },
  sortContainer: {
    flex: 1,
  },
  sortButtons: {
    flexDirection: "row",
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  activeSortButton: {
    backgroundColor: "#7c3aed", // Purple
    borderColor: "#7c3aed",
  },
  sortButtonText: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
  },
  activeSortText: {
    color: "#ffffff",
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  toggleButtonActive: {
    backgroundColor: "#dc2626", // Red
    borderColor: "#dc2626",
  },
  toggleButtonText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  toggleButtonTextActive: {
    color: "#ffffff",
  },
  resolutionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 20,
  },
  resolutionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  resolutionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  resolutionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  resolutionHeaderRight: {
    flexDirection: "row",
    gap: 8,
  },
  resolutionNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
  },
  criticalPriority: {
    backgroundColor: "#dc2626", // Red
  },
  highPriority: {
    backgroundColor: "#f59e0b", // Orange
  },
  mediumPriority: {
    backgroundColor: "#3b82f6", // Blue
  },
  lowPriority: {
    backgroundColor: "#6b7280", // Gray
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#ffffff",
  },
  policyType: {
    backgroundColor: "#7c3aed", // Purple
  },
  programType: {
    backgroundColor: "#dc2626", // Red
  },
  standardsType: {
    backgroundColor: "#3b82f6", // Blue
  },
  rightsType: {
    backgroundColor: "#059669", // Green
  },
  proceduralType: {
    backgroundColor: "#d97706", // Orange
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#ffffff",
  },
  adoptedStatus: {
    backgroundColor: "#10b981", // Green
  },
  reviewStatus: {
    backgroundColor: "#f59e0b", // Orange
  },
  implementedStatus: {
    backgroundColor: "#6366f1", // Indigo
  },
  pendingStatus: {
    backgroundColor: "#6b7280", // Gray
  },
  resolutionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
    lineHeight: 24,
  },
  resolutionMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 12,
  },
  resolutionDate: {
    fontSize: 13,
    color: "#6b7280",
  },
  adoptedDate: {
    fontSize: 13,
    color: "#10b981", // Green
    fontWeight: "500",
  },
  scopeInfo: {
    fontSize: 13,
    color: "#7c3aed", // Purple
    fontWeight: "500",
  },
  resolutionDescription: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 16,
  },
  sponsorSection: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  sponsorLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  primarySponsor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  coSponsorsContainer: {
    marginTop: 4,
  },
  coSponsorsLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  coSponsors: {
    fontSize: 13,
    color: "#7c3aed", // Purple
    fontStyle: "italic",
  },
  votingSection: {
    backgroundColor: "#f0f9ff", // Very light blue
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  votingLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
  },
  votingResults: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  voteItem: {
    alignItems: "center",
  },
  voteCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  voteLabel: {
    fontSize: 11,
    color: "#6b7280",
  },
  implementationSection: {
    backgroundColor: "#fef3f2", // Very light red
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  implementationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  implementationLabel: {
    fontSize: 12,
    color: "#6b7280",
    flex: 1,
  },
  implementationValue: {
    fontSize: 13,
    color: "#dc2626", // Red
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  completedText: {
    color: "#10b981", // Green
  },
  budgetValue: {
    fontSize: 13,
    color: "#dc2626", // Red
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  attachmentCount: {
    fontSize: 13,
    color: "#7c3aed", // Purple
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  resolutionActions: {
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
  trackButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#3b82f6", // Blue
    flex: 1,
  },
  trackButtonText: {
    color: "#3b82f6", // Blue
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
  quickActionsSection: {
    marginTop: 20,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  quickActionCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 18,
    width: "47%",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  quickActionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 6,
  },
  quickActionDesc: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },
});