import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  BackHandler,
  ScrollView,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HowAddAd from "../components/HowAddAd";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AddRefral from "../components/AddRefral";
import Service from "../service/main.service";
import Income from "../components/Income";
import numberWithCommas from "../utils/numberWithCommas";

export default (props) => {
  const navigation = useNavigation();

  const [loaded, setLoaded] = useState(false);
  const [visibleHowToAddAd, setVisibleHowToAddAd] = useState(false);
  const [visibleAddRefral, setVisibleRefral] = useState(false);
  const [income, setIncome] = useState(false);
  const [isRefral, setIsRefral] = useState(true);
  const [incomeCount, setIncomeCount] = useState(0);

  const getData = async () => {
    const checkRefral = await Service.checkRefral();
    const result = await Service.getIncome();

    setIncomeCount(result.income);
    setIsRefral(checkRefral.refral);
    setLoaded(true);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      setLoaded(false);
      getData();
      try {
        if (props.route.params.newLogin) {
          console.log("new login");
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
                if (
                  backPressTimeRef.current &&
                  now - backPressTimeRef.current < 2000
                ) {
                  BackHandler.exitApp();
                  return true;
                }
                ToastAndroid.show(
                  "برای خروج دوباره کلیک کنید",
                  ToastAndroid.SHORT
                );
                backPressTimeRef.current = now;
                return true;
              }

              // در غیر این صورت → Back پیش‌فرض Navigation
              return false;
            } catch {
              return false;
            }
          };

          BackHandler.addEventListener("hardwareBackPress", backAction);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, []);
  useEffect(() => {
    getData();
  }, [visibleAddRefral]);

  return (
    <>
      {loaded ? (
        <>
          <View
            style={{
              backgroundColor: "#1565C0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 35,
              paddingBottom: 30,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>
              {numberWithCommas(incomeCount)}
            </Text>
            <Text
              style={{ color: "#f3f3f3", fontFamily: "vazir", fontSize: 15.5 }}
            >
              {"موجودی ( تومان )"}
            </Text>

            <View
              style={{
                position: "absolute",
                backgroundColor: "#2979FF",
                width: 500,
                height: 500,
                opacity: 0.2,
                borderRadius: 150,
                left: -400,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                backgroundColor: "#2979FF",
                width: 150,
                height: 150,
                opacity: 0.2,
                borderRadius: 150,
                right: -50,
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                backgroundColor: "#2979FF",
                width: 300,
                height: 380,
                opacity: 0.4,
                borderRadius: 150,
                top: -355,
                right: 30,
              }}
            ></View>

            <FontAwesome5
              name="money-check"
              size={24}
              color="#E3F2FD"
              style={{ position: "absolute", right: 20, top: 20 }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <ScrollView>
              <TouchableOpacity
                onPress={() => setVisibleHowToAddAd(true)}
                style={{
                  width: "95%",
                  marginHorizontal: "auto",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  padding: 20,
                  borderRadius: 14,
                  marginTop: 20,
                  outlineWidth: 2,
                  outlineOffset: 0,
                  outlineColor: "#D32F2F",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <FontAwesome name="question" size={24} color="#D32F2F" />
                  <Text
                    style={{
                      fontFamily: "vazir",
                      marginRight: 10,
                      fontSize: 16,
                    }}
                  >
                    ثبت آگهی
                  </Text>
                </View>
                <AntDesign name="arrowleft" size={23} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIncome(true)}
                style={{
                  width: "95%",
                  marginHorizontal: "auto",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  padding: 20,
                  borderRadius: 14,
                  outlineWidth: 2,
                  outlineOffset: 0,
                  outlineColor: "#388E3C",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <FontAwesome5
                    name="money-bill-wave"
                    size={24}
                    color="#388E3C"
                  />
                  <Text
                    style={{
                      fontFamily: "vazir",
                      marginRight: 10,
                      fontSize: 16,
                    }}
                  >
                    برداشت
                  </Text>
                </View>
                <AntDesign name="arrowleft" size={23} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("history");
                }}
                style={{
                  width: "95%",
                  marginHorizontal: "auto",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  padding: 20,
                  borderRadius: 14,
                  // outlineWidth: 2,
                  // outlineOffset: 0,
                  // outlineColor: "#388E3C",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <FontAwesome5 name="history" size={24} color="#5f6368" />
                  <Text
                    style={{
                      fontFamily: "vazir",
                      marginRight: 10,
                      fontSize: 16,
                    }}
                  >
                    سوابق برداشت
                  </Text>
                </View>
                <AntDesign name="arrowleft" size={23} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("zirMajmoe")}
                style={{
                  width: "95%",
                  marginHorizontal: "auto",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  padding: 20,
                  borderRadius: 14,
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <AntDesign name="team" size={24} color="black" />
                  <Text
                    style={{
                      fontFamily: "vazir",
                      marginRight: 10,
                      fontSize: 16,
                    }}
                  >
                    زیرمجموعه گیری
                  </Text>
                </View>
                <AntDesign name="arrowleft" size={23} color="#333" />
              </TouchableOpacity>
              {isRefral ? (
                <></>
              ) : (
                <TouchableOpacity
                  onPress={() => setVisibleRefral(true)}
                  style={{
                    width: "95%",
                    marginHorizontal: "auto",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row-reverse",
                    padding: 20,
                    borderRadius: 14,
                    // outlineWidth: 2,
                    // outlineOffset: 0,
                    // outlineColor: "#388E3C",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row-reverse",
                    }}
                  >
                    {/* <FontAwesome5 name="money-bill-wave" size={24} color="#388E3C" /> */}
                    <Text
                      style={{
                        fontFamily: "vazir",
                        marginRight: 10,
                        fontSize: 16,
                      }}
                    >
                      شما زیر مجموعه نشدید
                    </Text>
                  </View>
                  <AntDesign name="plus" size={23} color="#333" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate("chat", { adId: "sup" })}
                style={{
                  width: "95%",
                  marginHorizontal: "auto",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  padding: 20,
                  borderRadius: 14,
                  marginTop: 20,
                  outlineWidth: 2,
                  outlineOffset: 0,
                  outlineColor: "#004ECb",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <AntDesign name="wechat" size={23} color="#004ECb" />
                  <Text
                    style={{
                      fontFamily: "vazir",
                      marginRight: 10,
                      fontSize: 16,
                    }}
                  >
                    پشتیبانی
                  </Text>
                </View>
                <AntDesign name="arrowleft" size={23} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("questions")}
                style={{
                  width: "95%",
                  marginHorizontal: "auto",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  padding: 20,
                  borderRadius: 14,
                  marginTop: 20,
                  marginBottom: 500,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <FontAwesome name="question" size={24} color="black" />
                  <Text
                    style={{
                      fontFamily: "vazir",
                      marginRight: 10,
                      fontSize: 16,
                    }}
                  >
                    سوالات متداول
                  </Text>
                </View>
                <AntDesign name="arrowleft" size={23} color="#333" />
              </TouchableOpacity>
            </ScrollView>
          </View>
          <HowAddAd
            setvisible={setVisibleHowToAddAd}
            visible={visibleHowToAddAd}
          />
          <AddRefral setvisible={setVisibleRefral} visible={visibleAddRefral} />
          <Income
            setvisible={setIncome}
            visible={income}
            income={incomeCount}
            setIncomeCount={setIncomeCount}
          />
        </>
      ) : (
        <ActivityIndicator size={"large"} style={{ margin: "auto" }} />
      )}
    </>
  );
};
