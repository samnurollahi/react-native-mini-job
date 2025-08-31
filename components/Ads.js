import { Pressable, Text, TouchableOpacity, View } from "react-native";
import numberWithCommas from "../utils/numberWithCommas";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRef } from "react";
import * as Animatable from 'react-native-animatable';
import categoryName from "../utils/categoryName";
import { useNavigation } from "@react-navigation/native";

export default function ({ title, price, categorys, id}) {
  const anim = useRef(null)
  const navi = useNavigation()

  const handelOnPress = () => {
    navi.navigate("singelAd", {id})
  }

  return (
    <Animatable.View ref={anim}>
    <TouchableOpacity
    onPress={handelOnPress}
      style={{
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: "#2979FF",
        marginBottom: 20,
        marginTop: 5,
      }}
    >
      <Text style={{ color: "#212121", fontFamily: "vazir", fontSize: 16, textAlign: "right" }}>
        {title}
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <FontAwesome6 name="money-bills" size={18} color="#2979FF" />
        <Text style={{ marginRight: 15 }}>
          مقدار هزینه: {numberWithCommas(price)} تومان
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        {/* <MaterialIcons name="category" size={18} color="#2979FF" /> */}
        {categorys.map((item) => (
          <Text
            style={{
              marginRight: 15,
              backgroundColor: "#2979FF",
              color: "#fff",
              borderRadius: 20,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 13,
              marginBottom: 10,
            }}

            key={Math.random()}
          >
            {categoryName(item)}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
    </Animatable.View>
  );
}
