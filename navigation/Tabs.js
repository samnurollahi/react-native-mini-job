import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";

import Home from "../pages/Home";
import Font from "../context/font";

const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Font>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "vazir",
            color: "#2b71f2",
            fontSize: 25,
            marginTop: 30,
          },
          headerStyle: {
            height: 120,
          },
          animation: "shift",
          headerShadowVisible: false,
          tabBarStyle: {
            height: "auto",
            shadowColor: "white",
            marginBottom: 50,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="ads"
          component={Home}
          options={{
            tabBarIcon: ({ focus, color }) => (
              <AntDesign
                name="eye"
                size={24}
                color={focus ? "black" : "#2b71f2"}
              />
            ),
            headerTitle: "تبلیغات",
          }}
        />
      </Tab.Navigator>
    </Font>
  );
}
