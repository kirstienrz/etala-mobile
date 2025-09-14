import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { loadUserFromStorage } from "./redux/authSlice";

// === Screens ===
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
import DashboardScreen from "./screens/User/DashboardScreen";
import ProfileScreen from "./screens/User/ProfileScreen";
import SettingsScreen from "./screens/User/SettingsScreen";
import MessagesScreen from "./screens/User/MessagesScreen";
import NotificationsScreen from "./screens/User/NotificationsScreen";

import FloatingChatbot from "./components/FloatingChatbot";
import CustomDrawer from "./components/CustomDrawer";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Status bar height for iOS/Android
const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 44 : StatusBar.currentHeight + 5;

/* -------------------------
    Custom Header
-------------------------- */
const CustomHeader = ({ navigation }) => {
  return (
    <View style={[styles.headerContainer, { paddingTop: STATUS_BAR_HEIGHT }]}>
      <View style={styles.headerContent}>
        {/* Logo + Title */}
        <View style={styles.leftSection}>
          <Ionicons name="business" size={24} color="white" style={styles.logo} />
          <Text style={styles.headerTitle}>ETALA</Text>
        </View>

        {/* Drawer toggle */}
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

/* -------------------------
    Public Drawer Navigator
    (Visible to non-logged-in users)
-------------------------- */
function PublicDrawer() {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          header: () => <CustomHeader navigation={navigation} />,
          drawerPosition: "right",
          drawerType: "front",
        })}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Vision & Mission" component={VisionMissionScreen} />
        <Drawer.Screen
          name="Organizational Structure"
          component={OrgStructureScreen}
        />
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

/* -------------------------
    Private Drawer Navigator
    (Visible to logged-in users)
-------------------------- */
function PrivateDrawer() {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          header: () => <CustomHeader navigation={navigation} />,
          drawerPosition: "right",
          drawerType: "front",
        })}
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Messages" component={MessagesScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
      <FloatingChatbot />
    </View>
  );
}

/* -------------------------
    Root Navigator
    Decides which drawer to show
-------------------------- */
function RootNavigator() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6B46C1" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Private" component={PrivateDrawer} />
      ) : (
        <>
          <Stack.Screen name="Public" component={PublicDrawer} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}


/* -------------------------
    App Component
-------------------------- */
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

/* -------------------------
    Styles
-------------------------- */
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#6B46C1",
    paddingBottom: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    marginRight: 12,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  rightSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    padding: 8,
  },
});
