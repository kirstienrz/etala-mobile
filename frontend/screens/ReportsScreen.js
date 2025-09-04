import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert
} from "react-native";
import Footer from '../components/Footer';

const SAMPLE_REPORTS = [
  {
    id: 1,
    title: "Gender Equality in Education 2024",
    category: "Education",
    publishDate: "Mar 2024",
    status: "Latest"
  },
  {
    id: 2,
    title: "Women's Economic Empowerment",
    category: "Economics",
    publishDate: "Feb 2024",
    status: "Updated"
  },
  {
    id: 3,
    title: "Healthcare Access & Gender",
    category: "Healthcare",
    publishDate: "Jan 2024",
    status: "Archive"
  },
  {
    id: 4,
    title: "Political Participation Report",
    category: "Politics",
    publishDate: "Dec 2023",
    status: "Archive"
  },
  {
    id: 5,
    title: "Climate Change Impact",
    category: "Environment",
    publishDate: "Nov 2023",
    status: "Archive"
  },
  {
    id: 6,
    title: "Rural Women Development",
    category: "Economics",
    publishDate: "Oct 2023",
    status: "Archive"
  },
  {
    id: 7,
    title: "Digital Gender Divide",
    category: "Education",
    publishDate: "Sep 2023",
    status: "Archive"
  }
];

const CATEGORIES = ["All", "Education", "Economics", "Healthcare", "Politics", "Environment"];

export default function ReportsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reports] = useState(SAMPLE_REPORTS);

  const filteredReports = selectedCategory === "All" 
    ? reports 
    : reports.filter(report => report.category === selectedCategory);

  const handleReportPress = (report) => {
    Alert.alert(
      report.title,
      `Category: ${report.category}\nPublished: ${report.publishDate}`,
      [{ text: "Close", style: "cancel" }]
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Latest':
        return { backgroundColor: '#EF4444', color: '#FFFFFF' }; // Red
      case 'Updated':
        return { backgroundColor: '#3B82F6', color: '#FFFFFF' }; // Blue
      case 'Archive':
        return { backgroundColor: '#E5E7EB', color: '#6B7280' }; // Gray
      default:
        return { backgroundColor: '#8B5CF6', color: '#FFFFFF' }; // Purple
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reports</Text>
          <Text style={styles.subtitle}>Gender & Development Progress</Text>
        </View>

        {/* Category Filter */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContainer}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reports List */}
        <View style={styles.reportsContainer}>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <TouchableOpacity
                key={report.id}
                style={styles.reportCard}
                onPress={() => handleReportPress(report)}
                activeOpacity={0.8}
              >
                <View style={styles.reportHeader}>
                  <Text style={styles.reportTitle} numberOfLines={2}>
                    {report.title}
                  </Text>
                  <View 
                    style={[
                      styles.statusBadge, 
                      getStatusStyle(report.status)
                    ]}
                  >
                    <Text style={[
                      styles.statusText,
                      { color: getStatusStyle(report.status).color }
                    ]}>
                      {report.status}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.reportFooter}>
                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{report.category}</Text>
                  </View>
                  <Text style={styles.publishDate}>{report.publishDate}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No Reports Found</Text>
              <Text style={styles.emptyStateText}>
                No reports available for the selected category.
              </Text>
            </View>
          )}
        </View>

        {/* Bottom spacing for safe scrolling */}
        <View style={styles.bottomSpacing} />
            <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  filterContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  categoryScrollContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryButtonActive: {
    backgroundColor: "#8B5CF6", // Purple
    borderColor: "#8B5CF6",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  reportsContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  reportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    lineHeight: 18,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 50,
    alignItems: "center",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  reportFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTag: {
    backgroundColor: "#EBF4FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3B82F6", // Blue
  },
  categoryTagText: {
    fontSize: 10,
    color: "#3B82F6", // Blue
    fontWeight: "500",
  },
  publishDate: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  bottomSpacing: {
    height: 20,
  },
});