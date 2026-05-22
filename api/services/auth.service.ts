import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { api } from "../client";
import { SignInPayload, SignUpPayload } from "../types/auth.types";
import { ItemService } from "./item.service";

const getPushToken = async (): Promise<string | undefined> => {
  try {
    if (!Device.isDevice) {
      return undefined;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return undefined;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    return tokenData.data;
  } catch {
    return undefined;
  }
};

export const authService = {
  async signIn(payload: SignInPayload) {
    try {
      const pushToken = await getPushToken();
      const { data } = await api.post("/auth/sign-in", {
        ...payload,
        ...(pushToken ? { pushToken } : {}),
      });
      await AsyncStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async signUp(payload: SignUpPayload) {
    try {
      const pushToken = await getPushToken();
      const { data } = await api.post("/auth/sign-up", {
        ...payload,
        ...(pushToken ? { pushToken } : {}),
      });
      await AsyncStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch {
    } finally {
      await AsyncStorage.removeItem("token");
    }
  },

  async getMe() {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await api.get("/auth/me");
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getToken() {
    const token = await AsyncStorage.getItem("token");
    return token;
  },
};
