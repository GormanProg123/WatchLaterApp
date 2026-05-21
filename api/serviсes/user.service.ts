import { api } from "../client";
import { User } from "../types/user.types";

export const userService = {
  async updatePhoneNumber(phoneNumber: string): Promise<User> {
    try {
      const { data } = await api.patch("/user/phone", {
        phoneNumber,
      });

      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateEmail(email: string): Promise<User> {
    try {
      const { data } = await api.patch("/user/email", {
        email,
      });

      return data;
    } catch (error) {
      throw error;
    }
  },
};
