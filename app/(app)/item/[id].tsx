import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { ItemService } from "../../../api/services/item.service";
import { ItemLayout } from "../../../components/features/ItemLayout";
import { Item } from "../../../api/types/item.types";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    ItemService.getOne(id)
      .then(setItem)
      .catch((err) => {
        console.error(err);
        setError("Failed to load item details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: item?.title ?? "Item details",
          headerShown: true,
        }}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : item ? (
        <ScrollView contentContainerStyle={styles.content}>
          <ItemLayout
            id={item.id}
            title={item.title ?? item.url}
            description={item.description}
            platform={item.platform}
            url={item.url}
            thumbnailUrl={item.thumbnailUrl}
            remindAt={item.remindAt}
            createdAt={item.createdAt}
            status={item.status}
            onDelete={() => {}}
            onStatusChange={() => {}}
          />
        </ScrollView>
      ) : (
        <View style={styles.center}>
          <Text style={styles.errorText}>Item not found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "#a00",
    fontSize: 16,
    textAlign: "center",
  },
});
