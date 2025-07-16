import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Font from "./context/font";

export default function App() {
  return (
      <Font>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </Font>
  );
}
