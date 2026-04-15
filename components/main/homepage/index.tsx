import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ItemService } from "../../../api/servises/item.service";
import { Item } from "../../../api/types/item.types";
import { AddButtonItem } from "../../features/ButtonItem";
import { ItemAddingForm } from "../../features/ItemAddingForm";
import { ItemLayout } from "../../features/ItemLayout";
import { useRouter } from "expo-router";
import { ItemStatus } from "../../../api/types/item.types";
import { StatusList } from "../../features/StatusLists";
import { Platform } from "../../../api/types/item.types";
import { homepageStyles as styles } from "./homepageStyles";

export const HomePageScreen = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<
    Platform | "all" | "watched"
  >("all");

  const counts = {
    all: items.length,

    watched: items.filter((i) => i.status === "done").length,
    [Platform.YOUTUBE]: items.filter((i) => i.platform === Platform.YOUTUBE)
      .length,
    [Platform.MOVIES]: items.filter((i) => i.platform === Platform.MOVIES)
      .length,
    [Platform.SERIES]: items.filter((i) => i.platform === Platform.SERIES)
      .length,
    [Platform.OTHER]: items.filter((i) => i.platform === Platform.OTHER).length,
  };

  const loadItems = useCallback(async () => {
    try {
      const data = await ItemService.getAll();
      const now = new Date();
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      const filteredData = data.filter((item) => {
        if (item.status === "done" && item.doneAt) {
          const doneTime = new Date(item.doneAt);
          if (now.getTime() - doneTime.getTime() > sevenDaysMs) {
            ItemService.delete(item.id).catch((e) =>
              console.error("Failed to delete old item", e),
            );
            return false;
          }
        }
        return true;
      });
      setItems(filteredData);
    } catch (e) {
      console.error("Failed to load items", e);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFormClose = () => {
    setFormVisible(false);
    loadItems();
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = searchQuery
      ? item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    let matchesPlatform = true;

    if (selectedPlatform === "watched") {
      matchesPlatform = item.status === "done";
    } else if (selectedPlatform !== "all") {
      matchesPlatform =
        item.platform === selectedPlatform && item.status !== "done";
    } else {
      matchesPlatform = item.status !== "done";
    }

    return matchesSearch && matchesPlatform;
  });

  const watchedCount = items.filter((i) => i.status === "done").length;

  const handleStatusChange = async (id: string, status: ItemStatus) => {
    try {
      await ItemService.updateStatus(id, status);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item)),
      );
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.avatarCircle}
            onPress={() => router.push("/(app)/account")}
          >
            <Feather name="user" size={16} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerTitles}>
            <Text style={styles.appName}>WatchLater</Text>
            <Text style={styles.watchedCount}>
              {watchedCount}/{items.length} watched
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => setSearchOpen(!searchOpen)}>
          <Feather name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {searchOpen && (
        <View style={styles.searchWrap}>
          <Feather name="search" size={16} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your watchlist..."
            placeholderTextColor="#555"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x" size={16} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.filtersWrap}>
        <StatusList
          selected={selectedPlatform}
          onSelect={setSelectedPlatform}
          counts={counts}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        style={styles.flatList}
        renderItem={({ item }) => (
          <ItemLayout
            id={item.id}
            title={item.title ?? item.url}
            description={item.description}
            platform={item.platform}
            url={item.url}
            thumbnailUrl={item.thumbnailUrl}
            createdAt={item.createdAt}
            remindAt={item.remindAt}
            status={item.status}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <AddButtonItem onPress={() => setFormVisible(true)} />

      <ItemAddingForm visible={formVisible} onClose={handleFormClose} />
    </View>
  );
};
