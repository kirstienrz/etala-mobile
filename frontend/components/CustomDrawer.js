import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

export default function CustomDrawer({ navigation }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [uploadsOpen, setUploadsOpen] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const MenuItem = ({ title, icon, onPress, isOpen, hasSubmenu, badge }) => (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={20} color="#6B46C1" style={styles.menuIcon} />
        <Text style={styles.menuItemText}>{title}</Text>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
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

  const SubMenuItem = ({ title, onPress, icon }) => (
    <TouchableOpacity onPress={onPress} style={styles.subMenuItem}>
      {icon ? (
        <Ionicons name={icon} size={16} color="#8B5CF6" style={styles.subMenuIcon} />
      ) : (
        <View style={styles.subMenuBullet} />
      )}
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
        {user && (
          <Text style={styles.userWelcome}>
            Welcome, {user.firstName}!
          </Text>
        )}
      </View>

      <DrawerContentScrollView style={styles.scrollView}>
        {/* Show different menu based on authentication status */}
        {user ? (
          // PRIVATE MENU (for logged-in users)
          <>
            <MenuItem 
              title="Dashboard" 
              icon="speedometer" 
              onPress={() => navigation.navigate("Dashboard")} 
            />
            
            <MenuItem 
              title="Profile" 
              icon="person" 
              onPress={() => navigation.navigate("Profile")} 
            />

            {/* GAD Tools & Services */}
            <MenuItem 
              title="GAD Tools & Services" 
              icon="construct" 
              onPress={() => setToolsOpen(!toolsOpen)} 
              isOpen={toolsOpen} 
              hasSubmenu 
            />
            {toolsOpen && (
              <View style={styles.subMenu}>
                <SubMenuItem 
                  title="Reports & Forms" 
                  icon="document-text"
                  onPress={() => navigation.navigate("ReportsAndForms")} 
                />
                <SubMenuItem 
                  title="Bookings & Requests" 
                  icon="calendar"
                  onPress={() => navigation.navigate("BookingsRequests")} 
                />
                <SubMenuItem 
                  title="GAD Resources" 
                  icon="library"
                  onPress={() => navigation.navigate("GADResources")} 
                />
              </View>
            )}

            {/* Uploads */}
            <MenuItem 
              title="Uploads" 
              icon="cloud-upload" 
              onPress={() => setUploadsOpen(!uploadsOpen)} 
              isOpen={uploadsOpen} 
              hasSubmenu 
            />
            {uploadsOpen && (
              <View style={styles.subMenu}>
                <SubMenuItem 
                  title="Document Upload" 
                  icon="document"
                  onPress={() => navigation.navigate("DocumentUpload")} 
                />
                <SubMenuItem 
                  title="Artwork Upload" 
                  icon="image"
                  onPress={() => navigation.navigate("ArtworkUpload")} 
                />
                <SubMenuItem 
                  title="My Uploads" 
                  icon="folder"
                  onPress={() => navigation.navigate("MyUploads")} 
                />
              </View>
            )}
            
            <MenuItem 
              title="Notifications" 
              icon="notifications" 
              onPress={() => navigation.navigate("Notifications")} 
            />

            <MenuItem 
              title="Messages" 
              icon="chatbubbles" 
              onPress={() => navigation.navigate("Messages")} 
            />

            {/* Separator */}
            <View style={styles.separator} />

            <MenuItem 
              title="Settings" 
              icon="settings" 
              onPress={() => navigation.navigate("Settings")} 
            />
          </>
        ) : (
          // PUBLIC MENU (for non-logged-in users)
          <>
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

            {/* Login/Register for public users */}
            <View style={styles.separator} />
            <MenuItem 
              title="Login" 
              icon="log-in" 
              onPress={() => navigation.navigate("Login")} 
            />
            <MenuItem 
              title="Register" 
              icon="person-add" 
              onPress={() => navigation.navigate("Register")} 
            />
          </>
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
    backgroundColor: "#6B46C1",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomRightRadius: 15,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#553C9A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  appTagline: {
    fontSize: 14,
    color: "#DDD6FE",
    marginTop: 2,
  },
  userWelcome: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 8,
    fontStyle: "italic",
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
    flex: 1,
  },
  menuIcon: {
    marginRight: 12,
    width: 24,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    flex: 1,
  },
  badge: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  subMenu: {
    paddingLeft: 20,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 2,
    borderLeftColor: "#8B5CF6",
    marginLeft: 16,
    marginBottom: 5,
    marginRight: 8,
    borderRadius: 8,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B46C1",
    marginTop: 12,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  subMenuIcon: {
    marginRight: 10,
    width: 16,
  },
  subMenuBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#6B46C1",
    marginRight: 10,
  },
  subMenuText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 15,
    marginHorizontal: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
});