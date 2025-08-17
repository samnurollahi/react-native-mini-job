import { useRef, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ({ visible, setvisible, sort, setSort }) {
  const shadow = useRef(null);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Pressable
        ref={shadow}
        style={{ flex: 0.78, backgroundColor: "#000", opacity: 0.7 }}
        onPress={() => setvisible(false)}
      ></Pressable>
      <View
        style={{
          flex: 0.22,
          backgroundColor: "#fff",
          padding: 10,
          direction: "rtl",
        }}
      >
        <Text style={{ fontSize: 17, fontFamily: "vazir", marginBottom: 15 }}>
          مرتب سازی بر اساس
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 10 }}>
          <Pressable
            onPress={() => {
              setSort("PDESC");
              setvisible(false);
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: sort == "PDESC" ? "#fff" : "#2979FF",
              borderColor: "#2979FF",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: sort == "PDESC" ? "#000" : "#fff",
                fontFamily: "vazir",
              }}
            >
              گران ترین به ارزان ترین
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setSort("PASC");
              setvisible(false);
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: sort == "PASC" ? "#fff" : "#2979FF",
              borderColor: "#2979FF",
              borderWidth: 1,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: sort == "PASC" ? "#000" : "#fff",
                fontFamily: "vazir",
              }}
            >
              ارزان ترین به گران ترین
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setSort("DESC");
              setvisible(false);
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: sort == "DESC" ? "#fff" : "#2979FF",
              borderColor: "#2979FF",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: sort == "DESC" ? "#000" : "#fff",
                fontFamily: "vazir",
              }}
            >
              جدیدترین
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setSort("ASC");
              setvisible(false);
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: sort == "ASC" ? "#fff" : "#2979FF",
              borderColor: "#2979FF",
              borderWidth: 1,
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: sort == "ASC" ? "#000" : "#fff",
                fontFamily: "vazir",
              }}
            >
              قدیمی ترین
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
