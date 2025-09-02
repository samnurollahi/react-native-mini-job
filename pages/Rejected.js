import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Service from "../service/main.service";
import { ActivityIndicator, ScrollView } from "react-native";
import { View } from "react-native-animatable";
import Report from "../components/Report";
import PaydaNashod from "../components/PaydaNashod";

export default function () {
  const [loaded, setLoaded] = useState(false);
  const [ads, setAds] = useState([]);

  const navigation = useNavigation();

  const getMyRejected = async () => {
    const result = await Service.getMyRejected();
    setAds(result.rejects);
    setLoaded(true);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      setLoaded(false);
      getMyRejected();
    });
  }, []);
  return (
    <>
      {loaded ? (
        <>
          {ads.length > 0 ? (
            <ScrollView>
              {ads.map((ad) => (
                <Report
                  title={ad.msg}
                  date={ad.createdAt}
                  key={ad.id}
                  status="رد شده"
                  bgStatus="#D32F2F"
                  adId={ad.id}
                />
              ))}
            </ScrollView>
          ) : (
            <PaydaNashod />
          )}
        </>
      ) : (
        <ActivityIndicator size={"large"} style={{ margin: "auto" }} />
      )}
    </>
  );
}
