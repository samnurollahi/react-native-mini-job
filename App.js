import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Font from "./context/font";
import { StatusBar } from "react-native";


export default function App() {
  return (
    <>
      <StatusBar backgroundColor={"#115ddc"} />
      <Font>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </Font>
    </>
  );
}
