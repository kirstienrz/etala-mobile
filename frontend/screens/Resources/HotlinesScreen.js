import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from "react-native";
import Footer from '../../components/Footer';

export default function HotlinesScreen() {
  const hotlines = [
    {
      category: "Violence Against Women & Children",
      hotlines: [
        { name: "Philippine National Police Women and Children Protection Center", number: "117", available: "24/7", type: "emergency" },
        { name: "Department of Social Welfare and Development", number: "143", available: "24/7", type: "support" },
        { name: "Women's Crisis Center", number: "(02) 8531-9208", available: "24/7", type: "counseling" }
      ]
    },
    {
      category: "Mental Health & Crisis Support",
      hotlines: [
        { name: "National Center for Mental Health Crisis Hotline", number: "0917-899-8727", available: "24/7", type: "crisis" },
        { name: "Hopeline Philippines", number: "0917-558-4673", available: "24/7", type: "crisis" },
        { name: "In Touch Crisis Line", number: "(02) 8893-7603", available: "24/7", type: "counseling" }
      ]
    },
    {
      category: "General Emergency Services",
      hotlines: [
        { name: "Philippine National Police", number: "117", available: "24/7", type: "emergency" },
        { name: "Bureau of Fire Protection", number: "116", available: "24/7", type: "emergency" },
        { name: "Philippine Red Cross", number: "143", available: "24/7", type: "emergency" }
      ]
    },
    {
      category: "Child Protection",
      hotlines: [
        { name: "Bantay Bata 163", number: "163", available: "24/7", type: "support" },
        { name: "Children's Legal Rights and Development Center", number: "(02) 8734-4216", available: "Mon-Fri 8AM-5PM", type: "legal" },
        { name: "Council for the Welfare of Children", number: "(02) 8931-2740", available: "Mon-Fri 8AM-5PM", type: "support" }
      ]
    },
    {
      category: "Gender-Based Violence Support",
      hotlines: [
        { name: "Women's Legal and Human Rights Bureau", number: "(02) 8376-8002", available: "Mon-Fri 8AM-5PM", type: "legal" },
        { name: "Gabriela Women's Party", number: "(02) 8951-4040", available: "Mon-Fri 8AM-6PM", type: "support" },
        { name: "Philippine Commission on Women", number: "(02) 8735-1654", available: "Mon-Fri 8AM-5PM", type: "support" }
      ]
    }
  ];

  const handleCallPress = (number, name) => {
    Alert.alert(
      "Call Hotline",
      `Do you want to call ${name} at ${number}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => Linking.openURL(`tel:${number}`) }
      ]
    );
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "emergency": return "#dc2626"; // Red
      case "crisis": return "#dc2626"; // Red
      case "support": return "#2563eb"; // Blue
      case "counseling": return "#6b46c1"; // Purple
      case "legal": return "#1e1b4b"; // Dark blue
      default: return "#64748b"; // Gray
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "emergency": return "EMERGENCY";
      case "crisis": return "CRISIS";
      case "support": return "SUPPORT";
      case "counseling": return "COUNSELING";
      case "legal": return "LEGAL AID";
      default: return "INFO";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Emergency Hotlines</Text>
        <Text style={styles.subtitle}>Get immediate help and support</Text>
        <View style={styles.emergencyNotice}>
          <Text style={styles.emergencyText}>🚨 In case of immediate danger, call 117 or 911</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          Access emergency hotlines for various situations including violence against women and children, 
          mental health crises, and general emergency services. All hotlines are confidential and provide professional support.
        </Text>

        {hotlines.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            
            {category.hotlines.map((hotline, hotlineIndex) => (
              <TouchableOpacity 
                key={hotlineIndex} 
                style={styles.hotlineCard}
                onPress={() => handleCallPress(hotline.number, hotline.name)}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.typeTag, { backgroundColor: getTypeColor(hotline.type) }]}>
                    <Text style={styles.typeText}>{getTypeLabel(hotline.type)}</Text>
                  </View>
                  <Text style={styles.availabilityText}>{hotline.available}</Text>
                </View>
                
                <Text style={styles.hotlineName}>{hotline.name}</Text>
                
                <View style={styles.numberSection}>
                  <Text style={styles.numberLabel}>Call:</Text>
                  <Text style={styles.phoneNumber}>{hotline.number}</Text>
                  <View style={styles.callIcon}>
                    <Text style={styles.callIconText}>📞</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.importantInfo}>
          <Text style={styles.infoHeader}>Important Reminders</Text>
          <Text style={styles.infoText}>
            • All calls are confidential and free of charge{'\n'}
            • Trained professionals are available to help{'\n'}
            • Don't hesitate to call even if you're unsure{'\n'}
            • Keep these numbers saved in your phone{'\n'}
            • Share this information with friends and family
          </Text>
        </View>

        <View style={styles.additionalHelp}>
          <Text style={styles.helpHeader}>Need Additional Help?</Text>
          <TouchableOpacity style={styles.resourceButton}>
            <Text style={styles.resourceButtonText}>Find Local Support Centers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton}>
            <Text style={styles.resourceButtonText}>Download Safety Apps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton}>
            <Text style={styles.resourceButtonText}>Emergency Preparedness Guide</Text>
          </TouchableOpacity>
        </View>
      </View>
            <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff", // Light blue-white
  },
  header: {
    backgroundColor: "#dc2626", // Red for emergency theme
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
    color: "#fecaca", // Light red
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
  },
  emergencyNotice: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  emergencyText: {
    color: "#dc2626", // Red
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#1e1b4b", // Dark blue
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6b46c1", // Purple
    marginBottom: 16,
    textAlign: "center",
    backgroundColor: "#faf5ff", // Very light purple
    padding: 12,
    borderRadius: 10,
  },
  hotlineCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb", // Blue accent
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  availabilityText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  hotlineName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginBottom: 12,
    lineHeight: 22,
  },
  numberSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 8,
  },
  numberLabel: {
    fontSize: 14,
    color: "#64748b",
    marginRight: 8,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc2626", // Red
    flex: 1,
  },
  callIcon: {
    backgroundColor: "#dc2626", // Red
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  callIconText: {
    fontSize: 16,
  },
  importantInfo: {
    backgroundColor: "#ede9fe", // Light purple
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#6b46c1", // Purple
  },
  infoHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6b46c1", // Purple
    marginBottom: 12,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#1e1b4b", // Dark blue
    lineHeight: 22,
  },
  additionalHelp: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  helpHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginBottom: 16,
    textAlign: "center",
  },
  resourceButton: {
    backgroundColor: "#2563eb", // Blue
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  resourceButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});