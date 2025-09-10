import { useRef } from "react";
import { Linking, Modal, Pressable, Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function ({ visible, setvisible }) {
  const shadow = useRef(null);

    const openTelegram = () => {
        Linking.openURL("https://t.me/komakkharj_ad")
    }

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Pressable
        ref={shadow}
        style={{ flex: .7, backgroundColor: "#000", opacity: 0.7 }}
        onPress={() => setvisible(false)}
      ></Pressable>
      <View
        style={{
          flex: 0.3,
          backgroundColor: "#fff",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "vazir",
            flexDirection: "row-reverse",
            textAlign: "right",
            fontSize: 17,
            marginTop: 10,
            marginBottom: 10,
            color: "#2979FF"
          }}
        >
جهت ثبت آگهی در تلگرام به نشانی زیر با ما در ارتباط باشید.
        </Text>
          <Pressable onPress={openTelegram} style={{flexDirection: "row-reverse", flexDirection: "row", alignItems: "center"}}>
            <FontAwesome6 name="telegram" size={24} color="#2979FF" />
            <Text style={{marginLeft: 10}}>
                t.me/komakkharj_ad
            </Text>
          </Pressable>
      </View>
    </Modal>
  );
}
