import { api } from "../client";
import { Platform, ItemStatus } from "../types/item.types";

export interface CreateItemPayload {
  url: string;
  title?: string;
  description?: string;
  platform?: Platform;
  status?: ItemStatus;
  remindAt?: string;
}

export interface Item {
  id: string;
  url: string;
  title?: string;
  description?: string;
  platform: Platform;
  status: ItemStatus;
  remindAt?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const ItemService = {
  async create(payload: CreateItemPayload): Promise<Item> {
    try {
      const { data } = await api.post("/items", payload);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getAll(): Promise<Item[]> {
    try {
      const { data } = await api.get("/items");
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getOne(id: string): Promise<Item> {
    try {
      const { data } = await api.get(`/items/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateStatus(id: string, status: ItemStatus): Promise<Item> {
    try {
      const { data } = await api.patch(`/items/${id}/status`, { status });
      return data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/items/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
