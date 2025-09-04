import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Footer from '../../components/Footer';

export default function Y2023Screen() {
  const programs = [
    {
      id: 1,
      title: "Women's Leadership Development Program",
      description: "A comprehensive 12-month program focused on developing leadership skills among women in various sectors.",
      participants: 150,
      budget: "$75,000",
      status: "Completed"
    },
    {
      id: 2,
      title: "Gender-Responsive Budgeting Initiative",
      description: "Training and implementation of gender-responsive budgeting practices across 15 government departments.",
      participants: 300,
      budget: "$120,000",
      status: "Completed"
    },
    {
      id: 3,
      title: "Youth Gender Awareness Campaign",
      description: "Educational campaign targeting young people aged 15-25 to promote gender equality and awareness.",
      participants: 2500,
      budget: "$65,000",
      status: "Completed"
    },
    {
      id: 4,
      title: "Women in STEM Mentorship Program",
      description: "Mentorship and scholarship program supporting women pursuing careers in science, technology, engineering, and mathematics.",
      participants: 85,
      budget: "$90,000",
      status: "Completed"
    }
  ];

  const statistics = {
    totalPrograms: 4,
    totalParticipants: 3035,
    totalBudget: "$350,000",
    successRate: "94%"
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gender & Development Programs</Text>
        <Text style={styles.year}>2023 Annual Review</Text>
        <Text style={styles.subtitle}>
          Comprehensive overview of our gender equality initiatives and their impact throughout 2023
        </Text>
      </View>

      {/* Statistics Overview */}
      <View style={styles.statisticsContainer}>
        <Text style={styles.sectionTitle}>Year Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{statistics.totalPrograms}</Text>
            <Text style={styles.statLabel}>Programs Launched</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{statistics.totalParticipants.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Participants</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{statistics.totalBudget}</Text>
            <Text style={styles.statLabel}>Total Investment</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{statistics.successRate}</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>
      </View>

      {/* Programs List */}
      <View style={styles.programsContainer}>
        <Text style={styles.sectionTitle}>Program Details</Text>
        {programs.map((program) => (
          <TouchableOpacity key={program.id} style={styles.programCard}>
            <View style={styles.programHeader}>
              <Text style={styles.programTitle}>{program.title}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{program.status}</Text>
              </View>
            </View>
            <Text style={styles.programDescription}>{program.description}</Text>
            <View style={styles.programStats}>
              <View style={styles.programStat}>
                <Text style={styles.programStatLabel}>Participants</Text>
                <Text style={styles.programStatValue}>{program.participants.toLocaleString()}</Text>
              </View>
              <View style={styles.programStat}>
                <Text style={styles.programStatLabel}>Budget</Text>
                <Text style={styles.programStatValue}>{program.budget}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Impact Summary */}
      <View style={styles.impactContainer}>
        <Text style={styles.sectionTitle}>Impact Summary</Text>
        <Text style={styles.impactText}>
          Our 2023 Gender and Development programs successfully reached over 3,000 individuals across various demographics. 
          Through strategic partnerships and community engagement, we achieved significant milestones in promoting gender equality 
          and empowering marginalized communities. The programs demonstrated measurable outcomes in leadership development, 
          policy implementation, and educational advancement.
        </Text>
        <Text style={styles.impactHighlight}>
          Key achievements include a 40% increase in women's participation in leadership roles and successful integration 
          of gender-responsive practices in participating organizations.
        </Text>
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
    backgroundColor: "#7c3aed",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  year: {
    fontSize: 20,
    color: "#e0e7ff",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#c7d2fe",
    textAlign: "center",
    lineHeight: 22,
  },
  statisticsContainer: {
    padding: 20,
    backgroundColor: "#fef2f2",
    margin: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 15,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#ffffff",
    width: "48%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626",
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  programsContainer: {
    padding: 20,
  },
  programCard: {
    backgroundColor: "#dbeafe",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#1e40af",
  },
  programHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  programDescription: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 15,
  },
  programStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  programStat: {
    alignItems: "center",
  },
  programStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  },
  programStatValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7c3aed",
  },
  impactContainer: {
    backgroundColor: "#f8fafc",
    margin: 15,
    marginBottom: 30,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  impactText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 15,
    textAlign: "justify",
  },
  impactHighlight: {
    fontSize: 16,
    color: "#dc2626",
    fontWeight: "600",
    lineHeight: 22,
    backgroundColor: "#fef2f2",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626",
  },
});