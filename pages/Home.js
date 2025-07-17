import { Pressable, ScrollView, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function () {
  return (
    <>
      <View style={{ direction: "rtl", display: "flex", flexDirection: "row" }}>
        <Pressable
          style={{
            direction: "rtl",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderRadius: 7,
            borderColor: "gray",
            borderWidth: 1,
            marginRight: 10,
            marginTop: 10,
          }}
        >
          <AntDesign name="filter" size={20} color="black" />
          <Text
            style={{
              fontFamily: "vazir",
              fontSize: 12,
            }}
          >
            فیلتر بر اساس دسته بندی
          </Text>
        </Pressable>
        <Pressable
          style={{
            direction: "rtl",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderRadius: 7,
            borderColor: "gray",
            borderWidth: 1,
            marginRight: 10,
            marginTop: 10,
          }}
        >
          <AntDesign name="swap" size={20} color="black" />
          <Text
            style={{
              fontFamily: "vazir",
              fontSize: 12,
            }}
          >
            مرتب سازی
          </Text>
        </Pressable>
      </View>

      <View style={{flex: 1, direction: "rtl", marginTop: 30, padding: 25,}}>
        <ScrollView>
            <View>
                <Text>
                    ثبت نام در بلوبانک
                </Text>
            </View>
        </ScrollView>
      </View>
    </>
  );
}
