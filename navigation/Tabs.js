import { BackHandler, Pressable, ToastAndroid } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Home from "../pages/Home";
import Trainig from "../pages/Trainig";
import AccountUser from "../pages/AccountUser";
import Report from "../pages/Report";
import Login from "../pages/Login";
import Auth from "../pages/Auth";
import Questions from "../pages/Questions";
import SingelAd from "../pages/SingelAd";
import Chat from "../pages/Chat";
import SingelTrain from "../pages/SingelTrain";
import ZirMajmoe from "../pages/ZirMajmoe";
import History from "../pages/History";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useRef } from "react";

const Tab = createBottomTabNavigator();
export default function Tabs({ token }) {
  const navigation = useNavigation();
  const lastPress = useRef(0);

  useFocusEffect(
    useCallback(() => {
      const onBack = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true; 
        }
        const now = Date.now();
        if (now - lastPress.current < 1500) {
          BackHandler.exitApp();
        } else {
          ToastAndroid.show("برای خروج دوباره بزنید", ToastAndroid.SHORT);
          lastPress.current = now;
        }
        return true;
      };

      const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
      return () => sub.remove();
    }, [navigation])
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "vazir",
          color: "#fff",
          fontSize: 18,
        },
        headerStyle: {
          // paddingBlock: 5,
          height: 70,
          backgroundColor: "#2979FF",
        },
        animation: "shift",
        headerShadowVisible: false,
        tabBarStyle: {
          // height: 55,
          // marginBottom: 35,
          // paddingBottom: 0,
          shadowColor: "white",
        },
      }}
    >
      {token ? (
        <></>
      ) : (
        <>
          <Tab.Screen
            name="login"
            component={Login}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
              tabBarItemStyle: {
                display: "none"
              }
            }}
          />
          <Tab.Screen
            name="auth"
            component={Auth}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
              tabBarItemStyle: {
                display: "none"
              },
            }}
          />
        </>
      )}

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
          headerBackVisible: false, // دکمه Back هدر را مخفی می‌کند
          gestureEnabled: false,    // Back با swipe را غیر فعال می‌کند
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
        component={Report}
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
        component={AccountUser}
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
          headerRight: () => (
            <></>
            // <Pressable>
            //   <AntDesign
            //     name="setting"
            //     size={24}
            //     color="white"
            //     style={{ paddingRight: 20, marginTop: 10 }}
            //   />
            // </Pressable>
          ),
        }}
      />


      {/* hide screen  */}
      <Tab.Screen
        name="questions"
        component={Questions}
        options={{
          headerTitle: "سوالات متداول",
          tabBarLabel: "سوالات متداول",
          tabBarItemStyle: {
            display: "none"
          },
          tabBarStyle: {
            display: "none"
          }
        }}
      />
      <Tab.Screen
        name="singelAd"
        component={SingelAd}
        options={{
          headerTitle: "صفحه تبلیغ",
          tabBarItemStyle: {
            display: "none"
          },
          tabBarStyle: {
            display: "none"
          }
        }}
      />
      <Tab.Screen
        name="singelTrain"
        component={SingelTrain}
        options={{
          headerTitle: "آموزش",
          tabBarItemStyle: {
            display: "none"
          },
          tabBarStyle: {
            display: "none"
          }
        }}
      />
      <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          headerTitle: "ارتباط با پشتیبانی",
          tabBarItemStyle: {
            display: "none"
          },
          tabBarStyle: {
            display: "none"
          }
        }}
      />
      <Tab.Screen
        name="zirMajmoe"
        component={ZirMajmoe}
        options={{
          headerTitle: "زیر مجموعه گیری",
          tabBarItemStyle: {
            display: "none"
          },
          tabBarStyle: {
            display: "none"
          }
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          headerTitle: "سوابق برداشت",
          tabBarItemStyle: {
            display: "none"
          },
          tabBarStyle: {
            display: "none"
          }
        }}
      />


    </Tab.Navigator>
  );
}
