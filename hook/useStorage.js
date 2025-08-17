import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function(key, value = false) {
    if(value) {
        // code
    }else {
        const data = await AsyncStorage.getItem(key)
        if(data == null) {
            return ""
        }else {
            return data
        }
    }
}