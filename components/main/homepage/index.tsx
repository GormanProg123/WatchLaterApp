import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ItemService, Item } from "../../../api/servises/item.service";
import { AddButtonItem } from "../../features/ButtonItem";
import { ItemAddingForm } from "../../features/ItemAddingForm";
import { ItemLayout } from "../../features/ItemLayout";
import { useRouter } from "expo-router";
import { ItemStatus } from "../../../api/types/item.types";
import { StatusList } from "../../features/StatusLists";
import { Platform } from "../../../api/types/item.types";

const { width } = Dimensions.get("window");

export const HomePageScreen = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "all">(
    "all",
  );

  const counts = {
    all: items.length,
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
      setItems(data);
    } catch (e) {
      console.error("Failed to load items", e);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleDelete = async (id: string) => {
    try {
      await ItemService.delete(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.error("Failed to delete item", e);
    }
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

    const matchesPlatform =
      selectedPlatform === "all" || item.platform === selectedPlatform;

    return matchesSearch && matchesPlatform;
  });

  const watchedCount = items.filter((i) => i.status === "done").length;

  const handleStatusChange = (id: string, status: ItemStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
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
            createdAt={item.createdAt}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF0707",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitles: {
    flexDirection: "column",
    gap: 2,
  },
  appName: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#fff",
  },
  watchedCount: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#616264",
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#D9D9D9",
    padding: 0,
    fontFamily: "Inter_400Regular",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  filtersWrap: {
    marginBottom: 13,
  },
  flatList: {
    marginTop: 0,
  },
});
