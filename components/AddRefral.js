import { useRef, useState } from "react";
import {
  Button,
  Linking,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Service from "../service/main.service";

export default function ({ visible, setvisible }) {
  const [code, setCode] = useState("");
  const [isError, setError] = useState(false);

  const shadow = useRef(null);

  const setRefral = async () => {
    const result = await Service.setRefralCode(code);
    if (result == "invalid") {
      setError(true);
    } else {
      setvisible(false)
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Pressable
        ref={shadow}
        style={{ flex: 0.8, backgroundColor: "#000", opacity: 0.7 }}
        onPress={() => setvisible(false)}
      ></Pressable>
      <View
        style={{
          flex: 0.2,
          backgroundColor: "#fff",
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "vazir",
              flexDirection: "row-reverse",
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            کد معرف را وارد کنید
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              fontFamily: "vazir",
            }}
            value={code}
            onChangeText={setCode}
            maxLength={10}
          />
          {isError ? (
            <Text
              style={{
                fontFamily: "vazir",
                color: "#D32F2F",
                flexDirection: "row-reverse",
              }}
            >
              کد معرف وارد شده اشتباه است
            </Text>
          ) : (
            <></>
          )}
        </View>
        <Button title="ذخیره" onPress={setRefral} />
      </View>
    </Modal>
  );
}
