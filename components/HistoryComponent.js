import { Text, View } from "react-native";
import numberWithCommas from "../utils/numberWithCommas";
import handelDate from "../utils/handelDate";

export default function ({ date, status, cartNumber, count }) {
  return (
    <View
      style={{
        width: "95%",
        borderRadius: 7,
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: "auto",
        marginBottom: 15
      }}
    >
      <View>
        <Text style={{ textAlign: "right", fontFamily: "vazir" }}>
          مبلغ: {numberWithCommas(count)}
        </Text>
        <Text style={{ textAlign: "right", fontFamily: "vazir" }}>
          مقصد: {cartNumber}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 15 }}>
        <Text
          style={{
            fontFamily: "vazir",
            padding: 5,
            borderRadius: 15,
            backgroundColor:  status == "witing" ?  "#ffc107" : "#388E3C",
            color:   status == "witing" ?  "#000" : "#fff",
            width: 120,
            textAlign: "center",
          }}
        >
            {status == "witing" ? "در انتظار" : "پرداخت شده"}
        </Text>
        <Text style={{ fontFamily: "vazir" }}>
          {handelDate(date)}  
        </Text>
      </View>
    </View>
  );
}
