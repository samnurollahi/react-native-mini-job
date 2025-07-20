import { Image, ScrollView, Text, View } from "react-native";

export default function () {
  return (
    <View>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: 25,
            display: "flex",
            flexDirection: "row-reverse",
            padding: 15,
            width: "95%",
            marginHorizontal: "auto",
            borderRadius: 10,
          }}
        >
          <View>
            <Image
              source={require("../assets/x.jpg")}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
          </View>

          <View style={{marginRight: 15}}>
            <Text style={{ fontFamily: "vazir", marginTop: 15, fontSize: 14, color: "#212121", textAlign: "right"}}>اموزش زیرمجموعه گیری</Text>
            <Text style={{fontFamily: "vazir", marginTop: 10, fontSize: 13, color: "#5f6368"}}>در این قسمت از سری اموزش ها ....</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: 25,
            display: "flex",
            flexDirection: "row-reverse",
            padding: 15,
            width: "95%",
            marginHorizontal: "auto",
            borderRadius: 10,
          }}
        >
          <View>
            <Image
              source={require("../assets/x.jpg")}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
          </View>

          <View style={{marginRight: 15}}>
            <Text style={{ fontFamily: "vazir", marginTop: 15, fontSize: 14, color: "#212121", textAlign: "right"}}>اموزش زیرمجموعه گیری</Text>
            <Text style={{fontFamily: "vazir", marginTop: 10, fontSize: 13, color: "#5f6368"}}>در این قسمت از سری اموزش ها ....</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: 25,
            display: "flex",
            flexDirection: "row-reverse",
            padding: 15,
            width: "95%",
            marginHorizontal: "auto",
            borderRadius: 10,
          }}
        >
          <View>
            <Image
              source={require("../assets/x.jpg")}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
          </View>

          <View style={{marginRight: 15}}>
            <Text style={{ fontFamily: "vazir", marginTop: 15, fontSize: 14, color: "#212121", textAlign: "right"}}>اموزش زیرمجموعه گیری</Text>
            <Text style={{fontFamily: "vazir", marginTop: 10, fontSize: 13, color: "#5f6368"}}>در این قسمت از سری اموزش ها ....</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
