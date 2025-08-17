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
import LottieView from "lottie-react-native";

export default function ({ visible, setvisible, income, setIncomeCount }) {
  const [count, setCount] = useState(0);
  const [cartNumber, setCartNumber] = useState("");
  const [btnDisabel, setBtnDisabel] = useState(true);

  const shadow = useRef(null);

  const validation = () => {
    if (cartNumber.length == 16) {
      setBtnDisabel(false);
    } else {
      setBtnDisabel(true);
    }
  };
  const submit = async () => {
    try {
      const result = await Service.requestToIncome(count);
      setIncomeCount(result.price)
      setvisible(false)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Pressable
        ref={shadow}
        style={{ flex: 0.3, backgroundColor: "#000", opacity: 0.7 }}
        onPress={() => setvisible(false)}
      ></Pressable>
      <View
        style={{
          flex: 0.7,
          backgroundColor: "#fff",
          padding: 10,
        }}
      >
        <LottieView
          source={require("../assets/anim/wallet.json")}
          style={{ width: 150, height: 150, marginHorizontal: "auto" }}
          autoPlay
        />
        <Text
          style={{
            fontFamily: "vazir",
            textAlign: "center",
            fontSize: 16,
            color: "#2979FF",
          }}
        >
          ثبت درخواست برداشت
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            marginTop: 30,
            fontFamily: "vazir",
          }}
          keyboardType="number-pad"
          placeholder="شماره شبا را بدون IR وارد کنید"
          maxLength={16}
          value={cartNumber}
          onChangeText={(text) => {
            setCartNumber(text);
            validation();
          }}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            marginTop: 30,
            fontFamily: "vazir",
          }}
          placeholder="مبلغ ( تومان )"
          keyboardType="number-pad"
          value={count}
          onChangeText={(text) => {
            console.log(income);
            if (+text <= +income) {
              setCount(() => {
                if (text > 0) {
                  setBtnDisabel(false);
                } else {
                  setBtnDisabel(true);
                }
                return text;
              });
            }
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button title="ثبت" disabled={btnDisabel} onPress={submit} />
        </View>
      </View>
    </Modal>
  );
}
