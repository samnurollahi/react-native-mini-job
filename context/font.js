import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { createContext, useContext, useEffect } from "react";

preventAutoHideAsync();
const FontContext = createContext();

export default function ({ children }) {
  const [loaded, error] = useFonts({
    vazir: require("../assets/fonts/vazir.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <FontContext.Provider value={{}}>{children}</FontContext.Provider>;
}

export const useVazir = () => useContext(FontContext); // no used
