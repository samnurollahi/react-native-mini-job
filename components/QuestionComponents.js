import { Pressable, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

export default function ({ title, response }) {
  const [visible, setvisible] = useState(false);

  return (
    <>
      <Pressable
        style={{
          flexDirection: "column",
          padding: 20,
          width: "95%",
          backgroundColor: "#fff",
          marginHorizontal: "auto",
          marginTop: 15,
          borderRadius: 10,
        }}
        onPress={()=>setvisible((per) => !per)}
      >
        <View style={{ flexDirection: "row-reverse", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "vazir" }}>{title}</Text>
          <MaterialIcons name={visible ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={25} color="black" />
        </View>

        <Text style={{ fontFamily: "vazir", marginTop: 5, height: visible ? "auto" : 0, textAlign: "right"}}>{response}</Text>
      </Pressable>
    </>
  );
}
