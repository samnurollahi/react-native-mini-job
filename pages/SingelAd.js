import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import ImageViewing from "react-native-image-viewing";

import Service from "../service/main.service";
import numberWithCommas from "../utils/numberWithCommas";
import categoryName from "../utils/categoryName";
import { useSocket } from "../context/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function (data) {
  const [loaded, setLoaded] = useState(false);
  const [ad, setAd] = useState({});
  const [viewImage, setViewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const socket = useSocket();
  const navigation = useNavigation();

  const idAd = data.route.params.id ?? "";

  const getAd = async (idAd) => {
    try {
      const result = await Service.getAd(idAd);
      setAd(result.ad);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handelPressLink = (link) => {
    Linking.openURL(link);
  };
  const handelOpenImage = (url) => {
    setImageUrl(url);
    setViewImage(true);
  };
  const anjamMidam = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
    socket.emit("requestToAnjamProject", {
      token,
      data : {
        type: "notif",
        sender: "user",
        msg: `درخواست برای انجام پروژه ${ad.title}`,
        adId: ad.id,
        status: "waiting"
      }
    });
    socket.on("goToChatRoom", () => {
      navigation.navigate("chat")
    })
    } catch (err) {
      console.log(err);
    }

  };

  useFocusEffect(
    useCallback(() => {
      setLoaded(false);
      getAd(idAd);
    }, [idAd])
  );
  return (
    <>
      {loaded ? (
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "vazir",
              flexDirection: "row",
              padding: 10,
              textAlign: "center",
              backgroundColor: "#82B1FF",
              color: "#fff",
              marginTop: 10,
              width: "95%",
              marginHorizontal: "auto",
              borderRadius: 10,
            }}
          >
            {ad.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              width: "95%",
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "auto",
              backgroundColor: "#fff",
              paddingVertical: 15,
              borderRadius: 10,
              justifyContent: "space-around",
            }}
          >
            <View style={{ marginLeft: 0 }}>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ marginRight: 8 }}>
                  قیمت: {numberWithCommas(ad.price)}
                </Text>
                <FontAwesome5 name="money-bill-wave" size={20} color="green" />
              </View>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ marginRight: 8 }}>
                  تعداد نفرات مجاز: {ad.count}
                </Text>
                <FontAwesome6 name="users" size={20} color="blue" />
              </View>
            </View>
            <View>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ marginRight: 8 }}>در حال انجام: 2نفر</Text>
                <AntDesign name="swap" size={22} color="#ffc107" />
              </View>

              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ marginRight: 8 }}>تایید شده: 2نفر</Text>
                <AntDesign name="check" size={22} color="#4caf50" />
              </View>

              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ marginRight: 8 }}>رد شده: 2نفر</Text>
                <AntDesign name="close" size={22} color="red" />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              width: "95%",
              marginHorizontal: "auto",
              backgroundColor: "#fff",
              marginTop: 10,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <View style={{flexDirection: "column"}}>
              <Text
                style={{ color: "#2979FF", fontFamily: "vazir", fontSize: 17, textAlign: "right" }}
              >
                توضیحات
              </Text>
              <Text style={{ fontFamily: "vazir", textAlign: "right" }}>{ad.des}</Text>
            </View>

            <View style={{ marginTop: 15, flexDirection: "column" }}>
              <Text
                style={{ color: "#2979FF", fontFamily: "vazir", fontSize: 17, textAlign: "right" }}
              >
                شرایط تایید
              </Text>
              <Text style={{ fontFamily: "vazir", textAlign: "right" }}>
                {ad.sharayedAcceptWithAdmin}
              </Text>
            </View>

            <View style={{ marginTop: 15, flexDirection: "column" }}>
              <Text
                style={{ color: "#2979FF", fontFamily: "vazir", fontSize: 17, textAlign: "right" }}
              >
                لینک
              </Text>
              <Text
                style={{
                  fontFamily: "vazir",
                  flexDirection: "row",
                  textDecorationLine: "underline",
                }}
                onPress={() => handelPressLink(JSON.parse(ad.links))}
              >
                {JSON.parse(ad.links)}
              </Text>
            </View>

            <View style={{ marginTop: 15, flexDirection: "column" }}>
              <Text
                style={{ color: "#2979FF", fontFamily: "vazir", fontSize: 17, textAlign: "right" }}
              >
                تصاویر راهنما
              </Text>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                {JSON.parse(ad.trainig).map((train) => (
                  <TouchableOpacity
                    onPress={() =>
                      handelOpenImage(
                        `https://komakkharj.ir/uploads/${train}`
                      )
                    }
                  >
                    <Image
                      source={{
                        uri: `https://komakkharj.ir/uploads/${train}`,
                      }}
                      style={{
                        width: 50,
                        height: 100,
                        marginLeft: 20,
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={{ marginTop: 15, }}>
              <Text
                style={{ color: "#2979FF", fontFamily: "vazir", fontSize: 17, textAlign: "right" }}
              >
                برچسب
              </Text>
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-start",
                  marginTop: 10,
                  flexWrap: "wrap",
                }}
              >
                {JSON.parse(ad.caregory).map((item) => (
                  <>
                    <Text
                      style={{
                        marginLeft: 15,
                        backgroundColor: "#2979FF",
                        color: "#fff",
                        borderRadius: 20,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        fontSize: 13,
                        marginBottom: 10,
                        fontFamily: "vazir",
                      }}
                      key={Math.random()}
                    >
                      {categoryName(item)}
                    </Text>
                  </>
                ))}
              </View>
            </View>
          </View>
          <View style={{marginTop: 10, width: "95%", marginHorizontal: "auto"}}>
            <Button title="انجام میدم" onPress={anjamMidam} />
          </View>

          <ImageViewing
            images={[
              {
                uri: imageUrl,
              },
            ]}
            animationType="slide"
            imageIndex={0}
            visible={viewImage}
            onRequestClose={() => setViewImage(false)}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator size={"large"} style={{ margin: "auto" }} />
      )}
    </>
  );
}
