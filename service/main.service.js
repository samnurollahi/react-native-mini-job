import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const client = axios.create({
  baseURL: "https://komakkharj.ir/api",
});

export default class mainServer {
  static async checkVpn() {
    try {
      const result = await client.get("/checkVpn")
      return result.data
    } catch (err) {
        console.log(err);
    }
  }


  static async sendCodeToLogin(phoneNumber) {
    try {
      const result = await client.post("/sendCodeToPhoneNumber", {
        phoneNumber,
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async checkCode(code, phoneNumber) {
    try {
      const result = await client.post("/checkCode", {
        phoneNumber,
        code,
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAds(sort = "DESC", category = []) {
    try {
      const result = await client.get(
        `/getAds?sort=${sort}&category=${JSON.stringify(category)}`
      );
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAd(id) {
    if (!id) {
      return { msg: "id is required" };
    }

    const result = await client.get(`/getAd/${id}`);
    return result.data;
  }

  static async getQuestions() {
    try {
      const result = await client.get(`/getQuestions`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getMessages() {
    try {
      const token = await AsyncStorage.getItem("token");

      const result = await client.get(`/getMessages/${token}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getTrains() {
    try {
      const result = await client.get("/getTrains");
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getSingelTrain(id) {
    try {
      const train = await client.get(`/getTrain/${id}`);
      return train.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getMyCode() {
    try {
      const token = await AsyncStorage.getItem("token");
      const result = await client.get(`/getMycode/${token}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async setRefralCode(refral) {
    try {
      const result = await client.post("/setRefralCode", {
        refral,
        token: await AsyncStorage.getItem("token"),
      });
      return result.data;
    } catch (err) {
      return "invalid";
    }
  }

  static async checkRefral() {
    try {
      const token = await AsyncStorage.getItem("token");
      const result = await client.get(`/checkRefral/${token}`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getMyZirMajmoe(myCode) {
    try {
      const result = await client.get(`/getMyZirMajmoe/${myCode}`)
      return result.data
    } catch (err) {
        console.log(err);
    }
  }

  static async getMyWiting() {
    try {
      const token = await AsyncStorage.getItem("token")
      const result = await client.get(`/getMyWiting/${token}`)
      return result.data
    } catch (err) { 
      console.log(err);
    }
  } 

  static async getMyAccepted() {
    try {
      const token = await AsyncStorage.getItem("token")
      const result = await client.get(`/getMyAccepted/${token}`)
      return result.data
    } catch (err) {
        console.log(err);
    }
  }

  static async getMyRejected() {
    try {
      const token = await AsyncStorage.getItem("token")
      const result = await client.get(`/getMyRejected/${token}`)
      return result.data
    } catch (err) {
        console.log(err);
    }
  }

  static async getIncome() {
    try {
      const token = await AsyncStorage.getItem("token")
      const result = await client.get(`/getIncome/${token}`)
      return result.data
    } catch (err) {
        console.log(err);
    }
  }

  static async requestToIncome(count) {
    try {
      const token = await AsyncStorage.getItem("token")
      const result = await client.post(`/sendRequestIncome/${token}`, {
        count
      })
      return result.data
    } catch (err) {
        console.log(err);
    }
  }
}
