import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Image, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import VisionMissionScreen from "./screens/About/VisionMissionScreen";
import OrgStructureScreen from "./screens/About/OrgStructureScreen";
import GADCommitteeScreen from "./screens/About/GADCommitteeScreen";
import ContactUsScreen from "./screens/About/ContactUsScreen";
import CircularsScreen from "./screens/Policies/CircularsScreen";
import ResolutionsScreen from "./screens/Policies/ResolutionsScreen";
import MemorandaScreen from "./screens/Policies/MemorandaScreen";
import OfficeOrdersScreen from "./screens/Policies/OfficeOrdersScreen";
import ReportsScreen from "./screens/ReportsScreen";
import Y2025Screen from "./screens/Programs/Y2025Screen";
import Y2024Screen from "./screens/Programs/Y2024Screen";
import Y2023Screen from "./screens/Programs/Y2023Screen";
import HandbookScreen from "./screens/Resources/HandbookScreen";
import KnowledgeHubScreen from "./screens/Resources/KnowledgeHubScreen";
import HotlinesScreen from "./screens/Resources/HotlinesScreen";
import CalendarScreen from "./screens/Resources/CalendarScreen";
import SuggestionBoxScreen from "./screens/Resources/SuggestionBoxScreen";
import FloatingChatbot from "./components/FloatingChatbot";
import CustomDrawer from "./components/CustomDrawer";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Get status bar height based on platform
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight + 5;

// Custom header component with logo and title
const CustomHeader = ({ navigation, route }) => {
  return (
    <View style={[styles.headerContainer, { paddingTop: STATUS_BAR_HEIGHT }]}>
      <View style={styles.headerContent}>
        {/* Logo and Title on the left */}
        <View style={styles.leftSection}>
          <Ionicons name="business" size={24} color="white" style={styles.logo} />
          <Text style={styles.headerTitle}>ETALA</Text>
        </View>
        
        {/* Hamburger menu on the right */}
        <View style={styles.rightSection}>
          <Ionicons
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.openDrawer()}
            style={styles.menuIcon}
          />
        </View>
      </View>
    </View>
  );
};

function DrawerScreens() {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation, route }) => ({
          headerShown: true,
          header: () => <CustomHeader navigation={navigation} route={route} />,
          drawerPosition: 'right', // This moves the drawer to the right side
          drawerType: 'front',
        })}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Vision & Mission" component={VisionMissionScreen} />
        <Drawer.Screen name="Organizational Structure" component={OrgStructureScreen} />
        <Drawer.Screen name="GAD Committee" component={GADCommitteeScreen} />
        <Drawer.Screen name="Contact Us" component={ContactUsScreen} />
        <Drawer.Screen name="Circulars" component={CircularsScreen} />
        <Drawer.Screen name="Resolutions" component={ResolutionsScreen} />
        <Drawer.Screen name="Memoranda" component={MemorandaScreen} />
        <Drawer.Screen name="Office Orders" component={OfficeOrdersScreen} />
        <Drawer.Screen name="Reports" component={ReportsScreen} />
        <Drawer.Screen name="2025" component={Y2025Screen} />
        <Drawer.Screen name="2024" component={Y2024Screen} />
        <Drawer.Screen name="2023" component={Y2023Screen} />
        <Drawer.Screen name="Handbook" component={HandbookScreen} />
        <Drawer.Screen name="Knowledge Hub" component={KnowledgeHubScreen} />
        <Drawer.Screen name="Emergency Hotlines" component={HotlinesScreen} />
        <Drawer.Screen name="Calendar of Events" component={CalendarScreen} />
        <Drawer.Screen name="Suggestion Box" component={SuggestionBoxScreen} />
      </Drawer.Navigator>
      <FloatingChatbot />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={DrawerScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#6B46C1', // Purple background
    paddingBottom: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    marginRight: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    padding: 8,
  },
});