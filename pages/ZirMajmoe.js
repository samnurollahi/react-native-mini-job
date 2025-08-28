import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";
import Service from "../service/main.service";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Clipboard from "expo-clipboard";
import LottieView from "lottie-react-native";

export default function () {
  const [loaded, setLoaded] = useState(false);
  const [code, setCode] = useState("");
  const [users, setUsers] = useState([]);

  const getMyCode = async () => {
    const result = await Service.getMyCode();
    setCode(result.code);

    const { users } = await Service.getMyZirMajmoe(result.code);
    setUsers(users);

    setLoaded(true);
  };
  const copyCode = async () => {
    await Clipboard.setStringAsync(code);
  };

  useEffect(() => {
    getMyCode();
  }, []);
  return (
    <>
      {loaded ? (
        <>
          <View
            style={{
              backgroundColor: "#fff",
              width: "95%",
              borderRadius: 10,
              padding: 12,
              marginTop: 15,
              marginHorizontal: "auto",
              flexDirection: "row-reverse",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "40%" }}>
              <Text
                style={{ fontFamily: "vazir", fontSize: 16, color: "#212121" }}
              >
                کد معرف شما
              </Text>
              <Text
                style={{
                  fontFamily: "vazir",
                  fontSize: 13,
                  color: "#5f6368",
                  width: "100%",
                }}
              >
                زمانی که کاربران کد شما رو بزنند 10% درامد انها به شما تعلق
                میگیرد
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={copyCode}>
                <Text
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 7,
                    borderWidth: 1,
                    borderColor: "#1565C0",
                    marginLeft: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FontAwesome5 name="copy" size={13} color="black" />
                  {"  " + code}
                </Text>
              </TouchableOpacity>
            </View>
            TouchableOpacity
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              marginTop: 15,
              borderRadius: 10,
              width: "95%",
              marginHorizontal: "auto",
              padding: 10,
            }}
          >
            <Text
              style={{ fontFamily: "vazir", fontSize: 18, flexDirection: "row-reverse" }}
            >
              زیر مجموعه ها شما
            </Text>

            <View style={{ marginTop: 25 }}>
              {users.length > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  {users.map((user) => (
                    <View
                      style={{
                        backgroundColor: "#ccc",
                        width: "33%",
                        margin: 10,
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <Text>{user.phoneNumber}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <>
                  <LottieView
                    style={{
                      width: 250,
                      height: 250,
                      marginHorizontal: "auto",
                    }}
                    loop
                    autoPlay
                    source={require("../assets/anim/notFound.json")}
                  />
                  <Text style={{ fontFamily: "vazir", margin: "auto" }}>
                    شما زیر مجموعه ای ندارید
                  </Text>
                </>
              )}
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator size={"large"} style={{ margin: "auto" }} />
      )}
    </>
  );
}
