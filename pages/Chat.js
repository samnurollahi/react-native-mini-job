import AntDesign from "@expo/vector-icons/AntDesign";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSocket } from "../context/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import Service from "../service/main.service";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import ImageViewing from "react-native-image-viewing";

export default function (props) {
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [indexLastChat, setIndexLastChat] = useState();
  const [imageVisibel, setImageVisibel] = useState(false);
  const [imageVisit, setImageVisit] = useState("");
  const [adIdChat, setAdIdChat] = useState()

  const scrollRef = useRef(null);

  const navi = useNavigation();
  const socket = useSocket();

  const sendText = async () => {
    if (text) {
      socket.emit("chat", {
        chat: text,
        sender: "user",
        token: await AsyncStorage.getItem("token"),
        adId: adIdChat
      });

      // scrollRef.current.scrollToEnd({animated: true})
      // setChats((perv) => {
      //   return [...perv, { chat: text, isMySend: true }];
      // });
      // setIndexLastChat(chats.length);
      setText("");
    }
  };
  const getMessage = async (adIdChatForGet) => {
    const messages = await Service.getMessages(adIdChatForGet);

    let array = [];
    let obj = {};
    for (c of messages.chats) {
      obj = {};
      obj.view = c.view;
      obj.chat = c.msg;
      obj.type = c.type;
      obj.url = `https://komakkharj.ir/uploads/${c.url}`;
      if (c.sender == "user") {
        obj.isMySend = true;
      } else {
        obj.isMySend = false;
      }
      array.push(obj);
    }
    setChats(array);
    setLoaded(true);

    const token = await AsyncStorage.getItem("token");
    socket.emit("visitedUser", token);
  };
  const handelSendImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
    });

    if (!result.canceled) {
      try {
        const xhttp = new XMLHttpRequest();
        xhttp.open("post", "https://komakkharj.ir/api/upload");

        const formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: result.assets[0].fileName,
        });

        setChats((perv) => {
          setIndexLastChat(perv.length);

          return [
            ...perv,
            {
              type: "image",
              url: result.assets[0].uri,
              isMySend: true,
            },
          ];
        });

        xhttp.onloadend = async function () {
          const response = JSON.parse(xhttp.response);

          socket.emit("chat", {
            chat: "msg",
            sender: "user",
            token: await AsyncStorage.getItem("token"),
            type: "image",
            url: response.filename,
            adId: adIdChat
          });
        };

        xhttp.send(formData);
      } catch (err) {
        console.log(err);
      }
    }

    // console.log(result.assets[0]);
  };
  const openImages = (url) => {
    setImageVisit(url);
    setImageVisibel(true);
  };

  useEffect(() => {

    navi.addListener("blur", () => {
      socket.off("chatUser");
      socket.off("userReloadView");
    });
  }, []);

  useFocusEffect(useCallback(() => {
    if(props.route.params) {
      console.log(props.route.params.adId);
      setAdIdChat(props.route.params.adId)
    }
    // navi.addListener("focus", () => {
      setLoaded(false);
      getMessage(props.route.params.adId);
      socket.on("chatUser", async (data) => {
        scrollRef.current.scrollToEnd({ animated: false });
        if (data.type == "image") {
          console.log("image");
          setChats((perv) => {
            setIndexLastChat(perv.length);

            return [
              ...perv,
              {
                type: data.type,
                url: `https://komakkharj.ir/uploads/${data.url}`,
                isMySend: data.sender == "user" ? true : false,
              },
            ];
          });
        } else {
          setChats((perv) => {
            setIndexLastChat(perv.length);

            return [
              ...perv,
              {
                chat: data.chat,
                isMySend: data.sender == "user" ? true : false,
              },
            ];
          });
        }
        const token = await AsyncStorage.getItem("token");
        socket.emit("visitedUser", token);
      });
      socket.on("userReloadView", () => {
        console.log("user reload");
        getMessage();
      });
    // });

  }, [props.route.params]))


  return (
    <>
      {loaded ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              padding: 20,
              backgroundColor: "#fff",
            }}
          >
            <AntDesign
              name="customerservice"
              size={35}
              color="#2979FF"
              style={{
                borderWidth: 1,
                borderRadius: 30,
                padding: 10,
                marginLeft: 15,
              }}
            />
            <View
              style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            >
              <Text
                style={{ marginRight: 15, fontFamily: "vazir", fontSize: 15 }}
              >
                پشتیبانی کمک خرج
              </Text>
              <Text
                style={{ fontFamily: "vazir", color: "#5f6368", fontSize: 13 }}
              >
                با احترام پاسخگوی شمایم
              </Text>
            </View>
          </View>

          <View style={{ flex: 0.88, marginTop: 15, paddingHorizontal: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
              {chats.map((chat, index) => {
                if (chat.type == "notif") {
                  return (
                    <View
                      key={chat.id}
                      style={{
                        flexDirection: "row-reverse",
                        marginBottom: 15,
                      }}
                    >
                      <View
                        style={{
                          fontFamily: "vazir",
                          backgroundColor: "#388E3C",
                          width: "80%",
                          marginHorizontal: "auto",
                          color: "#fff",
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ fontFamily: "vazir", color: "#fff", textAlign: "center" }}>
                          {chat.chat}
                        </Text>
                      </View>
                    </View>
                  );
                } else if (chat.isMySend) {
                  if (index == indexLastChat) {
                    if (chat.type == "image") {
                      return (
                        <Animatable.View animation="bounceInRight">
                          <View
                            key={chat.id}
                            style={{
                              flexDirection: "row-reverse",
                              marginBottom: 15,
                            }}
                          >
                            <View
                              style={{
                                fontFamily: "vazir",
                                backgroundColor: "#2979FF",
                                width: "50%",
                                color: "#fff",
                                padding: 10,
                                borderRadius: 5,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => openImages(chat.url)}
                              >
                                <Image
                                  source={{
                                    uri: chat.url,
                                  }}
                                  style={{
                                    width: "100%",
                                    height: 150,
                                    backgroundColor: "#fff",
                                    padding: 10,
                                    borderRadius: 5,
                                  }}
                                />
                              </TouchableOpacity>
                              <Ionicons
                                name={
                                  chat.view
                                    ? "checkmark-done-outline"
                                    : "checkmark-outline"
                                }
                                size={19}
                                color="white"
                              />
                            </View>
                          </View>
                        </Animatable.View>
                      );
                    } else {
                      return (
                        <Animatable.View animation="bounceInRight">
                          <View
                            key={chat.id}
                            style={{
                              flexDirection: "row-reverse",
                              marginBottom: 15,
                            }}
                          >
                            <View
                              style={{
                                fontFamily: "vazir",
                                backgroundColor: "#2979FF",
                                width: "50%",
                                color: "#fff",
                                padding: 10,
                                borderRadius: 5,
                              }}
                            >
                              <Text
                                style={{ fontFamily: "vazir", color: "#fff" }}
                              >
                                {chat.chat}
                              </Text>
                              <Ionicons
                                name={
                                  chat.view
                                    ? "checkmark-done-outline"
                                    : "checkmark-outline"
                                }
                                size={19}
                                color="white"
                              />
                            </View>
                          </View>
                        </Animatable.View>
                      );
                    }
                  } else {
                    if (chat.type == "images") {
                      return (
                        <View
                          key={chat.id}
                          style={{
                            flexDirection: "row-reverse",
                            marginBottom: 15,
                          }}
                        >
                          <View
                            style={{
                              fontFamily: "vazir",
                              backgroundColor: "#2979FF",
                              width: "50%",
                              color: "#fff",
                              padding: 10,
                              borderRadius: 5,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => openImages(chat.url)}
                            >
                              <Image
                                source={{
                                  uri: chat.url,
                                }}
                                style={{
                                  width: "100%",
                                  height: 100,
                                  backgroundColor: "#fff",
                                  padding: 10,
                                  borderRadius: 5,
                                }}
                              />
                            </TouchableOpacity>
                            <Ionicons
                              name={
                                chat.view
                                  ? "checkmark-done-outline"
                                  : "checkmark-outline"
                              }
                              size={19}
                              color="white"
                            />
                          </View>
                        </View>
                      );
                    } else {
                      return (
                        <View
                          key={chat.id}
                          style={{
                            flexDirection: "row-reverse",
                            marginBottom: 15,
                          }}
                        >
                          <View
                            style={{
                              fontFamily: "vazir",
                              backgroundColor: "#2979FF",
                              width: "50%",
                              color: "#fff",
                              padding: 10,
                              borderRadius: 5,
                            }}
                          >
                            <Text
                              style={{ fontFamily: "vazir", color: "#fff" }}
                            >
                              {chat.chat}
                            </Text>
                            <Ionicons
                              name={
                                chat.view
                                  ? "checkmark-done-outline"
                                  : "checkmark-outline"
                              }
                              size={19}
                              color="white"
                            />
                          </View>
                        </View>
                      );
                    }
                  }
                } else {
                  if (index == indexLastChat) {
                    if (chat.type == "image") {
                      return (
                        <Animatable.View animation="bounceInRight">
                          <View
                            key={Math.random()}
                            style={{
                              flexDirection: "row",
                              marginBottom: 15,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => openImages(chat.url)}
                            >
                              <Image
                                source={{
                                  uri: chat.url,
                                }}
                                style={{
                                  width: "50%",
                                  height: 150,
                                  backgroundColor: "#fff",
                                  padding: 10,
                                  borderRadius: 5,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </Animatable.View>
                      );
                    } else {
                      return (
                        <Animatable.View animation="bounceInRight">
                          <View
                            key={Math.random()}
                            style={{
                              flexDirection: "row",
                              marginBottom: 15,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "vazir",
                                backgroundColor: "#FFFFFF",
                                width: "50%",

                                color: "#000",
                                padding: 10,
                                borderRadius: 5,
                              }}
                            >
                              {chat.chat}
                            </Text>
                          </View>
                        </Animatable.View>
                      );
                    }
                  } else {
                    if (chat.type == "image") {
                      return (
                        <View
                          key={chat.id}
                          style={{
                            flexDirection: "row",
                            marginBottom: 15,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => openImages(chat.url)}
                          >
                            <Image
                              source={{
                                uri: chat.url,
                              }}
                              style={{
                                width: "50%",
                                height: 150,
                                backgroundColor: "#fff",
                                padding: 10,
                                borderRadius: 5,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    } else {
                      return (
                        <View
                          key={chat.id}
                          style={{
                            flexDirection: "row",
                            marginBottom: 15,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "vazir",
                              backgroundColor: "#fff",
                              width: "50%",
                              color: "#000",
                              padding: 10,
                              borderRadius: 5,
                            }}
                          >
                            {chat.chat}
                          </Text>
                        </View>
                      );
                    }
                  }
                }
              })}
            </ScrollView>
          </View>

          <View
            style={{
              flex: 0.1,
              backgroundColor: "#fff",
              marginHorizontal: "auto",
              width: "95%",
              borderRadius: 7,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 10,
              marginBottom: 25,
            }}
          >
            <AntDesign
              name="link"
              size={24}
              color="black"
              style={{ paddingLeft: 10 }}
              onPress={handelSendImage}
            />

            <TextInput
              placeholder="متن پیام"
              style={{
                fontFamily: "vazir",
                flex: 1,
                marginRight: 10,
              }}
              value={text}
              onChangeText={setText}
            />
            <Ionicons name="send" size={24} color="blue" onPress={sendText} />
          </View>

          <ImageViewing
            images={[
              {
                uri: imageVisit,
              },
            ]}
            animationType="slide"
            imageIndex={0}
            visible={imageVisibel}
            onRequestClose={() => setImageVisibel(false)}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        </KeyboardAvoidingView>
      ) : (
        <ActivityIndicator size={"large"} style={{ margin: "auto" }} />
      )}
      ;
    </>
  );
}
