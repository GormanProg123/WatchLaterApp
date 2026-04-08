import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../client";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  displayName?: string;
}

export const authService = {
  async signIn(payload: SignInPayload) {
    try {
      const { data } = await api.post("/auth/sign-in", payload);
      await AsyncStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async signUp(payload: SignUpPayload) {
    try {
      const { data } = await api.post("/auth/sign-up", payload);
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

  async getToken() {
    const token = await AsyncStorage.getItem("token");
    return token;
  },
};
