import { use, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ItemService } from "../../../api/servises/item.service";

const { width } = Dimensions.get("window");

interface Props {
  visible: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { key: "youtube", label: "YouTube", icon: "play" },
  { key: "movies", label: "Movies", icon: "film" },
  { key: "series", label: "Series", icon: "tv" },
  { key: "other", label: "Others", icon: "globe" },
] as const;

export const ItemAddingForm = ({ visible, onClose }: Props) => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Feather name="x" size={28} color="#D9D9D9" />
        </TouchableOpacity>

        <Text style={styles.title}>Add to Watchlist</Text>
        <Text style={styles.subtitle}>Save a link to watch later</Text>

        {/* Link */}
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Link</Text>
          <View style={styles.inputRow}>
            <Feather name="link" size={14} color="#616264" />
            <TextInput
              style={styles.input}
              placeholder="Paste URL here..."
              placeholderTextColor="#616264"
              value={link}
              onChangeText={setLink}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Title */}
        <View style={[styles.fieldWrap, { marginTop: 11 }]}>
          <Text style={styles.label}>Title</Text>
          <View style={styles.inputRow}>
            <Feather name="type" size={14} color="#616264" />
            <TextInput
              style={styles.input}
              placeholder="What are you saving?"
              placeholderTextColor="#616264"
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        {/* Description */}
        <View style={[styles.fieldWrap, { marginTop: 11 }]}>
          <Text style={styles.label}>Description (optional)</Text>
          <View style={[styles.inputRow, styles.inputMultiline]}>
            <Feather
              name="align-left"
              size={14}
              color="#616264"
              style={{ alignSelf: "flex-start", marginTop: 6 }}
            />
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              placeholder="Why do you want to watch this? Any notes..."
              placeholderTextColor="#616264"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        </View>

        {/* Category */}
        <View style={[styles.fieldWrap, { marginTop: 14 }]}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => {
              const selected = category === cat.key;
              return (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryBtn,
                    selected && styles.categoryBtnSelected,
                  ]}
                  onPress={() => setCategory(cat.key)}
                >
                  <Feather
                    name={cat.icon as any}
                    size={12}
                    color={selected ? "#FF0000" : "#616264"}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.categoryTextSelected,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={async () => {
            if (!link) return;
            try {
              await ItemService.create({
                url: link,
                title: title || undefined,
                description: description || undefined,
                platform: (category as any) ?? "other",
              });
              setLink("");
              setTitle("");
              setDescription("");
              setCategory(null);
              onClose();
            } catch (e) {
              console.error("Failed to create item", e);
            }
          }}
        >
          <Text style={styles.submitText}>+ Add to Watchlist</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
    alignItems: "flex-start",
  },
  closeBtn: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#D9D9D9",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#616264",
    marginBottom: 20,
  },
  fieldWrap: {
    width: width - 48,
  },
  label: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#616264",
    marginBottom: 6,
  },
  inputRow: {
    width: width - 48,
    height: 40,
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8,
  },
  inputMultiline: {
    height: 100,
    alignItems: "flex-start",
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: "#D9D9D9",
    padding: 0,
    fontFamily: "Inter_400Regular",
  },
  categoryRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  categoryBtn: {
    width: (width - 48 - 6 * 3) / 4,
    height: 60,
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryBtnSelected: {
    backgroundColor: "#3E171C",
    borderColor: "#FF0000",
  },
  categoryText: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#616264",
  },
  categoryTextSelected: {
    color: "#FF0000",
  },
  submitBtn: {
    width: width - 50,
    height: 40,
    backgroundColor: "#FF4D37",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  submitText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#fff",
  },
});
