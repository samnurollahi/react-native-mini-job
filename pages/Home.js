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
import { useFocusEffect } from "@react-navigation/native";
import FilterModalByCategory from "../components/filterModalByCategory";

export default function () {
  const [ads, setAds] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sortModal, setSortModal] = useState(false);
  const [sort, setSort] = useState("DESC");
  const [filterCategoryModal, setFilterCategoryModal] = useState(false);
  const [category, setCategory] = useState([]);

  const getData = async (sort, caregory) => {
    const data = await Service.getAds(sort, caregory);
    setAds(data.ads);
    setLoaded(true);
  };
  const renderItem = async ({ item }) => {
    return (
      <Ads
        title={item.title}
        price={item.price}
        categorys={JSON.parse(item.caregory)}
        id={item.id}
      />
    );
  };

  useEffect(() => {
    setLoaded(false);
    getData(sort, category);
    console.log(category);
  }, [sort, category]);
  return (
    <>
      {loaded ? (
        <>
          <View
            style={{ direction: "rtl", display: "flex", flexDirection: "row" }}
          >
            <Pressable
            onPress={()=>setFilterCategoryModal(true)}
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
              onPress={() => setSortModal(true)}
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

          <View style={{ flex: 1, direction: "rtl", paddingHorizontal: 25 }}>
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
