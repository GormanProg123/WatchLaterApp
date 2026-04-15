import { api } from "../client";
import {
  ItemStatus,
  CreateItemPayload,
  Item,
} from "../types/item.types";

export const ItemService = {
  async create(payload: CreateItemPayload): Promise<Item> {
    try {
      const { data } = await api.post("/items", payload);
      console.log("Created item:", JSON.stringify(data));
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

  async findTrash(): Promise<Item[]> {
    try {
      const { data } = await api.get("/items/trash");
      return data;
    } catch (error) {
      throw error;
    }
  },

  async restore(id: string): Promise<Item> {
    try {
      const { data } = await api.patch(`/items/${id}/restore`);
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
