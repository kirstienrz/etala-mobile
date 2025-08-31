import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

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

function DrawerScreens() {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{ headerShown: true }}
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
