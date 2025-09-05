import { useRef, useState } from "react";
import { BackHandler, Button, Image, Text, TextInput, View } from "react-native";
import Service from "../service/main.service";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";


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
      navigation.navigate("auth", {phoneNumber: phoneNumberText, code: result.data.code})
    }
  };

  return (
    <View style={{backgroundColor: "#fff", flex: 1}}>
    <View style={{ flex: 0.8, flexDirection: "row-reverse", }}>
      <View style={{ margin: "auto", width: "80%" }}>
        <Text style={{fontFamily: "vazir", textAlign: "center"}}>
        کمک خرج ، کسب درآمد آسان در منزل
        </Text>
      <Image
          source={require("../assets/logo.jpeg")}
          style={{ marginHorizontal: "auto", width: 190, height: 170 }}
        />
        <Text style={{ fontSize: 16, fontFamily: "vazir", textAlign: "right" }}>شماره موبایل</Text>
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
          maxLength={11}
        />
        {isError ? (
          <Text style={{ marginTop: 3, color: "#D32F2F" , fontFamily: "vazir"}}>
            شماره موبایل وارد شده نادرست است.
          </Text>
        ) : (
          <></>
        )}

        <View style={{ marginTop: 10 }}>
          <Button title="ارسال پیامک" onPress={submit} />
        </View>

        <View style={{flexDirection: "row-reverse", alignItems: "center"}}>
        <Entypo name="info" size={18} color="black" />
        <Text style={{fontFamily: "vazir", margin: 10, textAlign: "right"}}>
        لطفا پیش از شروع کار حتما در قسمت آموزش ویدیو راهنمای کار با برنامه را ببینید 
        </Text>
        </View>
      </View>
    </View>
    </View>
  );
}
