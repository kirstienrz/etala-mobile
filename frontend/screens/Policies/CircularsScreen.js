import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Footer from '../../components/Footer';

export default function CircularsScreen() {
  const circulars = [
    {
      id: 1,
      title: "Gender Equality in Workplace Policy",
      date: "March 15, 2024",
      description: "Guidelines for implementing gender-inclusive practices in professional environments.",
      priority: "high"
    },
    {
      id: 2,
      title: "Women's Rights and Development Framework",
      date: "February 28, 2024", 
      description: "Comprehensive framework for advancing women's rights and development initiatives.",
      priority: "medium"
    },
    {
      id: 3,
      title: "LGBTQ+ Inclusion Guidelines",
      date: "January 20, 2024",
      description: "Best practices for creating inclusive environments for LGBTQ+ individuals.",
      priority: "high"
    },
    {
      id: 4,
      title: "Gender-Based Violence Prevention",
      date: "December 10, 2023",
      description: "Strategies and protocols for preventing and addressing gender-based violence.",
      priority: "critical"
    }
  ];

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'critical':
        return styles.criticalBadge;
      case 'high':
        return styles.highBadge;
      case 'medium':
        return styles.mediumBadge;
      default:
        return styles.lowBadge;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBackground}>
          <Text style={styles.title}>Official Circulars</Text>
          <Text style={styles.subtitle}>Gender and Development Resources</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>About These Circulars</Text>
          <Text style={styles.infoText}>
            Access comprehensive policy documents, guidelines, and official communications 
            related to Gender and Development initiatives. These resources provide essential 
            information for implementing inclusive practices and promoting gender equality.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Publications</Text>
          
          {circulars.map((circular) => (
            <TouchableOpacity key={circular.id} style={styles.circularCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{circular.title}</Text>
                <View style={[styles.priorityBadge, getPriorityStyle(circular.priority)]}>
                  <Text style={styles.priorityText}>{circular.priority.toUpperCase()}</Text>
                </View>
              </View>
              <Text style={styles.cardDate}>{circular.date}</Text>
              <Text style={styles.cardDescription}>{circular.description}</Text>
              <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Document</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton}>
                  <Text style={styles.downloadButtonText}>Download PDF</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
    backgroundColor: "#6366f1", // Blue
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
    color: "#e0e7ff",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: "#faf5ff", // Light purple
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: "#8b5cf6", // Purple
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7c3aed", // Purple
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 20,
  },
  circularCard: {
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
    marginRight: 10,
  },
  cardDate: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: "row",
    gap: 10,
  },
  viewButton: {
    backgroundColor: "#dc2626", // Red
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  viewButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
  },
  downloadButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#dc2626", // Red
    flex: 1,
  },
  downloadButtonText: {
    color: "#dc2626", // Red
    fontWeight: "600",
    textAlign: "center",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  criticalBadge: {
    backgroundColor: "#dc2626", // Red
  },
  highBadge: {
    backgroundColor: "#7c3aed", // Purple
  },
  mediumBadge: {
    backgroundColor: "#3b82f6", // Blue
  },
  lowBadge: {
    backgroundColor: "#6b7280", // Gray
  },
  categorySection: {
    marginTop: 20,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  categoryCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 20,
    width: "47%",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 5,
  },
  categoryCount: {
    fontSize: 14,
    color: "#64748b",
  },
});