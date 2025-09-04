import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import Footer from '../../components/Footer';

export default function SuggestionBoxScreen() {
  const [suggestionText, setSuggestionText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: "service", name: "Service Improvement", icon: "🔧", color: "#2563eb" },
    { id: "policy", name: "Policy Feedback", icon: "📋", color: "#dc2626" },
    { id: "training", name: "Training Programs", icon: "🎓", color: "#6b46c1" },
    { id: "accessibility", name: "Accessibility", icon: "♿", color: "#059669" },
    { id: "technology", name: "Technology/App", icon: "📱", color: "#7c3aed" },
    { id: "other", name: "Other", icon: "💡", color: "#94a3b8" }
  ];

  const priorities = [
    { id: "low", name: "Low Priority", color: "#22c55e", description: "Nice to have improvement" },
    { id: "medium", name: "Medium Priority", color: "#f59e0b", description: "Would improve experience" },
    { id: "high", name: "High Priority", color: "#dc2626", description: "Important issue to address" },
    { id: "urgent", name: "Urgent", color: "#7c2d12", description: "Critical issue requiring immediate attention" }
  ];

  const handleSubmitSuggestion = () => {
    if (!suggestionText.trim()) {
      Alert.alert("Missing Information", "Please enter your suggestion before submitting.");
      return;
    }

    if (!selectedCategory) {
      Alert.alert("Missing Information", "Please select a category for your suggestion.");
      return;
    }

    if (!selectedPriority) {
      Alert.alert("Missing Information", "Please select a priority level for your suggestion.");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Suggestion Submitted!",
        "Thank you for your feedback. Your anonymous suggestion has been submitted and will be reviewed by our team.",
        [
          {
            text: "Submit Another",
            onPress: () => {
              setSuggestionText("");
              setSelectedCategory("");
              setSelectedPriority("");
            }
          },
          { text: "Done", style: "default" }
        ]
      );
    }, 2000);
  };

  const recentSuggestions = [
    {
      id: 1,
      category: "Service Improvement",
      preview: "Extend office hours for better accessibility...",
      status: "Under Review",
      date: "2 days ago"
    },
    {
      id: 2,
      category: "Technology/App",
      preview: "Add dark mode option to the mobile app...",
      status: "In Progress",
      date: "1 week ago"
    },
    {
      id: 3,
      category: "Training Programs",
      preview: "More workshops on gender-sensitive language...",
      status: "Implemented",
      date: "2 weeks ago"
    },
    {
      id: 4,
      category: "Policy Feedback",
      preview: "Simplify the reporting process for incidents...",
      status: "Under Review",
      date: "3 weeks ago"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review": return "#f59e0b";
      case "In Progress": return "#2563eb";
      case "Implemented": return "#22c55e";
      case "On Hold": return "#94a3b8";
      default: return "#64748b";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Suggestion Box</Text>
        <Text style={styles.subtitle}>Anonymous Feedback & Ideas</Text>
        <View style={styles.anonymousNotice}>
          <Text style={styles.anonymousIcon}>🔒</Text>
          <Text style={styles.anonymousText}>
            Your identity remains completely anonymous. Help us improve our services!
          </Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Share Your Suggestion</Text>
        
        {/* Category Selection */}
        <Text style={styles.fieldLabel}>What area does your suggestion relate to?</Text>
        <View style={styles.categoryGrid}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryOption,
                {
                  backgroundColor: selectedCategory === category.id ? category.color : "#ffffff",
                  borderColor: category.color
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                { color: selectedCategory === category.id ? "#ffffff" : category.color }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Priority Selection */}
        <Text style={styles.fieldLabel}>How would you rate the priority?</Text>
        <View style={styles.priorityContainer}>
          {priorities.map(priority => (
            <TouchableOpacity
              key={priority.id}
              style={[
                styles.priorityOption,
                {
                  backgroundColor: selectedPriority === priority.id ? priority.color : "#ffffff",
                  borderColor: priority.color
                }
              ]}
              onPress={() => setSelectedPriority(priority.id)}
            >
              <Text style={[
                styles.priorityName,
                { color: selectedPriority === priority.id ? "#ffffff" : priority.color }
              ]}>
                {priority.name}
              </Text>
              <Text style={[
                styles.priorityDescription,
                { color: selectedPriority === priority.id ? "#ffffff" : "#64748b" }
              ]}>
                {priority.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Suggestion Text Input */}
        <Text style={styles.fieldLabel}>Your suggestion or feedback:</Text>
        <TextInput
          style={styles.suggestionInput}
          multiline={true}
          numberOfLines={6}
          placeholder="Please share your thoughts, suggestions, or feedback. Be as detailed as possible to help us understand your perspective better..."
          value={suggestionText}
          onChangeText={setSuggestionText}
          placeholderTextColor="#94a3b8"
          textAlignVertical="top"
        />
        
        <Text style={styles.characterCount}>
          {suggestionText.length}/1000 characters
        </Text>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { opacity: isSubmitting ? 0.7 : 1 }
          ]}
          onPress={handleSubmitSuggestion}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Submitting..." : "Submit Anonymous Suggestion"}
          </Text>
        </TouchableOpacity>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Text style={styles.privacyTitle}>Privacy & Anonymity</Text>
          <Text style={styles.privacyText}>
            • No personal information is collected or stored{'\n'}
            • Your IP address is not logged with suggestions{'\n'}
            • Suggestions are reviewed by our improvement team{'\n'}
            • We may implement changes based on feedback{'\n'}
            • No way to trace suggestions back to individuals
          </Text>
        </View>
      </View>

      {/* Recent Community Suggestions */}
      <View style={styles.communitySection}>
        <Text style={styles.sectionTitle}>Recent Community Suggestions</Text>
        <Text style={styles.communitySubtitle}>
          See how we're acting on feedback from the community
        </Text>
        
        {recentSuggestions.map(suggestion => (
          <View key={suggestion.id} style={styles.suggestionCard}>
            <View style={styles.suggestionHeader}>
              <Text style={styles.suggestionCategory}>{suggestion.category}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(suggestion.status) }]}>
                <Text style={styles.statusText}>{suggestion.status}</Text>
              </View>
            </View>
            <Text style={styles.suggestionPreview}>{suggestion.preview}</Text>
            <Text style={styles.suggestionDate}>{suggestion.date}</Text>
          </View>
        ))}
      </View>

      {/* Quick Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Tips for Better Suggestions</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• Be specific about the issue or improvement</Text>
          <Text style={styles.tipItem}>• Explain how it would benefit users or services</Text>
          <Text style={styles.tipItem}>• Include context about when/where you encountered it</Text>
          <Text style={styles.tipItem}>• Suggest possible solutions if you have ideas</Text>
          <Text style={styles.tipItem}>• Focus on constructive feedback rather than complaints</Text>
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
    backgroundColor: "#6b46c1", // Purple
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
    color: "#e0e7ff", // Light purple
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
  },
  anonymousNotice: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  anonymousIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  anonymousText: {
    flex: 1,
    fontSize: 14,
    color: "#1e1b4b", // Dark blue
    fontWeight: "500",
    lineHeight: 20,
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginBottom: 20,
    textAlign: "center",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e1b4b", // Dark blue
    marginBottom: 12,
    marginTop: 16,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  categoryOption: {
    width: "48%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  priorityContainer: {
    marginBottom: 16,
  },
  priorityOption: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 8,
  },
  priorityName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  priorityDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  suggestionInput: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1e1b4b", // Dark blue
    borderWidth: 2,
    borderColor: "#e2e8f0",
    minHeight: 120,
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "right",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#dc2626", // Red
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  privacyNotice: {
    backgroundColor: "#ede9fe", // Light purple
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#6b46c1", // Purple
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b46c1", // Purple
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    color: "#1e1b4b", // Dark blue
    lineHeight: 20,
  },
  communitySection: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  communitySubtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 16,
  },
  suggestionCard: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb", // Blue
  },
  suggestionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  suggestionCategory: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b46c1", // Purple
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "bold",
  },
  suggestionPreview: {
    fontSize: 14,
    color: "#1e1b4b", // Dark blue
    marginBottom: 4,
    lineHeight: 18,
  },
  suggestionDate: {
    fontSize: 12,
    color: "#94a3b8",
  },
  tipsSection: {
    backgroundColor: "#fef7ff", // Very light purple
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#e0e7ff", // Light purple
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6b46c1", // Purple
    marginBottom: 12,
    textAlign: "center",
  },
  tipsList: {
    marginTop: 8,
  },
  tipItem: {
    fontSize: 14,
    color: "#1e1b4b", // Dark blue
    lineHeight: 20,
    marginBottom: 6,
  },
});