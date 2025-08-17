import { useEffect, useState } from "react";
import QuestionComponents from "../components/QuestionComponents";
import Service from "../service/main.service";
import { ActivityIndicator, FlatList } from "react-native";

export default function () {
    const [loaded, setLoaded] = useState(false);
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    const result = await Service.getQuestions();
    setQuestions(result.questions);
    setLoaded(true)
  };
  const renderItem = ({ item }) => (
    <QuestionComponents title={item.title} response={item.response} />
  );

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
    {
        loaded ?  <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> : <ActivityIndicator size={"large"} style={{margin: "auto"}} />
    }
     
    </>
  );
}
