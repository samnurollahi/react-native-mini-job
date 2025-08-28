import LottieView from "lottie-react-native";
import { Text, View } from "react-native";

export default function() {
    return (
      <View style={{backgroundColor: "#fff", width: "100%", flex: 1}}>
        <View style={{margin: "auto", backgroundColor: "#fff"}}>
        <LottieView
          source={require("../assets/anim/offline.json")}
          style={{width: 150, height: 150}}
          loop 
          autoPlay
        />
        <Text style={{fontFamily: "vazir", textAlign: "center", width: "50%", flexDirection: "row-reverse"}}>
          اتصال اینترنت را چک کنید، 
        </Text>
        <Text style={{fontFamily: "vazir", textAlign: "center", width: "50%", flexDirection: "row-reverse"}}>
          VPN را خاموش کنید
        </Text>
      </View>
      </View>
    )
}