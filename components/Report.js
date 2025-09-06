import { Text, TouchableOpacity, View } from "react-native";
import handelDate from "../utils/handelDate";
import { useNavigation } from "@react-navigation/native";

export default function ({title, date, status = "درحال انجام", bgStatus = "#ffc107", adId}) {
    const navigation = useNavigation()
  
  return (
    <TouchableOpacity
      onPress={()=>
      {
        if(status == "درحال انجام") {
          navigation.navigate("chat", {adId})}
        }
      }
      style={{
        backgroundColor: "#fff",
        flexDirection: "column",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 25,
        padding: 15,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "vazir",
          fontSize: 15,
          color: "#212121",
          textAlign: "right"
        }}
      >
        {title}
      </Text>
      <Text style={{ marginTop: 10, color: "#5f6368", fontFamily: "vazir"}}>
        {/* با نصب برنامه بلوبانک و احرازهویت ... */}
      </Text>

      <View
        style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: "#fff",
            backgroundColor: bgStatus,
            width: "auto",
            fontFamily: "vazir"
          }}
        >
          {status}
        </Text>
        <Text style={{ color: "#5f6368" }}>{handelDate(date)}</Text>
      </View>
    </TouchableOpacity>
  );
}
