import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Footer from '../../components/Footer';

export default function OfficeOrdersScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const officeOrders = [
    {
      id: 1,
      orderNumber: "OO-GAD-2024-015",
      title: "Creation of Gender and Development Focal Point System",
      date: "March 25, 2024",
      effectiveDate: "April 01, 2024",
      category: "organizational",
      priority: "high",
      description: "Establishment of GAD focal points in all departments to ensure systematic implementation of gender mainstreaming activities.",
      signatoryName: "Director Maria Santos",
      signatoryTitle: "Executive Director",
      status: "active",
      attachments: 2
    },
    {
      id: 2,
      orderNumber: "OO-GAD-2024-014",
      title: "Designation of Committee Members for Safe Spaces Initiative",
      date: "March 20, 2024",
      effectiveDate: "March 25, 2024",
      category: "personnel",
      priority: "high",
      description: "Assignment of personnel to oversee the implementation of safe spaces for women and children in all office premises.",
      signatoryName: "Director Carlos Rivera",
      signatoryTitle: "Assistant Director",
      status: "active",
      attachments: 3
    },
    {
      id: 3,
      orderNumber: "OO-GAD-2024-013",
      title: "Implementation of Flexible Work Arrangements for Parents",
      date: "March 15, 2024",
      effectiveDate: "April 01, 2024",
      category: "policy",
      priority: "medium",
      description: "Guidelines for work-from-home and flexible scheduling options to support work-life balance for employees with caregiving responsibilities.",
      signatoryName: "Director Ana Lopez",
      signatoryTitle: "HR Director",
      status: "pending",
      attachments: 1
    },
    {
      id: 4,
      orderNumber: "OO-GAD-2024-012",
      title: "Annual Gender Audit and Assessment Protocol",
      date: "March 08, 2024",
      effectiveDate: "March 15, 2024",
      category: "administrative",
      priority: "medium",
      description: "Procedures for conducting comprehensive gender audits across all programs and services to measure GAD compliance and effectiveness.",
      signatoryName: "Director Robert Chen",
      signatoryTitle: "Planning Director",
      status: "active",
      attachments: 4
    },
    {
      id: 5,
      orderNumber: "OO-GAD-2024-011",
      title: "Establishment of Lactation Station Facilities",
      date: "February 28, 2024",
      effectiveDate: "March 15, 2024",
      category: "facilities",
      priority: "high",
      description: "Installation and maintenance of dedicated lactation rooms to support breastfeeding mothers in the workplace.",
      signatoryName: "Director Lisa Wong",
      signatoryTitle: "Facilities Manager",
      status: "completed",
      attachments: 2
    },
    {
      id: 6,
      orderNumber: "OO-GAD-2024-010",
      title: "Budget Allocation for GAD Programs FY 2024",
      date: "February 20, 2024",
      effectiveDate: "March 01, 2024",
      category: "financial",
      priority: "critical",
      description: "Official budget appropriation for Gender and Development programs including training, facilities improvement, and awareness campaigns.",
      signatoryName: "Director James Park",
      signatoryTitle: "Finance Director",
      status: "active",
      attachments: 5
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
      case 'active':
        return styles.activeStatus;
      case 'pending':
        return styles.pendingStatus;
      case 'completed':
        return styles.completedStatus;
      default:
        return styles.defaultStatus;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'organizational':
        return styles.organizationalCategory;
      case 'personnel':
        return styles.personnelCategory;
      case 'policy':
        return styles.policyCategory;
      case 'administrative':
        return styles.administrativeCategory;
      case 'facilities':
        return styles.facilitiesCategory;
      case 'financial':
        return styles.financialCategory;
      default:
        return styles.defaultCategory;
    }
  };

  const filteredOrders = officeOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.signatoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || order.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "priority") {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortBy === "number") {
      return b.orderNumber.localeCompare(a.orderNumber);
    }
    return 0;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBackground}>
          <Text style={styles.title}>Office Orders</Text>
          <Text style={styles.subtitle}>Gender and Development Directives</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.overviewSection}>
          <Text style={styles.overviewTitle}>Office Orders Management</Text>
          <Text style={styles.overviewText}>
            Office Orders serve as official directives for implementing specific Gender and 
            Development activities, assignments, and organizational changes. These legally 
            binding documents establish clear responsibilities, timelines, and procedures 
            for GAD program execution.
          </Text>
          
          <View style={styles.metricsContainer}>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>24</Text>
              <Text style={styles.metricLabel}>Total Orders</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>18</Text>
              <Text style={styles.metricLabel}>Active</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>4</Text>
              <Text style={styles.metricLabel}>Pending</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>2</Text>
              <Text style={styles.metricLabel}>Completed</Text>
            </View>
          </View>
        </View>

        <View style={styles.controlsSection}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search office orders..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.filtersRow}>
            <View style={styles.categoryFilter}>
              <Text style={styles.filterLabel}>Category:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterButtons}>
                  {["all", "organizational", "personnel", "policy", "administrative", "facilities", "financial"].map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.filterButton,
                        selectedCategory === category && styles.activeFilterButton
                      ]}
                      onPress={() => setSelectedCategory(category)}
                    >
                      <Text style={[
                        styles.filterButtonText,
                        selectedCategory === category && styles.activeFilterText
                      ]}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.sortContainer}>
              <Text style={styles.filterLabel}>Sort by:</Text>
              <View style={styles.sortButtons}>
                {[
                  { key: "date", label: "Date" },
                  { key: "priority", label: "Priority" },
                  { key: "number", label: "Order #" }
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
          </View>
        </View>

        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>
            Recent Office Orders ({sortedOrders.length})
          </Text>
          
          {sortedOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderHeaderLeft}>
                  <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  <View style={[styles.priorityBadge, getPriorityStyle(order.priority)]}>
                    <Text style={styles.priorityText}>{order.priority.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.orderHeaderRight}>
                  <View style={[styles.categoryBadge, getCategoryColor(order.category)]}>
                    <Text style={styles.categoryText}>{order.category.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.statusBadge, getStatusStyle(order.status)]}>
                    <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.orderTitle}>{order.title}</Text>
              
              <View style={styles.orderDetails}>
                <Text style={styles.orderDate}>Issued: {order.date}</Text>
                <Text style={styles.effectiveDate}>Effective: {order.effectiveDate}</Text>
                <Text style={styles.attachmentCount}>{order.attachments} attachment(s)</Text>
              </View>
              
              <Text style={styles.orderDescription}>{order.description}</Text>
              
              <View style={styles.signatorySection}>
                <Text style={styles.signatoryLabel}>Authorized by:</Text>
                <Text style={styles.signatoryName}>{order.signatoryName}</Text>
                <Text style={styles.signatoryTitle}>{order.signatoryTitle}</Text>
              </View>
              
              <View style={styles.orderActions}>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Order</Text>
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
    backgroundColor: "#dc2626", // Red
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
    color: "#fecaca",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  overviewSection: {
    backgroundColor: "#ede9fe", // Light purple
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#7c3aed", // Purple
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7c3aed", // Purple
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
    marginBottom: 20,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  metricCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  metricNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
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
  filtersRow: {
    gap: 15,
  },
  categoryFilter: {
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
    backgroundColor: "#7c3aed", // Purple
    borderColor: "#7c3aed",
  },
  filterButtonText: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#ffffff",
  },
  sortContainer: {
    marginBottom: 10,
  },
  sortButtons: {
    flexDirection: "row",
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  activeSortButton: {
    backgroundColor: "#3b82f6", // Blue
    borderColor: "#3b82f6",
  },
  sortButtonText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  activeSortText: {
    color: "#ffffff",
  },
  ordersSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 20,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  orderHeaderRight: {
    flexDirection: "row",
    gap: 8,
  },
  orderNumber: {
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
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#ffffff",
  },
  organizationalCategory: {
    backgroundColor: "#7c3aed", // Purple
  },
  personnelCategory: {
    backgroundColor: "#dc2626", // Red
  },
  policyCategory: {
    backgroundColor: "#3b82f6", // Blue
  },
  administrativeCategory: {
    backgroundColor: "#059669", // Green
  },
  facilitiesCategory: {
    backgroundColor: "#d97706", // Orange
  },
  financialCategory: {
    backgroundColor: "#be123c", // Deep red
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
  activeStatus: {
    backgroundColor: "#10b981", // Green
  },
  pendingStatus: {
    backgroundColor: "#f59e0b", // Orange
  },
  completedStatus: {
    backgroundColor: "#6b7280", // Gray
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
    lineHeight: 24,
  },
  orderDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 13,
    color: "#6b7280",
  },
  effectiveDate: {
    fontSize: 13,
    color: "#dc2626", // Red
    fontWeight: "500",
  },
  attachmentCount: {
    fontSize: 13,
    color: "#7c3aed", // Purple
    fontWeight: "500",
  },
  orderDescription: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 16,
  },
  signatorySection: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  signatoryLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  signatoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  signatoryTitle: {
    fontSize: 13,
    color: "#7c3aed", // Purple
    fontStyle: "italic",
  },
  orderActions: {
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
  quickLinksSection: {
    marginTop: 20,
  },
  quickLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  quickLinkCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 18,
    width: "47%",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  quickLinkTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 6,
  },
  quickLinkDesc: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },
});