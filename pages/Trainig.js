import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import Service from "../service/main.service";
import Train from "../components/Train";

export default function () {
  const [loaded, setLoaded] = useState(false);
  const [trains, setTrains] = useState([]);

  const getTrain = async () => {
    const result = await Service.getTrains();
    setTrains(result.trains);
    setLoaded(true)
  };
  useEffect(() => {
    getTrain();
  }, []);

  return (
    <>
      {loaded ? (
        <ScrollView style={{flex: 1}}>
          {
            trains.map(train => (
              <Train key={train.id} title={train.title} image={train.th} id={train.id} />
            ))
          }
        </ScrollView>
      ) : (
        <ActivityIndicator size={"large"} style={{ margin: "auto" }} />
      )}
    </>
  );
}
