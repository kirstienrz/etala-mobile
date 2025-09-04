import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Footer from '../../components/Footer';

export default function Y2025Screen() {
  const [selectedPhase, setSelectedPhase] = useState("planning");

  const plannedPrograms = [
    {
      id: 1,
      title: "AI & Gender Bias Mitigation Initiative",
      description: "Addressing algorithmic bias and promoting gender equality in artificial intelligence and technology sectors.",
      plannedParticipants: 400,
      estimatedBudget: "$250,000",
      phase: "planning",
      launchQuarter: "Q1 2025",
      duration: "18 months",
      priority: "High",
      sdgAlignment: ["SDG 5: Gender Equality", "SDG 9: Innovation"],
      expectedOutcomes: [
        "Gender-inclusive AI development guidelines",
        "Tech industry bias awareness training",
        "Women in AI leadership program",
        "Policy recommendations for ethical AI"
      ]
    },
    {
      id: 2,
      title: "Intergenerational Women's Mentorship Network",
      description: "Connecting experienced women leaders with emerging female professionals across various sectors.",
      plannedParticipants: 600,
      estimatedBudget: "$180,000",
      phase: "design",
      launchQuarter: "Q2 2025",
      duration: "24 months",
      priority: "High",
      sdgAlignment: ["SDG 5: Gender Equality", "SDG 8: Decent Work"],
      expectedOutcomes: [
        "Cross-generational knowledge transfer",
        "Career advancement support system",
        "Leadership pipeline development",
        "Professional networking expansion"
      ]
    },
    {
      id: 3,
      title: "Green Economy Women's Cooperative Program",
      description: "Establishing women-led cooperatives focused on sustainable business practices and environmental conservation.",
      plannedParticipants: 300,
      estimatedBudget: "$320,000",
      phase: "research",
      launchQuarter: "Q3 2025",
      duration: "30 months",
      priority: "Medium",
      sdgAlignment: ["SDG 5: Gender Equality", "SDG 13: Climate Action", "SDG 15: Life on Land"],
      expectedOutcomes: [
        "Sustainable cooperative businesses",
        "Environmental conservation projects",
        "Green skills development",
        "Economic empowerment through eco-enterprises"
      ]
    },
    {
      id: 4,
      title: "Digital Financial Inclusion for Rural Women",
      description: "Expanding access to digital financial services and promoting financial literacy among rural women communities.",
      plannedParticipants: 1000,
      estimatedBudget: "$280,000",
      phase: "planning",
      launchQuarter: "Q1 2025",
      duration: "20 months",
      priority: "High",
      sdgAlignment: ["SDG 1: No Poverty", "SDG 5: Gender Equality", "SDG 10: Reduced Inequalities"],
      expectedOutcomes: [
        "Increased digital payment adoption",
        "Enhanced financial literacy",
        "Rural women's economic participation",
        "Reduced gender gap in financial access"
      ]
    },
    {
      id: 5,
      title: "Mental Health & Gender Wellness Program",
      description: "Comprehensive mental health support system addressing gender-specific mental health challenges and stigma reduction.",
      plannedParticipants: 750,
      estimatedBudget: "$200,000",
      phase: "design",
      launchQuarter: "Q2 2025",
      duration: "24 months",
      priority: "High",
      sdgAlignment: ["SDG 3: Good Health", "SDG 5: Gender Equality", "SDG 10: Reduced Inequalities"],
      expectedOutcomes: [
        "Gender-sensitive mental health services",
        "Community support networks",
        "Stigma reduction campaigns",
        "Peer counseling programs"
      ]
    },
    {
      id: 6,
      title: "Youth Gender Leadership Academy",
      description: "Next-generation leadership development program for young people aged 16-25 focusing on gender equality advocacy.",
      plannedParticipants: 200,
      estimatedBudget: "$150,000",
      phase: "research",
      launchQuarter: "Q4 2025",
      duration: "12 months",
      priority: "Medium",
      sdgAlignment: ["SDG 4: Quality Education", "SDG 5: Gender Equality", "SDG 16: Peace and Justice"],
      expectedOutcomes: [
        "Young gender equality advocates",
        "Peer-to-peer education networks",
        "Policy advocacy skills",
        "Community mobilization capacity"
      ]
    }
  ];

  const strategicPriorities = {
    innovation: "Leveraging technology and innovation for gender equality advancement",
    sustainability: "Integrating environmental sustainability with women's economic empowerment",
    inclusion: "Ensuring no woman is left behind in development processes",
    partnership: "Building strategic partnerships for scaled impact"
  };

  const projectedImpact = {
    totalPrograms: 6,
    totalParticipants: 3250,
    totalBudget: "$1,380,000",
    communitiesReached: 150,
    partnershipsPlanned: 25
  };

  const getPriorityColor = (priority) => {
    return priority === "High" ? "#dc2626" : "#f59e0b";
  };

  const getPhaseColor = (phase) => {
    switch (phase) {
      case "planning":
        return "#7c3aed";
      case "design":
        return "#1e40af";
      case "research":
        return "#059669";
      default:
        return "#6b7280";
    }
  };

  const filterProgramsByPhase = (phase) => {
    return plannedPrograms.filter(program => program.phase === phase);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gender & Development Programs</Text>
        <Text style={styles.year}>2025 Strategic Plan</Text>
        <Text style={styles.subtitle}>
          Innovative programs designed to advance gender equality and sustainable development
        </Text>
      </View>

      {/* Strategic Vision */}
      <View style={styles.visionContainer}>
        <Text style={styles.sectionTitle}>2025 Vision</Text>
        <Text style={styles.visionText}>
          Building on our legacy of impact, 2025 will mark a transformative year in our gender and development work. 
          We are pioneering innovative approaches that address emerging challenges while strengthening foundational 
          gender equality principles.
        </Text>
        <View style={styles.prioritiesGrid}>
          {Object.entries(strategicPriorities).map(([key, value]) => (
            <View key={key} style={styles.priorityCard}>
              <Text style={styles.priorityTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <Text style={styles.priorityDescription}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Projected Impact */}
      <View style={styles.impactContainer}>
        <Text style={styles.sectionTitle}>Projected 2025 Impact</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{projectedImpact.totalPrograms}</Text>
            <Text style={styles.statLabel}>New Programs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{projectedImpact.totalParticipants.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{projectedImpact.totalBudget}</Text>
            <Text style={styles.statLabel}>Investment</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{projectedImpact.communitiesReached}</Text>
            <Text style={styles.statLabel}>Communities</Text>
          </View>
        </View>
      </View>

      {/* Phase Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.sectionTitle}>Program Development Phases</Text>
        <View style={styles.phaseButtons}>
          {["planning", "design", "research"].map((phase) => (
            <TouchableOpacity
              key={phase}
              style={[
                styles.phaseButton,
                { backgroundColor: selectedPhase === phase ? getPhaseColor(phase) : "#f3f4f6" }
              ]}
              onPress={() => setSelectedPhase(phase)}
            >
              <Text style={[
                styles.phaseButtonText,
                { color: selectedPhase === phase ? "#ffffff" : "#374151" }
              ]}>
                {phase.charAt(0).toUpperCase() + phase.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Programs by Phase */}
      <View style={styles.programsContainer}>
        <Text style={styles.phaseTitle}>
          {selectedPhase.charAt(0).toUpperCase() + selectedPhase.slice(1)} Phase Programs
        </Text>
        {filterProgramsByPhase(selectedPhase).map((program) => (
          <View key={program.id} style={styles.programCard}>
            <View style={styles.programHeader}>
              <Text style={styles.programTitle}>{program.title}</Text>
              <View style={styles.badgeContainer}>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(program.priority) }]}>
                  <Text style={styles.badgeText}>{program.priority} Priority</Text>
                </View>
                <View style={[styles.phaseBadge, { backgroundColor: getPhaseColor(program.phase) }]}>
                  <Text style={styles.badgeText}>{program.phase.charAt(0).toUpperCase() + program.phase.slice(1)}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.programDescription}>{program.description}</Text>
            
            <View style={styles.programDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Launch:</Text>
                <Text style={styles.detailValue}>{program.launchQuarter}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>{program.duration}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Participants:</Text>
                <Text style={styles.detailValue}>{program.plannedParticipants.toLocaleString()}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Budget:</Text>
                <Text style={styles.detailValue}>{program.estimatedBudget}</Text>
              </View>
            </View>

            <View style={styles.sdgContainer}>
              <Text style={styles.sdgTitle}>SDG Alignment:</Text>
              <View style={styles.sdgTags}>
                {program.sdgAlignment.map((sdg, index) => (
                  <View key={index} style={styles.sdgTag}>
                    <Text style={styles.sdgText}>{sdg}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.outcomesContainer}>
              <Text style={styles.outcomesTitle}>Expected Outcomes:</Text>
              {program.expectedOutcomes.map((outcome, index) => (
                <View key={index} style={styles.outcomeItem}>
                  <Text style={styles.outcomeBullet}>▸</Text>
                  <Text style={styles.outcomeText}>{outcome}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Implementation Timeline */}
      <View style={styles.timelineContainer}>
        <Text style={styles.sectionTitle}>2025 Implementation Timeline</Text>
        <View style={styles.timeline}>
          {["Q1", "Q2", "Q3", "Q4"].map((quarter) => (
            <View key={quarter} style={styles.timelineQuarter}>
              <Text style={styles.quarterTitle}>{quarter} 2025</Text>
              <View style={styles.quarterPrograms}>
                {plannedPrograms
                  .filter(p => p.launchQuarter === `${quarter} 2025`)
                  .map(program => (
                    <Text key={program.id} style={styles.quarterProgram}>
                      • {program.title}
                    </Text>
                  ))
                }
                {plannedPrograms.filter(p => p.launchQuarter === `${quarter} 2025`).length === 0 && (
                  <Text style={styles.noPrograms}>Ongoing program implementation</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>Partnership Opportunities</Text>
        <Text style={styles.ctaText}>
          We are actively seeking strategic partners to join us in implementing these transformative programs. 
          From funding partnerships to technical collaborations, there are multiple ways to contribute to 
          advancing gender equality in 2025.
        </Text>
        <View style={styles.partnershipTypes}>
          <View style={styles.partnershipCard}>
            <Text style={styles.partnershipTitle}>Financial Partners</Text>
            <Text style={styles.partnershipDescription}>Support program implementation and scaling</Text>
          </View>
          <View style={styles.partnershipCard}>
            <Text style={styles.partnershipTitle}>Technical Partners</Text>
            <Text style={styles.partnershipDescription}>Provide expertise and implementation support</Text>
          </View>
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
  visionContainer: {
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
  visionText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "justify",
  },
  prioritiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  priorityCard: {
    backgroundColor: "#ffffff",
    width: "48%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#7c3aed",
    elevation: 2,
  },
  priorityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 8,
  },
  priorityDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  impactContainer: {
    padding: 20,
    backgroundColor: "#dbeafe",
    margin: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    borderLeftColor: "#1e40af",
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  filterContainer: {
    padding: 20,
  },
  phaseButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  phaseButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  phaseButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  programsContainer: {
    paddingHorizontal: 20,
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 20,
    textAlign: "center",
  },
  programCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#6b7280",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#1e40af",
  },
  programHeader: {
    marginBottom: 12,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  phaseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "600",
  },
  programDescription: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 15,
  },
  programDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
  sdgContainer: {
    marginBottom: 15,
  },
  sdgTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#059669",
    marginBottom: 8,
  },
  sdgTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  sdgTag: {
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#10b981",
  },
  sdgText: {
    fontSize: 11,
    color: "#059669",
    fontWeight: "500",
  },
  outcomesContainer: {
    marginTop: 10,
  },
  outcomesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 8,
  },
  outcomeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  outcomeBullet: {
    fontSize: 14,
    color: "#7c3aed",
    marginRight: 8,
    marginTop: 2,
  },
  outcomeText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
    lineHeight: 20,
  },
  timelineContainer: {
    padding: 20,
    backgroundColor: "#f0f9ff",
    margin: 15,
    borderRadius: 15,
  },
  timeline: {
    gap: 15,
  },
  timelineQuarter: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#0ea5e9",
  },
  quarterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0ea5e9",
    marginBottom: 8,
  },
  quarterPrograms: {
    gap: 5,
  },
  quarterProgram: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  noPrograms: {
    fontSize: 14,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  ctaContainer: {
    padding: 20,
    margin: 15,
    marginBottom: 30,
    backgroundColor: "#f3e8ff",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#a855f7",
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7c3aed",
    textAlign: "center",
    marginBottom: 15,
  },
  ctaText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  partnershipTypes: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  partnershipCard: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  partnershipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 5,
  },
  partnershipDescription: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
});