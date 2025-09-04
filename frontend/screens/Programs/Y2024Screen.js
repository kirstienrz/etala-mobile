import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Footer from '../../components/Footer';

export default function Y2024Screen() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      id: 1,
      title: "Digital Gender Equity Initiative",
      description: "Bridging the digital divide by providing technology access and digital literacy training to women and marginalized communities.",
      participants: 500,
      budget: "$180,000",
      status: "In Progress",
      startDate: "March 2024",
      endDate: "December 2024",
      progress: 65,
      keyActivities: [
        "Digital literacy workshops",
        "Device distribution program",
        "Online entrepreneurship training",
        "Tech mentorship network"
      ]
    },
    {
      id: 2,
      title: "Climate Change & Gender Resilience Program",
      description: "Empowering women-led climate adaptation strategies and building community resilience against environmental challenges.",
      participants: 350,
      budget: "$220,000",
      status: "In Progress",
      startDate: "February 2024",
      endDate: "January 2025",
      progress: 45,
      keyActivities: [
        "Climate adaptation training",
        "Women's environmental leadership",
        "Sustainable agriculture practices",
        "Disaster preparedness workshops"
      ]
    },
    {
      id: 3,
      title: "Economic Empowerment for Women Entrepreneurs",
      description: "Supporting women-owned businesses through microfinance, business training, and market access facilitation.",
      participants: 200,
      budget: "$150,000",
      status: "Active",
      startDate: "January 2024",
      endDate: "October 2024",
      progress: 80,
      keyActivities: [
        "Business development training",
        "Microfinance support",
        "Market linkage facilitation",
        "Financial literacy programs"
      ]
    },
    {
      id: 4,
      title: "Gender-Based Violence Prevention Campaign",
      description: "Community-wide campaign to prevent gender-based violence through awareness, education, and support services.",
      participants: 1200,
      budget: "$120,000",
      status: "Active",
      startDate: "April 2024",
      endDate: "March 2025",
      progress: 55,
      keyActivities: [
        "Community awareness campaigns",
        "Support group facilitation",
        "Legal aid services",
        "Counseling and rehabilitation"
      ]
    },
    {
      id: 5,
      title: "Girls' Education Advancement Project",
      description: "Comprehensive program to increase girls' school enrollment and completion rates while addressing barriers to education.",
      participants: 800,
      budget: "$200,000",
      status: "Planning",
      startDate: "June 2024",
      endDate: "May 2025",
      progress: 25,
      keyActivities: [
        "Scholarship programs",
        "School infrastructure improvement",
        "Teacher training on gender sensitivity",
        "Parent engagement initiatives"
      ]
    }
  ];

  const currentStatistics = {
    totalPrograms: 5,
    activePrograms: 4,
    totalParticipants: 3050,
    totalBudget: "$870,000",
    averageProgress: "54%"
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#10b981";
      case "In Progress":
        return "#f59e0b";
      case "Planning":
        return "#6366f1";
      default:
        return "#6b7280";
    }
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 70) return "#10b981";
    if (progress >= 40) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gender & Development Programs</Text>
        <Text style={styles.year}>2024 Current Portfolio</Text>
        <Text style={styles.subtitle}>
          Active initiatives promoting gender equality and sustainable development goals
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStatsContainer}>
        <Text style={styles.sectionTitle}>Current Status</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{currentStatistics.totalPrograms}</Text>
            <Text style={styles.statLabel}>Total Programs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{currentStatistics.activePrograms}</Text>
            <Text style={styles.statLabel}>Active Programs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{currentStatistics.totalParticipants.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{currentStatistics.totalBudget}</Text>
            <Text style={styles.statLabel}>Total Investment</Text>
          </View>
        </View>
      </View>

      {/* Programs Portfolio */}
      <View style={styles.programsContainer}>
        <Text style={styles.sectionTitle}>2024 Program Portfolio</Text>
        {programs.map((program) => (
          <TouchableOpacity 
            key={program.id} 
            style={styles.programCard}
            onPress={() => setSelectedProgram(selectedProgram === program.id ? null : program.id)}
          >
            <View style={styles.programHeader}>
              <Text style={styles.programTitle}>{program.title}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(program.status) }]}>
                <Text style={styles.statusText}>{program.status}</Text>
              </View>
            </View>
            
            <Text style={styles.programDescription}>{program.description}</Text>
            
            <View style={styles.programMetrics}>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Duration:</Text>
                <Text style={styles.metricValue}>{program.startDate} - {program.endDate}</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Participants:</Text>
                <Text style={styles.metricValue}>{program.participants.toLocaleString()}</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Budget:</Text>
                <Text style={styles.metricValue}>{program.budget}</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressPercent}>{program.progress}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${program.progress}%`,
                      backgroundColor: getProgressBarColor(program.progress)
                    }
                  ]} 
                />
              </View>
            </View>

            {/* Expandable Details */}
            {selectedProgram === program.id && (
              <View style={styles.expandedDetails}>
                <Text style={styles.activitiesTitle}>Key Activities:</Text>
                {program.keyActivities.map((activity, index) => (
                  <View key={index} style={styles.activityItem}>
                    <Text style={styles.activityBullet}>•</Text>
                    <Text style={styles.activityText}>{activity}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Upcoming Milestones */}
      <View style={styles.milestonesContainer}>
        <Text style={styles.sectionTitle}>Upcoming Milestones</Text>
        <View style={styles.milestoneCard}>
          <Text style={styles.milestoneTitle}>Q4 2024 Targets</Text>
          <Text style={styles.milestoneText}>
            • Complete Digital Gender Equity Initiative pilot phase{'\n'}
            • Launch Girls' Education Advancement Project in 3 communities{'\n'}
            • Achieve 75% completion rate for Economic Empowerment program{'\n'}
            • Conduct mid-term evaluation of Climate Resilience program
          </Text>
        </View>
        
        <View style={styles.impactProjection}>
          <Text style={styles.impactTitle}>Projected 2024 Impact</Text>
          <Text style={styles.impactText}>
            By year-end, our programs are projected to directly benefit over 3,000 individuals, 
            with 70% being women and girls. Expected outcomes include increased economic opportunities, 
            enhanced digital literacy, improved climate resilience, and strengthened community support systems.
          </Text>
          <Text style={styles.impactHighlight}>
            Target: 85% program completion rate with measurable positive outcomes for participants
          </Text>
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
  quickStatsContainer: {
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
  programMetrics: {
    marginBottom: 15,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  metricValue: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  progressPercent: {
    fontSize: 14,
    color: "#7c3aed",
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  expandedDetails: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  activitiesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  activityBullet: {
    fontSize: 16,
    color: "#7c3aed",
    marginRight: 8,
    marginTop: 2,
  },
  activityText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
    lineHeight: 20,
  },
  milestonesContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  milestoneCard: {
    backgroundColor: "#f0f9ff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#0ea5e9",
  },
  milestoneTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0ea5e9",
    marginBottom: 10,
  },
  milestoneText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  impactProjection: {
    backgroundColor: "#f8fafc",
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 10,
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
    color: "#7c3aed",
    fontWeight: "600",
    lineHeight: 22,
    backgroundColor: "#f3e8ff",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#7c3aed",
  },
});