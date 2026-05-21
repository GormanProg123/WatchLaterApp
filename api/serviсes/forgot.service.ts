import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../client";

export const forgotPasswordService = {
  async requestOtp(phoneNumber: string) {
    try {
      const { data } = await api.post("/auth/forgot-password", {
        phoneNumber,
      });
      await AsyncStorage.setItem("resetEmail", phoneNumber);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async verifyOtpAndResetPassword(
    phoneNumber: string,
    code: string,
    newPassword: string,
  ) {
    try {
      const { data } = await api.post("/auth/reset-password", {
        phoneNumber,
        code,
        newPassword,
      });
      await AsyncStorage.removeItem("resetEmail");
      return data;
    } catch (error) {
      throw error;
    }
  },

  async verifyOtpOnly(phoneNumber: string, code: string) {
    try {
      const { data } = await api.post("/auth/verify-otp", {
        phoneNumber,
        code,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getResetPhone(): Promise<string | null> {
    return AsyncStorage.getItem("resetPhone");
  },
};
