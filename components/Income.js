import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useRef, useState } from "react";
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
import ReactNativeCustomModal from "react-native-modal";

export default function ({ visible, setvisible, income, setIncomeCount }) {
  const [count, setCount] = useState(0);
  const [cartNumber, setCartNumber] = useState("");
  const [btnDisabel, setBtnDisabel] = useState(true);
  const [isVisibelPreSubmit, setIsVisibelPreSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const shadow = useRef(null);

  useEffect(() => {
    validation()
  }, [count, cartNumber])
  const validation = () => {
    if (+income > 50_000) {
      console.log(cartNumber);
      if(cartNumber.length == 24 && count > 50_000 && count < +income) {
        setBtnDisabel(false)
      }else {
        setBtnDisabel(true)
      }
    } else {
      if(cartNumber.length == 11 && count > 1_000 && count < +income) {
        setBtnDisabel(false)
      }else {
        setBtnDisabel(true)
      };
    }
  };
  const preSubmit = () => {
    setIsVisibelPreSubmit(true);
  };
const submit = async () => {
  // try {
    setIncomeCount(+income - +count);
    setvisible(false);
    const type = +income > 50_000 ? "cart" : "simcart";
    const result = await Service.requestToIncome(count, cartNumber, type);
  // } catch (err) {
  //   console.log(err);
  // }
};

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="fade">
        <Pressable
          ref={shadow}
          style={{ flex: 0.1, backgroundColor: "#000", opacity: 0.7 }}
          onPress={() => setvisible(false)}
        ></Pressable>
        <View
          style={{
            flex: .9,
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
          <Text
            style={{
              fontFamily: "vazir",
              textAlign: "center",
              color: "#5f6368",
              width: "80%",
              marginHorizontal: "auto",
            }}
          >
            اگر موجودی شما زیر 50 هزار تومن باشید میتوانید ان را به عنوان شارژ
            موبایل دریافت کنید
          </Text>
          {+income > 50_000 ? (
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
              maxLength={24}
              value={cartNumber}
              onChangeText={(text) => {
                setCartNumber(text);
                // validation();
              }}
            />
          ) : (
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                marginTop: 30,
                fontFamily: "vazir",
              }}
              keyboardType="number-pad"
              placeholder="شماره موبایل"
              maxLength={11}
              value={cartNumber}
              onChangeText={(text) => {
                setCartNumber(text);
                // validation();
              }}
            />
          )}

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
              if (+text <= +income) {
                setCount(text);
                // validation()
              }
            }}
          />
          <View style={{ marginTop: 20 }}>
            <Button title="ثبت" disabled={btnDisabel} onPress={preSubmit} />
          </View>

          {+income > 50_000 ? (
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Entypo name="info" size={24} color="black" />
              <Text
                style={{
                  fontFamily: "vazir",
                  textAlign: "right",
                }}
              >
                روند واریز وجه تا 72 ساعت کاری انجام میشود
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Entypo name="info" size={24} color="black" />
              <Text
                style={{
                  fontFamily: "vazir",
                  textAlign: "right",
                }}
              >
                روند ارسال شارژ موبایل در 24 ساعت کاری انجام میشود
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Entypo name="info" size={24} color="black" />
            <Text
              style={{
                fontFamily: "vazir",
                textAlign: "right",
                width: "80%",
                color: "#2979FF"
              }}
            >
              زمانیکه موجودی شما بالای 50 هزار تومان شود گزینه برداشت به حساب برای شما فعال میشود 
            </Text>
          </View>
        </View>
      </Modal>

      <ReactNativeCustomModal
        isVisible={isVisibelPreSubmit}
        onTouchCancel={() => {
          console.log("asadsa");
          setIsVisibelPreSubmit(false);
        }}
        onBackdropPress={() => {
          console.log("back");
          setIsVisibelPreSubmit(false);
        }}
      >
        <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 7 }}>
          <Text
            style={{
              textAlign: "right",
              fontFamily: "vazir",
              color: "#212121",
              fontSize: 15.5,
            }}
          >
            ثبت درخواست برداشت
          </Text>
          <Text
            style={{ textAlign: "right", fontFamily: "vazir", marginTop: 15 }}
          >
            از ثبت درخواست برداشت برای شماره {cartNumber} با مبلغ {count} مطمئن
            هستید؟
          </Text>

          <View style={{ flexDirection: "row" }}>
            <View style={{ width: 60 }}>
              <Button
                title="بله"
                color={"#388E3C"}
                onPress={() => {
                  setIsVisibelPreSubmit(false);
                  submit();
                }}
              />
            </View>
            <View style={{ width: 60, marginLeft: 25 }}>
              <Button
                title="خیر"
                color={"#D32F2F"}
                onPress={() => {
                  setIsVisibelPreSubmit(false);
                }}
              />
            </View>
          </View>
        </View>
      </ReactNativeCustomModal>
    </>
  );
}
