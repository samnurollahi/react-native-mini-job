import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Font from "./context/font";
import {
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
  BackHandler,
  I18nManager,
} from "react-native";
import * as Network from "expo-network";
import OffLine from "./pages/OffLine";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Socket from "./context/socket";
import Service from "./service/main.service";
import { reloadAppAsync } from "expo";

export default function App() {
  // AsyncStorage.clear()

  const [vpn, setVpn] = useState(false);
  const [token, setToken] = useState("load");
  const isConnected = Network.useNetworkState().isConnected;

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

    checkVpn();
    // tokner();
  }, [isConnected]);


  return (
    <>
      <StatusBar backgroundColor="#115ddc" />
      <Socket>
        <Font>
          {isConnected && !vpn ? (
            token === "load" ? (
              <ActivityIndicator
                size="large"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ) : (
              <NavigationContainer>
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
