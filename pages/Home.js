import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
  Viewm,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCallback, useEffect, useState } from "react";
import Ads from "../components/Ads";
import Service from "../service/main.service";
import SortModal from "../components/SortModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FilterModalByCategory from "../components/filterModalByCategory";

export default function () {
  const [ads, setAds] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sortModal, setSortModal] = useState(false);
  const [sort, setSort] = useState("DESC");
  const [filterCategoryModal, setFilterCategoryModal] = useState(false);
  const [category, setCategory] = useState([]);

  const navigation = useNavigation();

  const getData = async (sort, caregory) => {
    const data = await Service.getAds(sort, caregory);
    setAds(data.ads);
    setLoaded(true);
  };
  const renderItem = async ({ item }) => {
    return !item.close ? (
      <Ads
        mode={item.mode}
        title={item.title}
        price={item.price}
        categorys={JSON.parse(item.caregory)}
        id={item.id}
      />
    ) : (
      <></>
    );
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      setLoaded(false);
      getData(sort, category);
    });
    setLoaded(false);
    getData(sort, category);
  }, [sort, category]);
  return (
    <>
      {loaded ? (
        <>
          <View style={{ flexDirection: "row-reverse" }}>
            <Pressable
              onPress={() => setFilterCategoryModal(true)}
              style={{
                flexDirection: "row-reverse",
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
              onPress={() => setSortModal(true)}
              style={{
                flexDirection: "row-reverse",
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

          <View
            style={{
              flex: 1,
              flexDirection: "row-reverse",
              paddingHorizontal: 25,
            }}
          >
            <FlatList
              style={{ flex: 1 }}
              data={ads}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* modal */}
          <SortModal
            visible={sortModal}
            setvisible={setSortModal}
            sort={sort}
            setSort={setSort}
          />
          <FilterModalByCategory
            visible={filterCategoryModal}
            setvisible={setFilterCategoryModal}
            category={category}
            setCategory={setCategory}
            setSort={setSort}
          />
        </>
      ) : (
        <>
          <ActivityIndicator size={"large"} style={{ margin: "auto" }} />
        </>
      )}
    </>
  );
}
