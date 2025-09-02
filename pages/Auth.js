import { useEffect, useRef, useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import Service from "../service/main.service";
import axios from "axios";
import { CommonActions, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as Notif from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { OtpInput } from "react-native-otp-entry";

export default function (data) {
  const phoneNumber = data.route.params.phoneNumber;
  let sec = 0;
  let min = 5;

  const [coded, setCoded] = useState(data.route.params.code)
  const [code, setCode] = useState();
  const [isError, setIsError] = useState(false);
  const [timder, setTimder] = useState("05:00");
  const [timderEnd, setTimderEnd] = useState(false)

  const navigation = useNavigation();

  const submit = async () => {
    if (coded == code) {
      const result = await Service.checkCode(code, phoneNumber);
      await AsyncStorage.setItem("token", result.data.token);
      // notif()

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "profile", params: { newLogin: true } }],
        })
      );
    } else {
      setIsError(true);
    }
  };
  const resendCode = async () => {
    setTimderEnd(false)

    sec = 0
    min = 5
    const intervals = setInterval(() => {
      if (sec == 0) {
        min = min - 1;
        sec = 59;
      } else {
        sec = sec - 1;
      }
      console.log(sec, min);
      if(sec <= 0 && min <= 0){
        setTimderEnd(true)
        clearInterval(intervals)
      }

      setTimder(
        `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
      );
    }, 1000);


    const result = await Service.sendCodeToLogin(phoneNumber);
    setCoded(result.data.code)
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      sec = 0
      min = 5
      const intervals = setInterval(() => {
        if (sec == 0) {
          min = min - 1;
          sec = 59;
        } else {
          sec = sec - 1;
        }
        if(sec <= 0 && min <= 0){
          setTimderEnd(true)
          clearInterval(intervals)
        }

        setTimder(
          `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
        );
      }, 1000);
    });
  }, []);

  return (
    <View style={{ flex: 0.8, flexDirection: "row" }}>
      <View style={{ margin: "auto", width: "80%" }}>
        <LottieView
          source={require("../assets/anim/sms.json")}
          style={{ width: 150, height: 150, marginHorizontal: "auto" }}
          loop
          autoPlay
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: "vazir",
            textAlign: "center",
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          کد اعتبارسنجی برای شما پیامک شد
        </Text>
        <View style={{ flexDirection: "row" }}>
          <OtpInput numberOfDigits={6} onTextChange={(text) => setCode(text)} />
        </View>
        {timderEnd ? (
          <Text
            style={{
              fontFamily: "vazir",
              textAlign: "right",
              marginTop: 25,
              marginBottom: 10,
              color: "#1565C0"
            }}
            onPress={resendCode}
          >
            ارسال مجدد
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: "vazir",
              textAlign: "right",
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            {timder} مانده تا ارسال مجدد کد
          </Text>
        )}
        {isError ? (
          <Text style={{ marginTop: 3, color: "#D32F2F", fontFamily: "vazir", textAlign: "right" }}>
            کد اشتباه است
          </Text>
        ) : (
          <></>
        )}

        <View style={{ marginTop: 10 }}>
          <Button title="تایید" onPress={submit} />
        </View>
      </View>
    </View>
  );
}
