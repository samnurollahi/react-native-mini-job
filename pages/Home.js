import { Pressable, ScrollView, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


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

      <View style={{ flex: 1, direction: "rtl", padding: 25 }}>
        <ScrollView>
          <Pressable
            style={{ backgroundColor: "#fff", padding: 20, borderRadius: 15, borderWidth: 5, borderColor: "#2979FF", marginTop: 30,}}
          >
            <Text
              style={{ color: "#212121", fontFamily: "vazir", fontSize: 16 }}
            >
              ثبت نام در بلوبانک
            </Text>

            <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 15}}>
              <FontAwesome6 name="money-bills" size={18} color="#2979FF" />
              <Text style={{marginRight: 15}}>مقدار هزینه: 20.000 تومان</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 15}}>
            <MaterialIcons name="category" size={18} color="#2979FF" />
              <Text style={{marginRight: 15}}>احرازهویتی</Text>
            </View>
          </Pressable>
          <Pressable
            style={{ backgroundColor: "#fff", padding: 20, borderRadius: 15, marginTop: 30,}}
          >
            <Text
              style={{ color: "#212121", fontFamily: "vazir", fontSize: 16 }}
            >
              ثبت نام در بلوبانک
            </Text>

            <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 15}}>
              <FontAwesome6 name="money-bills" size={18} color="#2979FF" />
              <Text style={{marginRight: 15}}>مقدار هزینه: 20.000 تومان</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 15}}>
            <MaterialIcons name="category" size={18} color="#2979FF" />
              <Text style={{marginRight: 15}}>احرازهویتی</Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
}
