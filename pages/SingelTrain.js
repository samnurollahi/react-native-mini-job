import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import Service from "../service/main.service";
import WebView from "react-native-webview";

export default function (props) {
  const id = props.route.params.id || "id";
  const [loaded, setLoaded] = useState(false);
  const [train, setTrain] = useState({});

  const getSingelTrain = async () => {
    const result = await Service.getSingelTrain(id);
    setTrain(result.train);
    setLoaded(true);
  };

  useEffect(() => {
    getSingelTrain();
  }, []);

  return (
    <>
      {loaded ? (
        <View style={{ flex: 1, width: "95%", marginHorizontal: "auto" }}>
          <Text
            style={{
              fontFamily: "vazir",
              backgroundColor: "#fff",
              marginTop: 15,
              borderRadius: 10,
              flexDirection: "row-reverse",
              padding: 15,
              fontSize: 18,
            }}
          >
            {train.title}
          </Text>

          <Image
            source={{
              uri: `https://komakkharj.ir/uploads/${train.th}`,
            }}
            style={{
              width: "100%",
              height: 150,
              marginTop: 15,
              borderRadius: 10,
            }}
          />

          <WebView
            style={{ flex: 1, marginTop: 15, flexDirection: "row-reverse" }}
            originWhitelist={["*"]}
            source={{
              uri: `https://komakkharj.ir/api/getContentTrain/71163a37-e1d0-4498-b533-6a273966ef43`,
            }}
          />
        </View>
      ) : (
        <ActivityIndicator size={"large"} style={{ margin: "auto" }} />
      )}
    </>
  );
}
