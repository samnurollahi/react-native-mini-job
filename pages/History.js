import { useEffect, useState } from "react";
import mainServer from "../service/main.service";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-animatable";
import { FlatList, Text, TouchableOpacity } from "react-native";
import HistoryComponent from "../components/HistoryComponent";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  const [data, setData] = useState();

  const navigation = useNavigation();

  const getData = async () => {
    const data = await mainServer.getHistory();
    setData(data.request);
  };
  const renderItem = ({item}) => {
    return (
        <HistoryComponent cartNumber={item.cartNumber} count={item.count} date={item.createdAt} status={item.status} key={item.id} />
    )
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getData();
    });
  }, []);

  return (
    <View style={{ marginTop: 15 }}>
      <SafeAreaView>
        <FlatList
                data={data}
                renderItem={renderItem}
                key={item => item.id}
        />

      </SafeAreaView>
    </View>
  );
}
