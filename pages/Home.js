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
const BlueTheme = {
    colors: {
      background: '#F2F6FF',        // رنگ پس‌زمینه‌ی کل اپ
      primary: '#2979FF',           // آبی اصلی (Primary Blue)
      primaryDark: '#004ECb',       // آبی تیره‌تر (برای حالت فشار داده شده یا حالت دارک)
      accent: '#82B1FF',            // رنگ تأکیدی (برای دکمه‌های فرعی یا highlight)
      
      textTitle: '#1565C0',         // رنگ متن تایتل (آبی قوی)
      textMain: '#212121',          // رنگ متن اصلی (مشکی خاکستری)
      textSecondary: '#5f6368',     // رنگ متن فرعی (خاکستری روشن)
  
      active: '#2979FF',            // رنگ حالت فعال
      inactive: '#B0BEC5',          // رنگ حالت غیرفعال (خاکستری آبی)
  
      buttonBackground: '#2979FF',  // رنگ دکمه‌ها
      buttonText: '#FFFFFF',        // رنگ متن داخل دکمه
  
      border: '#E3F2FD',            // رنگ خط حاشیه‌ها یا جداکننده‌ها
      card: '#FFFFFF',              // رنگ پس‌زمینه‌ی کارت‌ها
      error: '#D32F2F',             // رنگ خطا (قرمز)
      success: '#388E3C',           // رنگ موفقیت (سبز)
    },
  };
  