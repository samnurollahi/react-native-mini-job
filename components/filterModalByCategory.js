import { useRef, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import categoryName from "../utils/categoryName";

export default function ({ visible, setvisible, category, setCategory }) {
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
        <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 10 }}>
          <Pressable
            onPress={() => {
              setCategory((perv) => {
                if (perv.includes("phone")) {
                  return perv.filter((item) => item != "phone");
                } else {
                  return [...perv, "phone"];
                }
              });
              // setCategory("phone");
              setvisible(false);
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: category.includes("phone") ? "#fff" : "#2979FF",
              borderColor: "#2979FF",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: category.includes("phone") ? "#000" : "#fff",
                fontFamily: "vazir",
              }}
            >
              {categoryName("phone")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setCategory((perv) => {
                if (perv.includes("social")) {
                  return perv.filter((item) => item != "social");
                } else {
                  return [...perv, "social"];
                }
              });
              // setCategory("social");
              setvisible(false);
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: category.includes("social") ? "#fff" : "#2979FF",
              borderColor: "#2979FF",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: category.includes("social") ? "#000" : "#fff",
                fontFamily: "vazir",
              }}
            >
              {categoryName("social")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setCategory((perv) => {
                if (perv.includes("simpelRegister")) {
                  return perv.filter((item) => item != "simpelRegister");
                } else {
                  return [...perv, "simpelRegister"];
                }
 
              });
              // setCategory("simpelRegister");
              setvisible(false);
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: category.includes("simpelRegister")
                ? "#fff"
                : "#2979FF",
              borderColor: "#2979FF",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: category.includes("simpelRegister") ? "#000" : "#fff",
                fontFamily: "vazir",
              }}
            >
              {categoryName("simpelRegister")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setCategory((perv) => {
                if (perv.includes("advanceRegister")) {
                  return perv.filter((item) => item != "advanceRegister");
                } else {
                  return [...perv, "advanceRegister"];
                }
              });
              // setCategory("advanceRegister");
              setvisible(false);
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: category.includes("advanceRegister")
                ? "#fff"
                : "#2979FF",
              borderColor: "#2979FF",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: category.includes("advanceRegister") ? "#000" : "#fff",
                fontFamily: "vazir",
              }}
            >
              {categoryName("advanceRegister")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setCategory((perv) => {
                if (perv.includes("installApp")) {
                  return perv.filter((item) => item != "installApp");
                } else {
                  return [...perv ,"installApp"];
                }
                return perv;
              });
              // setCategory("installApp");
              setvisible(false);
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: category.includes("installApp")
                ? "#fff"
                : "#2979FF",
              borderColor: "#2979FF",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: category.includes("installApp") ? "#000" : "#fff",
                fontFamily: "vazir",
              }}
            >
              {categoryName("installApp")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
