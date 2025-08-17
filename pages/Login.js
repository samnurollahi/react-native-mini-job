import { useRef, useState } from "react";
import { BackHandler, Button, Image, Text, TextInput, View } from "react-native";
import Service from "../service/main.service";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function () {
  const [phoneNumberText, setPhoneNumberText] = useState();
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation()


  navigation.addListener("focus", () => {
    AsyncStorage.getItem("token").then(token => {
      if(token) {
        // console.log(token);
        // navigation.navigate("profile")
        BackHandler.exitApp()
      }
    })
  })


  const submit = async () => {
    const result = await Service.sendCodeToLogin(phoneNumberText);

    if (result.data.msg == "no") {
      setIsError(true)
    }else if(result.data.msg == "ok") {
      console.log("ok");
      setIsError(false)
      // navigation.replace("auth", { phoneNumber: phoneNumberText });
      navigation.navigate("auth", {phoneNumber: phoneNumberText})
    }
  };

  return (
    <View style={{ flex: 0.8, direction: "rtl" }}>
      <View style={{ margin: "auto", width: "80%" }}>
      <Image
          source={require("../assets/logo.jpeg")}
          style={{ marginHorizontal: "auto" }}
        />
        <Text style={{ fontSize: 16, fontFamily: "vazir" }}>شماره موبایل</Text>
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
          onChangeText={setPhoneNumberText}
          value={phoneNumberText}
        />
        {isError ? (
          <Text style={{ marginTop: 3, color: "#D32F2F" }}>
            شماره موبایل وارد شده نادرست است.
          </Text>
        ) : (
          <></>
        )}

        <View style={{ marginTop: 10 }}>
          <Button title="ارسال پیامک" onPress={submit} />
        </View>
      </View>
    </View>
  );
}
