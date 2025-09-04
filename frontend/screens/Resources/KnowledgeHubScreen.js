import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Footer from '../../components/Footer';

export default function KnowledgeHubScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Resources", color: "#6b46c1" }, // Purple
    { id: "research", name: "Research", color: "#2563eb" }, // Blue
    { id: "policy", name: "Policy", color: "#dc2626" }, // Red
    { id: "tools", name: "Tools", color: "#059669" }, // Green
    { id: "training", name: "Training", color: "#7c3aed" }, // Violet
  ];

  const resources = [
    {
      id: 1,
      title: "Gender Mainstreaming in Local Government Units",
      type: "Research Paper",
      category: "research",
      author: "Philippine Commission on Women",
      date: "2024",
      description: "Comprehensive analysis of gender mainstreaming implementation across Philippine LGUs with best practices and recommendations.",
      tags: ["Governance", "Implementation", "Best Practices"],
      readTime: "15 min read",
      featured: true
    },
    {
      id: 2,
      title: "Magna Carta of Women: Implementation Guidelines",
      type: "Policy Document",
      category: "policy",
      author: "Department of Justice",
      date: "2023",
      description: "Updated guidelines for implementing the Magna Carta of Women with practical examples and legal framework.",
      tags: ["Legal Framework", "Women's Rights", "Guidelines"],
      readTime: "20 min read",
      featured: true
    },
    {
      id: 3,
      title: "Gender-Responsive Budgeting Toolkit",
      type: "Practical Tool",
      category: "tools",
      author: "Department of Budget and Management",
      date: "2024",
      description: "Step-by-step toolkit for implementing gender-responsive budgeting in government agencies and LGUs.",
      tags: ["Budgeting", "Planning", "Tools"],
      readTime: "10 min read",
      featured: false
    },
    {
      id: 4,
      title: "Building Gender-Inclusive Workplaces",
      type: "Training Module",
      category: "training",
      author: "Civil Service Commission",
      date: "2024",
      description: "Interactive training materials for creating inclusive workplace environments and preventing discrimination.",
      tags: ["Workplace", "Training", "Inclusion"],
      readTime: "25 min read",
      featured: false
    },
    {
      id: 5,
      title: "Women's Economic Empowerment in the Philippines",
      type: "Research Study",
      category: "research",
      author: "Asian Development Bank",
      date: "2023",
      description: "Longitudinal study on women's participation in the Philippine economy with sector-specific analysis.",
      tags: ["Economics", "Employment", "Data Analysis"],
      readTime: "30 min read",
      featured: true
    },
    {
      id: 6,
      title: "Anti-Sexual Harassment Policy Templates",
      type: "Policy Template",
      category: "policy",
      author: "Commission on Human Rights",
      date: "2024",
      description: "Ready-to-use policy templates for organizations to develop comprehensive anti-harassment policies.",
      tags: ["Sexual Harassment", "Policy", "Templates"],
      readTime: "8 min read",
      featured: false
    },
    {
      id: 7,
      title: "Gender Data Collection Standards",
      type: "Technical Guide",
      category: "tools",
      author: "Philippine Statistics Authority",
      date: "2023",
      description: "Standardized methods for collecting, analyzing, and reporting gender-disaggregated data.",
      tags: ["Data", "Statistics", "Standards"],
      readTime: "12 min read",
      featured: false
    },
    {
      id: 8,
      title: "Leadership Development for Women",
      type: "Training Program",
      category: "training",
      author: "Development Academy of the Philippines",
      date: "2024",
      description: "Comprehensive leadership development curriculum designed specifically for women in public service.",
      tags: ["Leadership", "Professional Development", "Women"],
      readTime: "45 min read",
      featured: true
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : "#6b46c1";
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "research paper":
      case "research study":
        return "🔬";
      case "policy document":
      case "policy template":
        return "📋";
      case "practical tool":
      case "technical guide":
        return "🛠️";
      case "training module":
      case "training program":
        return "🎓";
      default:
        return "📄";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Knowledge Hub</Text>
        <Text style={styles.subtitle}>Resources, Research & Learning Materials</Text>
        <Text style={styles.description}>
          Discover comprehensive resources on Gender and Development including research papers, 
          policy documents, practical tools, and training materials.
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources, topics, or keywords..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#94a3b8"
        />
        <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesLabel}>Filter by Category:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                { 
                  backgroundColor: selectedCategory === category.id ? category.color : "#ffffff",
                  borderColor: category.color 
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryChipText,
                { color: selectedCategory === category.id ? "#ffffff" : category.color }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Resources */}
      {selectedCategory === "all" && (
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Resources</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredResources.map(resource => (
              <TouchableOpacity key={resource.id} style={styles.featuredCard}>
                <View style={styles.featuredHeader}>
                  <Text style={styles.featuredIcon}>{getTypeIcon(resource.type)}</Text>
                  <View style={[styles.featuredTag, { backgroundColor: getCategoryColor(resource.category) }]}>
                    <Text style={styles.featuredTagText}>{resource.type}</Text>
                  </View>
                </View>
                <Text style={styles.featuredTitle}>{resource.title}</Text>
                <Text style={styles.featuredAuthor}>By {resource.author}</Text>
                <Text style={styles.featuredDescription} numberOfLines={3}>{resource.description}</Text>
                <View style={styles.featuredFooter}>
                  <Text style={styles.featuredReadTime}>{resource.readTime}</Text>
                  <Text style={styles.featuredDate}>{resource.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* All Resources */}
      <View style={styles.resourcesSection}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === "all" ? "All Resources" : `${categories.find(cat => cat.id === selectedCategory)?.name} Resources`}
          <Text style={styles.resultCount}> ({filteredResources.length})</Text>
        </Text>

        {filteredResources.map(resource => (
          <TouchableOpacity key={resource.id} style={styles.resourceCard}>
            <View style={styles.resourceHeader}>
              <View style={styles.resourceIconContainer}>
                <Text style={styles.resourceIcon}>{getTypeIcon(resource.type)}</Text>
              </View>
              <View style={styles.resourceMeta}>
                <View style={[styles.resourceTypeTag, { backgroundColor: getCategoryColor(resource.category) }]}>
                  <Text style={styles.resourceTypeText}>{resource.type}</Text>
                </View>
                <Text style={styles.resourceDate}>{resource.date}</Text>
              </View>
            </View>
            
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceAuthor}>By {resource.author}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
            
            <View style={styles.resourceTags}>
              {resource.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.resourceFooter}>
              <Text style={styles.resourceReadTime}>{resource.readTime}</Text>
              <View style={styles.resourceActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.primaryActionButton}>
          <Text style={styles.primaryActionText}>Submit New Resource</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryActionButton}>
          <Text style={styles.secondaryActionText}>Request Research Topic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tertiaryActionButton}>
          <Text style={styles.tertiaryActionText}>Subscribe to Updates</Text>
        </TouchableOpacity>
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
  description: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1e1b4b",
    paddingVertical: 12,
  },
  searchIcon: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  searchIconText: {
    fontSize: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoriesLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e1b4b", // Dark blue
    marginBottom: 12,
  },
  categoriesScroll: {
    flexDirection: "row",
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  featuredSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginHorizontal: 20,
    marginBottom: 16,
  },
  resultCount: {
    fontSize: 18,
    color: "#64748b",
    fontWeight: "normal",
  },
  featuredCard: {
    backgroundColor: "#ffffff",
    width: 280,
    marginLeft: 20,
    borderRadius: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  featuredIcon: {
    fontSize: 24,
  },
  featuredTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredTagText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginBottom: 6,
    lineHeight: 24,
  },
  featuredAuthor: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 12,
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredReadTime: {
    fontSize: 12,
    color: "#6b46c1", // Purple
    fontWeight: "600",
  },
  featuredDate: {
    fontSize: 12,
    color: "#94a3b8",
  },
  resourcesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  resourceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb", // Blue accent
  },
  resourceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  resourceIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  resourceIcon: {
    fontSize: 20,
  },
  resourceMeta: {
    alignItems: "flex-end",
  },
  resourceTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  resourceTypeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  resourceDate: {
    fontSize: 12,
    color: "#94a3b8",
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginBottom: 6,
    lineHeight: 24,
  },
  resourceAuthor: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 12,
  },
  resourceTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#ede9fe", // Light purple
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: "#6b46c1", // Purple
    fontWeight: "500",
  },
  resourceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resourceReadTime: {
    fontSize: 12,
    color: "#6b46c1", // Purple
    fontWeight: "600",
  },
  resourceActions: {
    flexDirection: "row",
  },
  actionButton: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#2563eb", // Blue
    fontWeight: "600",
  },
  quickActions: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1b4b", // Dark blue
    marginBottom: 16,
    textAlign: "center",
  },
  primaryActionButton: {
    backgroundColor: "#dc2626", // Red
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 12,
  },
  primaryActionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryActionButton: {
    backgroundColor: "#2563eb", // Blue
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 12,
  },
  secondaryActionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  tertiaryActionButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6b46c1", // Purple border
  },
  tertiaryActionText: {
    color: "#6b46c1", // Purple
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});