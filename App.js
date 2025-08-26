import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Font from "./context/font";
import { ActivityIndicator, StatusBar, ToastAndroid, BackHandler } from "react-native";
import * as Network from "expo-network";
import OffLine from "./pages/OffLine";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Socket from "./context/socket";
import Service from "./service/main.service";

export default function App() {
  // AsyncStorage.clear()

  const [vpn, setVpn] = useState(false);
  const [token, setToken] = useState("load");
  const isConnected = Network.useNetworkState().isConnected;
  const backPressTimeRef = useRef(0);

  const tokner = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };

  const checkVpn = async () => {
    try {
      const result = await Service.checkVpn();
      if (!result.vpn) {
        setVpn(false);
        tokner();
      } else {
        setVpn(true);
      }
    } catch (err) {
      console.error("VPN check error:", err);
      setVpn(true);
    }
  };

  useEffect(() => {
    // checkVpn();
    tokner()
  }, [isConnected]);
  const navigationRef = useRef(null);
  const backAllowedScreens = ["chat", "chats"];

  useEffect(() => {
    const backAction = () => {
      try {
        const state = navigationRef.current?.getRootState();
        if (!state) return false;
  
        // صفحه فعلی در Tab
        let route = state.routes[state.index];
        let nestedState = route.state;
  
        while (nestedState && nestedState.index !== undefined) {
          route = nestedState.routes[nestedState.index];
          nestedState = route.state;
        }
  
        const currentRouteName = route.name;
  
        // صفحات استثنا → Back پیش‌فرض
        if (backAllowedScreens.includes(currentRouteName)) {
          return false;
        }
  
        // اگر صفحه فعلی Root هست → Confirm Exit
        if (state.index === 0) {
          const now = Date.now();
          if (backPressTimeRef.current && now - backPressTimeRef.current < 2000) {
            BackHandler.exitApp();
            return true;
          }
          ToastAndroid.show("برای خروج دوباره کلیک کنید", ToastAndroid.SHORT);
          backPressTimeRef.current = now;
          return true;
        }
  
        // در غیر این صورت → Back پیش‌فرض Navigation
        return false;
  
      } catch {
        return false;
      }
    };
  
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);
  

  return (
    <>
      <StatusBar backgroundColor="#115ddc" />
      <Socket>
        <Font>
          {isConnected && !vpn ? (
            token === "load" ? (
              <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
            ) : (
              <NavigationContainer ref={navigationRef}>
                <Tabs token={token} />
              </NavigationContainer>
            )
          ) : (
            <OffLine />
          )}
        </Font>
      </Socket>
    </>
  );
}
