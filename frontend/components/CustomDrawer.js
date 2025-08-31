import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawer({ navigation }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <DrawerContentScrollView>
      {/* Home */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.item}>
        <Text style={styles.main}>Home</Text>
      </TouchableOpacity>

      {/* About Us */}
      <TouchableOpacity onPress={() => setAboutOpen(!aboutOpen)} style={styles.item}>
        <Text style={styles.main}>About Us</Text>
        <Ionicons name={aboutOpen ? "chevron-up" : "chevron-down"} size={18} />
      </TouchableOpacity>
      {aboutOpen && (
        <View style={styles.subMenu}>
          <TouchableOpacity onPress={() => navigation.navigate("Vision & Mission")}><Text>Vision & Mission</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Organizational Structure")}><Text>Organizational Structure</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("GAD Committee")}><Text>GAD Committee</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Contact Us")}><Text>Contact Us</Text></TouchableOpacity>
        </View>
      )}

      {/* Policies & Reports */}
      <TouchableOpacity onPress={() => setPoliciesOpen(!policiesOpen)} style={styles.item}>
        <Text style={styles.main}>Policies & Reports</Text>
        <Ionicons name={policiesOpen ? "chevron-up" : "chevron-down"} size={18} />
      </TouchableOpacity>
      {policiesOpen && (
        <View style={styles.subMenu}>
          <Text style={styles.subHeader}>Policies</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Circulars")}><Text>Circulars</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Resolutions")}><Text>Resolutions</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Memoranda")}><Text>Memoranda</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Office Orders")}><Text>Office Orders</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Reports")}><Text>Reports</Text></TouchableOpacity>
        </View>
      )}

      {/* Programs & Projects */}
      <TouchableOpacity onPress={() => setProgramsOpen(!programsOpen)} style={styles.item}>
        <Text style={styles.main}>Programs & Projects</Text>
        <Ionicons name={programsOpen ? "chevron-up" : "chevron-down"} size={18} />
      </TouchableOpacity>
      {programsOpen && (
        <View style={styles.subMenu}>
          <TouchableOpacity onPress={() => navigation.navigate("2025")}><Text>2025</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("2024")}><Text>2024</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("2023")}><Text>2023</Text></TouchableOpacity>
        </View>
      )}

      {/* Resources */}
      <TouchableOpacity onPress={() => setResourcesOpen(!resourcesOpen)} style={styles.item}>
        <Text style={styles.main}>Resources</Text>
        <Ionicons name={resourcesOpen ? "chevron-up" : "chevron-down"} size={18} />
      </TouchableOpacity>
      {resourcesOpen && (
        <View style={styles.subMenu}>
          <TouchableOpacity onPress={() => navigation.navigate("Handbook")}><Text>Handbook</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Knowledge Hub")}><Text>Knowledge Hub</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Emergency Hotlines")}><Text>Emergency Hotlines</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Calendar of Events")}><Text>Calendar of Events</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Suggestion Box")}><Text>Suggestion Box</Text></TouchableOpacity>
        </View>
      )}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  main: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subMenu: {
    paddingLeft: 20,
    paddingBottom: 8,
  },
  subHeader: {
    fontWeight: "600",
    marginTop: 5,
  },
});
