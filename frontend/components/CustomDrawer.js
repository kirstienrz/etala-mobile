import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawer({ navigation }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const MenuItem = ({ title, icon, onPress, isOpen, hasSubmenu }) => (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={20} color="#6B46C1" style={styles.menuIcon} />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {hasSubmenu && (
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={18} 
          color="#553C9A" 
        />
      )}
    </TouchableOpacity>
  );

  const SubMenuItem = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.subMenuItem}>
      <View style={styles.subMenuBullet} />
      <Text style={styles.subMenuText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="business" size={28} color="#FFFFFF" />
        </View>
        <Text style={styles.appName}>ETALA</Text>
        <Text style={styles.appTagline}>Gender & Development</Text>
      </View>

      <DrawerContentScrollView style={styles.scrollView}>
        {/* Home */}
        <MenuItem 
          title="Home" 
          icon="home" 
          onPress={() => navigation.navigate("Home")} 
        />

        {/* About Us */}
        <MenuItem 
          title="About Us" 
          icon="people" 
          onPress={() => setAboutOpen(!aboutOpen)} 
          isOpen={aboutOpen} 
          hasSubmenu 
        />
        {aboutOpen && (
          <View style={styles.subMenu}>
            <SubMenuItem 
              title="Vision & Mission" 
              onPress={() => navigation.navigate("Vision & Mission")} 
            />
            <SubMenuItem 
              title="Organizational Structure" 
              onPress={() => navigation.navigate("Organizational Structure")} 
            />
            <SubMenuItem 
              title="GAD Committee" 
              onPress={() => navigation.navigate("GAD Committee")} 
            />
            <SubMenuItem 
              title="Contact Us" 
              onPress={() => navigation.navigate("Contact Us")} 
            />
          </View>
        )}

        {/* Policies & Reports */}
        <MenuItem 
          title="Policies & Reports" 
          icon="document-text" 
          onPress={() => setPoliciesOpen(!policiesOpen)} 
          isOpen={policiesOpen} 
          hasSubmenu 
        />
        {policiesOpen && (
          <View style={styles.subMenu}>
            <Text style={styles.subHeader}>POLICIES</Text>
            <SubMenuItem 
              title="Circulars" 
              onPress={() => navigation.navigate("Circulars")} 
            />
            <SubMenuItem 
              title="Resolutions" 
              onPress={() => navigation.navigate("Resolutions")} 
            />
            <SubMenuItem 
              title="Memoranda" 
              onPress={() => navigation.navigate("Memoranda")} 
            />
            <SubMenuItem 
              title="Office Orders" 
              onPress={() => navigation.navigate("Office Orders")} 
            />
            <Text style={styles.subHeader}>DOCUMENTS</Text>
            <SubMenuItem 
              title="Reports" 
              onPress={() => navigation.navigate("Reports")} 
            />
          </View>
        )}

        {/* Programs & Projects */}
        <MenuItem 
          title="Programs & Projects" 
          icon="calendar" 
          onPress={() => setProgramsOpen(!programsOpen)} 
          isOpen={programsOpen} 
          hasSubmenu 
        />
        {programsOpen && (
          <View style={styles.subMenu}>
            <SubMenuItem 
              title="2025" 
              onPress={() => navigation.navigate("2025")} 
            />
            <SubMenuItem 
              title="2024" 
              onPress={() => navigation.navigate("2024")} 
            />
            <SubMenuItem 
              title="2023" 
              onPress={() => navigation.navigate("2023")} 
            />
          </View>
        )}

        {/* Resources */}
        <MenuItem 
          title="Resources" 
          icon="book" 
          onPress={() => setResourcesOpen(!resourcesOpen)} 
          isOpen={resourcesOpen} 
          hasSubmenu 
        />
        {resourcesOpen && (
          <View style={styles.subMenu}>
            <SubMenuItem 
              title="Handbook" 
              onPress={() => navigation.navigate("Handbook")} 
            />
            <SubMenuItem 
              title="Knowledge Hub" 
              onPress={() => navigation.navigate("Knowledge Hub")} 
            />
            <SubMenuItem 
              title="Emergency Hotlines" 
              onPress={() => navigation.navigate("Emergency Hotlines")} 
            />
            <SubMenuItem 
              title="Calendar of Events" 
              onPress={() => navigation.navigate("Calendar of Events")} 
            />
            <SubMenuItem 
              title="Suggestion Box" 
              onPress={() => navigation.navigate("Suggestion Box")} 
            />
          </View>
        )}
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ETALA GAD Platform v1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#6B46C1", // Matching purple from main header
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomRightRadius: 15,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#553C9A", // Darker shade of purple
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1, // Matching letter spacing from header
  },
  appTagline: {
    fontSize: 14,
    color: "#DDD6FE", // Light purple tint
    marginTop: 2,
  },
  scrollView: {
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 12,
    width: 24,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151", // Dark gray for better readability
  },
  subMenu: {
    paddingLeft: 40,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 2,
    borderLeftColor: "#8B5CF6", // Medium purple accent
    marginLeft: 16,
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B46C1", // Matching main purple
    marginTop: 12,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingRight: 16,
  },
  subMenuBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#6B46C1", // Matching main purple
    marginRight: 10,
  },
  subMenuText: {
    fontSize: 14,
    color: "#6B7280", // Medium gray for sub-menu text
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB", // Light gray border
    backgroundColor: "#FFFFFF",
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF", // Muted gray
    textAlign: "center",
  },
});