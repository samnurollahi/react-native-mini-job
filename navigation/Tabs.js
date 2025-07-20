import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Home from "../pages/Home";
import Font from "../context/font";
import Trainig from "../pages/Trainig";

const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "vazir",
          color: "#fff",
          fontSize: 22,
          marginTop: 10
        },
        headerStyle: {
          height: 100,
          backgroundColor: "#2979FF",
        },
        animation: "shift",
        headerShadowVisible: false,
        tabBarStyle: {
          height: 70,
          shadowColor: "white",
          marginBottom: 50,
        },
      }}
    >
      <Tab.Screen
        name="training"
        component={Trainig}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="cafe"
              size={24}
              color={focused ? "#2b71f2" : "#212121"}
            />
          ),
          title: "آموزش",
          tabBarLabel: "آموزش",
        }}
      />
      <Tab.Screen
        name="ads"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="attach-money"
              size={24}
              color={focused ? "#2b71f2" : "#212121"}
            />
          ),
          headerTitle: "کسب درآمد",
          tabBarLabel: "کسب درآمد",
        }}
      />
      <Tab.Screen
        name="report"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name="chat"
              size={24}
              color={focused ? "#2b71f2" : "#212121"}
            />
          ),
          headerTitle: "گزارش های ارسالی",
          tabBarLabel: "گزارش ها",
        }}
      />
      <Tab.Screen
        name="profile"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name="user"
              size={24}
              color={focused ? "#2b71f2" : "#212121"}
            />
          ),
          headerTitle: "حساب کاربری",
          tabBarLabel: "حساب کاربری",
        }}
      />
    </Tab.Navigator>
  );
}
