import { useRef, useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import Service from "../service/main.service";
import axios from "axios";
import { CommonActions, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as Notif from "expo-notifications"
import AsyncStorage from "@react-native-async-storage/async-storage";
 import Constants from 'expo-constants';

export default function (data) {
  const phoneNumber = data.route.params.phoneNumber

  const [code, setCode] = useState()
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation()

  const submit = async () => {
    const result = await Service.checkCode(code, phoneNumber)
    await AsyncStorage.setItem("token", result.data.token)
    // notif()

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'profile', params: {newLogin: true} }],
      })
    );
  };
  const notif = async () => {
    try {
      const {status} = await Notif.requestPermissionsAsync()
      // if(status == "grented") {
        const projectId = Constants.expoConfig.extra.eas.projectId;
        const token = (await Notif.getExpoPushTokenAsync({projectId})).data
        console.log(token);
      // } 
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={{ flex: 0.8, direction: "rtl" }}>
      <View style={{ margin: "auto", width: "80%" }}>
        <LottieView
          source={require("../assets/anim/sms.json")}
          style={{ width: 150, height: 150, marginHorizontal: "auto" }}
          loop
          autoPlay
        />
        <Text style={{ fontSize: 16, fontFamily: "vazir", textAlign: 'center', marginTop: 10, }}>
          کد اعتبارسنجی برای شما پیامک شد
        </Text>
        <TextInput
          placeholder="09123...."
          style={{
            fontFamily: "vazir",
            borderWidth: 1,
            borderColor: isError ? "#D32F2F" : "#ccc",
            borderRadius: 5,
            marginTop: 5,
          }}
          keyboardType="number-pad"
          onChangeText={setCode}
          value={code}
        />
        {isError ? (
          <Text style={{ marginTop: 3, color: "#D32F2F" }}>
            شماره موبایل وارد شده نادرست است.
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
