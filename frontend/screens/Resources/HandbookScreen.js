import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Footer from '../../components/Footer'

export default function HandbookScreen() {
  const handbookSections = [
    {
      title: "Gender Equality Principles",
      description: "Core principles and frameworks for promoting gender equality in development programs.",
      icon: "👥"
    },
    {
      title: "Policy Guidelines",
      description: "Comprehensive policy guidelines for integrating gender perspectives in all development initiatives.",
      icon: "📋"
    },
    {
      title: "Implementation Tools",
      description: "Practical tools and checklists for implementing gender-responsive development projects.",
      icon: "🔧"
    },
    {
      title: "Case Studies",
      description: "Real-world examples of successful gender and development interventions from various sectors.",
      icon: "📊"
    },
    {
      title: "Monitoring & Evaluation",
      description: "Methods and indicators for tracking progress on gender equality outcomes and impacts.",
      icon: "📈"
    },
    {
      title: "Resources & References",
      description: "Additional reading materials, research papers, and external resources on gender and development.",
      icon: "📚"
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Gender & Development</Text>
        <Text style={styles.subtitle}>Comprehensive Handbook & Guidelines</Text>
        <Text style={styles.description}>
          This handbook provides essential guidance for integrating gender perspectives 
          into development programs, ensuring inclusive and equitable outcomes for all beneficiaries.
        </Text>
      </View>

      <View style={styles.sectionsContainer}>
        <Text style={styles.sectionHeader}>Handbook Sections</Text>
        
        {handbookSections.map((section, index) => (
          <TouchableOpacity key={index} style={styles.sectionCard}>
            <View style={styles.cardIcon}>
              <Text style={styles.iconText}>{section.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{section.title}</Text>
              <Text style={styles.cardDescription}>{section.description}</Text>
            </View>
            <View style={styles.cardArrow}>
              <Text style={styles.arrowText}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.actionsHeader}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Download Complete Handbook</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Access Online Version</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tertiaryButton}>
          <Text style={styles.tertiaryButtonText}>View Latest Updates</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Last updated: September 2025 | Version 3.2
        </Text>
        <Text style={styles.footerNote}>
          For technical support or feedback, contact the Gender & Development team.
        </Text>
      </View>
            <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff", // Light blue-white background
  },
  header: {
    backgroundColor: "#6b46c1", // Deep purple
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#e0e7ff", // Light purple-white
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.9,
  },
  sectionsContainer: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginBottom: 20,
    textAlign: "center",
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#6b46c1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626", // Red accent
  },
  cardIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#ede9fe", // Light purple
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  cardArrow: {
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 20,
    color: "#6b46c1", // Purple
    fontWeight: "bold",
  },
  quickActions: {
    padding: 20,
    backgroundColor: "#fef7ff", // Very light purple
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  actionsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginBottom: 16,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#dc2626", // Red
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#2563eb", // Blue
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  tertiaryButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6b46c1", // Purple border
  },
  tertiaryButtonText: {
    color: "#6b46c1", // Purple
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    padding: 20,
    backgroundColor: "#f1f5f9",
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "500",
  },
  footerNote: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 18,
  },
});